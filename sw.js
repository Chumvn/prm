// CHUM PROMPT v2.0 – Service Worker
const CACHE_NAME = "chum-prompt-v2.0.0";

const ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.webmanifest",
    "./icons/icon-192.svg",
    "./icons/icon-512.svg"
];

// Install – cache core assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Activate – clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch – cache-first for core assets, network-first for prompts
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Network-first for prompt files (always fresh)
    if (url.pathname.includes("/prompts/")) {
        event.respondWith(
            fetch(event.request)
                .then((resp) => {
                    const clone = resp.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                    return resp;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Cache-first for everything else
    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});
