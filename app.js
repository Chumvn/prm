/* ============================================
   CHUM PROMPT v2.0 – Application Logic
   ============================================ */

(function () {
    'use strict';

    // ===== DOM Refs =====
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const themeToggle = $('#themeToggle');
    const themeIcon = $('#themeIcon');
    const templateSelect = $('#templateSelect');
    const templateHint = $('#templateHint');
    const variablesSection = $('#variablesSection');
    const variablesContainer = $('#variablesContainer');
    const btnGenerate = $('#btnGenerate');
    const btnCopy = $('#btnCopy');
    const btnReset = $('#btnReset');
    const previewSection = $('#previewSection');
    const previewOutput = $('#previewOutput');
    const charCount = $('#charCount');
    const toast = $('#toast');

    // ===== State =====
    let currentTemplate = null;   // raw markdown string
    let templateVars = [];         // [{name, suggestions:[{label,value}]}]
    let varValues = {};            // {variable_name: 'value'}

    // ===== Theme =====
    function initTheme() {
        const saved = localStorage.getItem('chum-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
        themeIcon.textContent = saved === 'dark' ? '🌙' : '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('chum-theme', next);
        themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
    });

    initTheme();

    // ===== Template Loading =====
    async function loadTemplateIndex() {
        try {
            const resp = await fetch('./prompts/index.json', { cache: 'no-store' });
            if (!resp.ok) throw new Error('No index.json');
            const list = await resp.json();
            templateSelect.innerHTML = '<option value="">— Chọn template —</option>';
            list.forEach((item) => {
                const opt = document.createElement('option');
                opt.value = item.file;
                opt.textContent = item.title;
                templateSelect.appendChild(opt);
            });
            templateHint.textContent = `${list.length} template có sẵn. Chọn để bắt đầu.`;
        } catch (e) {
            templateSelect.innerHTML = '<option value="">— Không tìm thấy template —</option>';
            templateHint.textContent = 'Thêm file .md vào thư mục prompts/ và tạo index.json.';
        }
    }

    templateSelect.addEventListener('change', async () => {
        const file = templateSelect.value;
        if (!file) {
            resetAll();
            return;
        }
        try {
            const resp = await fetch('./' + file, { cache: 'no-store' });
            if (!resp.ok) throw new Error('Cannot load template');
            currentTemplate = await resp.text();
            parseTemplate(currentTemplate);
            btnGenerate.disabled = false;
        } catch (e) {
            showToast('Không thể tải template!');
        }
    });

    // ===== Template Parser =====
    // Regex for {{variable}} and {{variable|label:value,...}}
    const VAR_REGEX = /\{\{(\w+)(?:\|\s*([\s\S]*?))?\}\}/g;

    function parseTemplate(md) {
        templateVars = [];
        varValues = {};
        const seen = new Set();

        let match;
        VAR_REGEX.lastIndex = 0;
        while ((match = VAR_REGEX.exec(md)) !== null) {
            const name = match[1];
            if (seen.has(name)) continue;
            seen.add(name);

            const suggestions = [];
            if (match[2]) {
                // Parse "Vietnamese Label:english_value" pairs
                const pairs = match[2].split(',');
                pairs.forEach((pair) => {
                    const trimmed = pair.trim();
                    if (!trimmed) return;
                    const colonIdx = trimmed.indexOf(':');
                    if (colonIdx > 0) {
                        const label = trimmed.substring(0, colonIdx).trim();
                        const value = trimmed.substring(colonIdx + 1).trim();
                        if (label && value) {
                            suggestions.push({ label, value });
                        }
                    }
                });
            }

            templateVars.push({ name, suggestions });
            varValues[name] = '';
        }

        renderVariableForm();
        updatePreview();
    }

    // ===== Dynamic Form =====
    function renderVariableForm() {
        variablesContainer.innerHTML = '';

        if (templateVars.length === 0) {
            variablesSection.style.display = 'none';
            return;
        }

        variablesSection.style.display = '';

        templateVars.forEach((v) => {
            const group = document.createElement('div');
            group.className = 'var-group';

            // Variable name label
            const nameLabel = document.createElement('div');
            nameLabel.className = 'var-name';
            nameLabel.textContent = '{{' + v.name + '}}';
            group.appendChild(nameLabel);

            // Suggestion buttons
            if (v.suggestions.length > 0) {
                const sugContainer = document.createElement('div');
                sugContainer.className = 'suggestions';
                v.suggestions.forEach((s) => {
                    const btn = document.createElement('button');
                    btn.className = 'suggestion-btn';
                    btn.textContent = s.label;
                    btn.title = s.value;
                    btn.dataset.varName = v.name;
                    btn.dataset.value = s.value;
                    btn.addEventListener('click', () => {
                        handleSuggestionClick(v.name, s.value, group);
                    });
                    sugContainer.appendChild(btn);
                });
                group.appendChild(sugContainer);
            }

            // Text input
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'input';
            input.placeholder = 'Nhập giá trị cho ' + v.name + '…';
            input.dataset.varName = v.name;
            input.value = varValues[v.name] || '';
            input.addEventListener('input', () => {
                varValues[v.name] = input.value;
                clearSuggestionActive(group);
                updatePreview();
            });
            group.appendChild(input);

            variablesContainer.appendChild(group);
        });
    }

    function handleSuggestionClick(varName, value, groupEl) {
        varValues[varName] = value;

        // Update input
        const input = groupEl.querySelector('input[data-var-name="' + varName + '"]');
        if (input) input.value = value;

        // Highlight active button
        const btns = groupEl.querySelectorAll('.suggestion-btn');
        btns.forEach((b) => {
            b.classList.toggle('active', b.dataset.value === value);
        });

        // Apply intent mapping
        applyIntentMapping(varName, value);

        updatePreview();
    }

    function clearSuggestionActive(groupEl) {
        const btns = groupEl.querySelectorAll('.suggestion-btn');
        btns.forEach((b) => b.classList.remove('active'));
    }

    // ===== Intent Mapping =====
    const INTENT_MAP = {
        notes_app: {
            description: 'Build a CRUD notes application',
            fields: 'title, content, updated_at',
            features: 'Include search functionality'
        },
        task_app: {
            description: 'Build a task manager',
            fields: 'title, done, updated_at',
            features: 'Include filter (all/open/done)'
        },
        prompt_library: {
            description: 'Build a markdown prompt viewer',
            fields: 'Parse {{variable}} syntax',
            features: 'Provide autofill buttons, live preview, and copy'
        },
        journal_app: {
            description: 'Build a daily journal system',
            fields: 'date, entry, mood, tags',
            features: 'Timeline grouped by date'
        }
    };

    function applyIntentMapping(varName, value) {
        if (varName !== 'app_intent') return;

        const mapping = INTENT_MAP[value];
        if (!mapping) return;

        // Auto-fill semantic fields if they exist
        ['description', 'fields', 'features'].forEach((field) => {
            if (varValues.hasOwnProperty(field) && !varValues[field]) {
                varValues[field] = mapping[field];
                const input = variablesContainer.querySelector(
                    'input[data-var-name="' + field + '"]'
                );
                if (input) input.value = mapping[field];
            }
        });
    }

    // ===== Live Preview =====
    function updatePreview() {
        if (!currentTemplate) return;

        let output = currentTemplate;

        // Replace all {{variable|...}} and {{variable}} with values
        output = output.replace(VAR_REGEX, (match, name) => {
            return varValues[name] || '{{' + name + '}}';
        });

        previewOutput.textContent = output;
        charCount.textContent = output.length + ' ký tự';
        previewSection.style.display = '';
        btnCopy.disabled = false;
    }

    // ===== Generate =====
    btnGenerate.addEventListener('click', () => {
        if (!currentTemplate) return;
        updatePreview();

        // Scroll to preview
        previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // ===== Copy =====
    btnCopy.addEventListener('click', async () => {
        const text = previewOutput.textContent;
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            showToast('Đã sao chép!');
        } catch {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Đã sao chép!');
        }
    });

    // ===== Reset =====
    btnReset.addEventListener('click', () => {
        resetAll();
        templateSelect.value = '';
    });

    function resetAll() {
        currentTemplate = null;
        templateVars = [];
        varValues = {};
        variablesContainer.innerHTML = '';
        variablesSection.style.display = 'none';
        previewSection.style.display = 'none';
        previewOutput.textContent = '';
        charCount.textContent = '';
        btnGenerate.disabled = true;
        btnCopy.disabled = true;
    }

    // ===== Toast =====
    let toastTimer = null;
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    // ===== Convert Tab Refs =====
    const convertInput = $('#convertInput');
    const btnConvertCopy = $('#btnConvertCopy');
    const convertPreview = $('#convertPreview');
    const convertOutput = $('#convertOutput');
    const convertCharCount = $('#convertCharCount');

    const CONVERT_INSTRUCTION = `Convert this prompt to a parameterized template using {{variable|Label:value}} syntax. Vietnamese labels, English values. Add strict rules at the end.`;

    // ===== Tab Switching =====
    const tabBtns = $$('.tab-btn');
    const tabContents = $$('.tab-content');

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            tabBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach((tc) => tc.classList.remove('active'));

            if (target === 'template') {
                $('#tabTemplate').classList.add('active');
            } else if (target === 'convert') {
                $('#tabConvert').classList.add('active');
            }
        });
    });

    // ===== Convert Copy =====
    btnConvertCopy.addEventListener('click', async () => {
        const userPrompt = convertInput.value.trim();
        if (!userPrompt) {
            showToast('Vui lòng nhập prompt!');
            return;
        }

        const merged = CONVERT_INSTRUCTION + '\n\n---\n\n' + userPrompt;

        // Show preview
        convertOutput.textContent = merged;
        convertCharCount.textContent = merged.length + ' ký tự';
        convertPreview.style.display = '';

        // Copy to clipboard
        try {
            await navigator.clipboard.writeText(merged);
            showToast('Đã sao chép prompt ghép!');
        } catch {
            const ta = document.createElement('textarea');
            ta.value = merged;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Đã sao chép prompt ghép!');
        }

        // Scroll to preview
        convertPreview.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // ===== Convert Copy Output (re-copy) =====
    const btnConvertCopyOutput = $('#btnConvertCopyOutput');
    btnConvertCopyOutput.addEventListener('click', async () => {
        const text = convertOutput.textContent;
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            showToast('Đã sao chép!');
        } catch {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Đã sao chép!');
        }
    });

    // ===== Init =====
    loadTemplateIndex();

})();
