const CACHE_NAME = "petnet-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./petnet-icon-192.png",
  "./petnet-icon-512.png"
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys
          .filter(function(key){
            return key !== CACHE_NAME;
          })
          .map(function(key){
            return caches.delete(key);
          })
      );
    })
  );
});

self.addEventListener("fetch", function(event){
  event.respondWith(
    fetch(event.request).catch(function(){
      return caches.match(event.request);
    })
  );
});