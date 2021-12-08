// Register the service worker if available.
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("js/sw.js")
        .then(function (reg) {})
        .catch(function (err) {
            console.warn("Error whilst registering service worker", err);
        });
}
