// Use a cacheName for cache versioning
var cacheName = "v1.2:static";

// Force from root, need to add a "/" at the beginning
var filesToCache = [
    "/",
    "/index.php",
    "/js/global.js",
    "/js/index.js",
    "/css/global.css",
    "/css/index.css",
];

// During the installation phase, you'll usually want to cache static assets.
self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
