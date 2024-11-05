self.addEventListener("push", function (event) {
  let data;

  // Check if there is data with the event
  if (event.data) {
    data = event.data.json();
  } else {
    // Default notification content if no data is available
    data = {
      title: "Default Title",
      body: "Default body message",
      icon: "/icon.png",
    };
  }

  const options = {
    body: data.body,
    icon: data.icon || "/icon.png",
    badge: "/badge.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    // Optional: add a tag for notification management
    tag: "push-notification",
  };

  // Show the notification
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.");

  // Close the notification
  event.notification.close();

  // Open the URL in a new window/tab
  event.waitUntil(clients.openWindow("https://your-website.com"));
});
