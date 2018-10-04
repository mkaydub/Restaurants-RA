/* Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js').then(function(registration) {
      console.log('SW registration successful');
    })
    .catch(function(err) {
      //registration failed
      console.log('SW Registration failed', err);
    });

}