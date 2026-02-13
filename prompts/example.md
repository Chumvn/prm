# Minimal WebApp Generator

> Generate a complete minimal web application with the following parameters.

## Application Type

{{app_intent|
Ghi chú:notes_app,
Công việc:task_app,
Thư viện Prompt:prompt_library,
Nhật ký:journal_app
}}

## Deployment Target

{{deployment_target|
GitHub Pages:github_pages,
Localhost:localhost,
Netlify:netlify,
Vercel:vercel
}}

## Storage Method

{{storage_method|
LocalStorage:localstorage,
IndexedDB:indexeddb,
Google Sheets:google_sheets,
Supabase:supabase
}}

## Layout

{{layout_width|
Cột đơn:single_column,
Hai cột:two_column,
Dashboard:dashboard_layout
}}

## Theme

{{theme_default|
Tối:dark,
Sáng:light,
Hệ thống:system
}}

## PWA Support

{{enable_pwa|
Có:yes,
Không:no
}}

---

## Instructions

Build a {{app_intent}} application.

- Deployment: {{deployment_target}}
- Data storage: {{storage_method}}
- Layout: {{layout_width}}
- Default theme: {{theme_default}}
- PWA enabled: {{enable_pwa}}

### Requirements

- Single-page application
- Mobile-first responsive design
- Neumorphism style UI
- Dark/Light mode toggle
- Vietnamese UI labels, English code logic
- Clean, production-ready code
- No heavy frameworks

### Output Format

Provide complete source code for each file:

===== index.html =====
===== style.css =====
===== app.js =====

If PWA is enabled, also include:

===== manifest.webmanifest =====
===== sw.js =====
