importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAHUVDVppBNotGtblcgB09RZYzKRN4UPDU",
    authDomain: "axayacatl-israel-duran-velasco.firebaseapp.com",
    projectId: "axayacatl-israel-duran-velasco",
    storageBucket: "axayacatl-israel-duran-velasco.firebasestorage.app",
    messagingSenderId: "82551132091",
    appId: "1:82551132091:web:1893f8c4ce32f5007cbe9e"
};

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  messaging.onBackgroundMessage((payload) => {
    console.log("Mensaje en segundo plano recibido:", payload);
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon,
    });
  });
  