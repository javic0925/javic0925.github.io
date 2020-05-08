const staticCacheName = "site-static-v1";
const assets = [
  "./",
  "./index.html",
  "./assets/js/app.js",
  "./assets/js/audioplayer.js",
  "./assets/js/jquery.js",
  "./assets/js/slideshow.js",
  "./assets/styles/style.css",
  "./assets/styles/audioplayer.css",
  "./assets/images/imgs/android-chrome-192x192.png",
  "./assets/images/imgs/android-chrome-512x512.png",
  "./assets/images/imgs/apple-touch-icon.png",
  "./assets/images/imgs/favicon-16x16.png",
  "./assets/images/imgs/favicon-32x32.png",
];
// install event
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
