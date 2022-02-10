importScripts('pouchdb.min.js');
importScripts('utils.js');

const CACHE_INMMUTABLE = 'COURSE-CACHES-V4.0';

const SYNC_REGISTER = {
  COURSE: 'sync-course'
};

const CONFIG = {
  URL_BASE: 'https://course-ajas.herokuapp.com/api/',
  ENTITIES: {
    COURSE: 'course'
  }
}

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
  '/pouchdb.min.js',
  '/utils.js',

  '/styles.css',
  '/assets/animal/panda.js',
  '/assets/animal/panda.svg',

];

const dbOffline = new PouchDB('dbOffline');

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_INMMUTABLE)
      .then(cache => {
        return cache.addAll(includeToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((e) => console.log(e))
  );
});

self.addEventListener("activate", event => {
  const deleteCachePromise = caches.keys()
    .then(keys => {
      return Promise.all(keys.map(x => {
        if (CACHE_INMMUTABLE != x && x.indexOf(CACHE_INMMUTABLE.slice(0,14)) != -1) return caches.delete(x);
      }));
    });

  event.waitUntil(deleteCachePromise);
});

self.addEventListener("fetch", event => {
  if (event.request.url.toString().toLowerCase().indexOf('course') !== -1) {
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

self.addEventListener("sync", event => {
  if (event.tag === SYNC_REGISTER.COURSE) {
    event.waitUntil(
      dbOffline.allDocs({ include_docs: true })
        .then(async docs => {
          let promises = [];
          for (const course of docs.rows) {

            course.doc.body.FechaModificacion = new Date().toISOString();

            promises.push(fetch(CONFIG.URL_BASE + CONFIG.ENTITIES.COURSE, {
              method: 'POST',
              body: JSON.stringify(course.doc.body),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }));
          }
          return Promise.all(promises)
            .then(() => {
              let promiseToDelete = [];
              for (const course of docs.rows) {
                promiseToDelete.push(dbOffline.remove(course.doc));
              }
              return Promise.all(promiseToDelete);
            });
        })
    );
  }
});


self.addEventListener("fetch", event => {
  let res = null;
  if (event.request.url.toString().toLowerCase().indexOf('course') !== -1) {
    res = catchApiRequest(event);
    event.respondWith(res);
  }
});


function catchApiRequest(event) {
  let request = event.request;
  if (request.clone().method === 'POST') {
    if (!isOnline()) {
      let promiseSaveForm = request.clone().json();
      return promiseSaveForm
        .then((formData) => {
          return saveHttpRequest(formData);
        })
        .catch(e => console.log(e));
    } else {
      return fetch(request);
    }
  } else {
    return fetch(request);
  }
}

function saveHttpRequest(body) {

  let objToSave = {
    _id: new Date().toISOString(),
    body,
  }
  let response = null;
  return dbOffline.put(objToSave)
    .then(model => {
      self.registration.sync.register(SYNC_REGISTER.COURSE);
      response = { Id: body.Id };
      return new Response(JSON.stringify(response));
    });
}
