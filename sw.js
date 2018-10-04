const cacheFiles = [
  '/',
  'index.html',
  'restaurant.html',
  'css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1-300.jpg',
  '/img/1-400.jpg',
  '/img/1-600_2x.jpg',
  '/img/1-800_2x.jpg',
  '/img/2-300.jpg',
  '/img/2-300.jpg',
  '/img/2-400.jpg',
  '/img/2-600_2x.jpg',
  '/img/2-800_2x.jpg',
  '/img/3-300.jpg',
  '/img/3-400.jpg',
  '/img/3-600_2x.jpg',
  '/img/3-800_2x.jpg',
  '/img/4-300.jpg',
  '/img/4-400.jpg',
  '/img/4-600_2x.jpg',
  '/img/4-800_2x.jpg',
  '/img/5-300.jpg',
  '/img/5-400.jpg',
  '/img/5-600_2x.jpg',
  '/img/5-800_2x.jpg',
  '/img/6-300.jpg',
  '/img/6-400.jpg',
  '/img/6-600_2x.jpg',
  '/img/6-800_2x.jpg',
  '/img/7-300.jpg',
  '/img/7-400.jpg',
  '/img/7-600_2x.jpg',
  '/img/7-800_2x.jpg',
  '/img/8-300.jpg',
  '/img/8-400.jpg',
  '/img/8-600_2x.jpg',
  '/img/8-800_2x.jpg',
  '/img/9-300.jpg',
  '/img/9-400.jpg',
  '/img/9-600_2x.jpg',
  '/img/9-800_2x.jpg',
  '/img/10-300.jpg',
  '/img/10-400.jpg',
  '/img/10-600_2x.jpg',
  '/img/10-800_2x.jpg',
];

var staticCacheName = 'v4';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('v') &&
            cacheName != staticCacheName;
        }).map(function(cacheName) {
          return cache.delete(cacheName);
        })
      );
    })
  );
});



self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        console.log('found', e.request, 'in cache');
        return response;
      } else {
        console.log('couldnt find', e.request, 'in cache, fetching!');
        return fetch(e.request)
          .then(function(response) {
            const clonedResponse = response.clone();
            caches.open(staticCacheName).then(function(cache) {
              cache.put(e.request, clonedResponse);
            })
            return response;
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    })
  );
});