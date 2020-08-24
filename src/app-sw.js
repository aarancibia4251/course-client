const printLogMessage = (message, event) => console.log(message, event);
const CACHE_INMMUTABLE = 'COURSE-CACHES-V4';

const includeToCache = [
  '/app-sw.js',

  '/',
  '/favicon.ico',
  '/index.html',

  '/5-es2015.js',
  '/5-es5.js',
  '/main-es5.js',
  '/main-es2015.js',
  '/polyfills-es5.js',
  '/polyfills-es2015.js',
  '/runtime-es5.js',
  '/runtime-es2015.js',
  '/scripts.js',

  '/styles.css',
  '/assets/animal/panda.js',
  '/assets/animal/panda.svg',

];

self.addEventListener("install", event => {
  printLogMessage('[Service Worker] Installing Service Worker');
  let promiseIncludeFilesToCache = event.waitUntil(
    caches.open(CACHE_INMMUTABLE)
      .then(cache => {
        for (let i = 0; i <= includeToCache.length - 1; i++) {
          cache.add(includeToCache[i]);
        }
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch(console.log)
  );
});

self.addEventListener("activate", event => {
  printLogMessage('[Service Worker] Activating Service Worker');
  const deleteCachePromise = caches.keys()
    .then(keys => {
      return Promise.all(keys.map(x => {
        if (CACHE_INMMUTABLE != x && x.indexOf(CACHE_INMMUTABLE.slice(0,14)) != -1) return caches.delete(x);
      }));
    });

  let promiseCleanCache = event.waitUntil(deleteCachePromise);
});

self.addEventListener("fetch", event => {
  if (event.request.url.toString().toLowerCase().indexOf('curso') !== -1) {
    // printLogMessage('[ServiceWorker]  indexOf...', event.request.url.toString().toLowerCase().indexOf('curso') !== -1);
    return;
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          } else {
            return caches.open(CACHE_INMMUTABLE).then(cache => {
              cache.addAll([event.request]);
              return fetch(event.request);
            });
          }
        }).catch(e => {})
    );
  }
});

self.addEventListener("fetch", event => {
  if (event.request.url.toString().toLowerCase().indexOf('curso') !== -1) {
    printLogMessage('[ServiceWorker]  indexOf...', event.request.url.toString().toLowerCase().indexOf('curso') !== -1);
  }
});

