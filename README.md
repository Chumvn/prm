# CHUM Prompt v2.0

**Markdown Prompt Template Engine** – Semantic-aware, bilingual, PWA-ready.

## Features

- 📝 Markdown prompt templates with `{{variable}}` syntax
- 🇻🇳 Bilingual UI: Vietnamese labels → English values
- ⚡ Live preview with instant variable replacement
- 🎨 Neumorphism design with dark/light mode
- 📱 PWA-ready with offline support
- ♾️ Infinite expansion via Git-powered template system
- 🤖 Semantic driver variables with intent mapping

## Quick Start

1. Clone or download this repository
2. Open `index.html` in a browser (or use a local server)
3. Select a template from the dropdown
4. Fill in variables using suggestion buttons or manual input
5. Click **Tạo Prompt** to generate
6. Click **Sao chép** to copy to clipboard

## Adding Templates

1. Create a new `.md` file in `prompts/`
2. Use `{{variable_name}}` for simple variables
3. Use `{{variable|Vietnamese Label:english_value, ...}}` for suggestions
4. Push to GitHub – the Action will auto-update `index.json`

## Variable Format

```
{{variable_name}}
{{variable|Label 1:value_1, Label 2:value_2}}
```

## Project Structure

```
├── index.html
├── style.css
├── app.js
├── manifest.webmanifest
├── sw.js
├── icons/
├── prompts/
│   ├── example.md
│   └── index.json (auto-generated)
└── .github/workflows/build-index.yml
```

## License

Personal use – CHUM Prompt Engine.
