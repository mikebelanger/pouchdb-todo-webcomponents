const CACHE_NAME = "my-pwa-cache";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles/site.css",
  "/app.js",
  "/styles/pico.min.css",
  "/pouchdb-9.0.0.js",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      URLS_TO_CACHE.forEach((url) => {
        try {
          cache.add(url);
        } catch (e) {
          console.error("error caching: ", e);
        }
      });
    }),
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
