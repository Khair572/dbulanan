self.addEventListener('install', (e) => {
  console.log('Service Worker (admin) terpasang');
});

self.addEventListener('fetch', (e) => {
  // Biarkan kosong agar website tetap berjalan normal secara online
});
