const CACHE_NAME = "ver-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;
// Installation SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('opened cache');
                return cache.addAll(urlsToCache)

            })
    )

});
// Listen for reqs 
self.addEventListener('fetch', (event) => {
    console.log(event)
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => {
                        caches.match('offline.html')
                    })
            })
    )

});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                Promise.all(
                    cacheNames.map(cacheName => {
                        if (!cacheWhiteList.includes(cacheName)) {
                            return caches.delete(cacheNames)
                        }
                    })
                )
            })
    )


});