// Network-first shell cache so a reload without signal still opens.
var CACHE = 'pab-shell-v1';
var SHELL = ['./', './index.html', './config.js', './logo.png'];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(SHELL.map(function (u) {
      return c.add(u).catch(function () {});
    }));
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.map(function (k) {
      return k === CACHE ? null : caches.delete(k);
    }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  if (u.pathname.indexOf('/api/') === 0) return;
  if (u.hostname.indexOf('script.google') >= 0) return;
  if (u.origin !== self.location.origin) return;

  e.respondWith(
    fetch(r).then(function (resp) {
      if (resp && resp.ok) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(r, copy); });
      }
      return resp;
    }).catch(function () {
      return caches.match(r).then(function (hit) {
        return hit || caches.match('./index.html');
      });
    })
  );
});
