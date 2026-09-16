self.addEventListener('install', (e) => {
  console.log('Service Worker (client) terpasang');
});

self.addEventListener('fetch', (e) => {
  // Biarkan kosong agar website tetap berjalan normal secara online
});
