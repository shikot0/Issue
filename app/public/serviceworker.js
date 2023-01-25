
const CACHE_NAME = "static";
const urlsToCache = ['./','./home','./user','./issue','./issuelist','./register','./registerwebsite','./newissue'];

const self = this;

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
        })
    ) 
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(async () => {
            try {
                return await fetch(event.request);
            } catch {
                return await caches.match('offline.html');
            }
        })
    )
});

self.addEventListener('active', event => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }else {
                    return false;
                }
            })
        ))
    )
});
