if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('/app-sw.js')
    .then(console.log)
    .catch(console.log)
}
