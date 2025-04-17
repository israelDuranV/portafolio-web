import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js'
import { getMessaging, getToken } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js'

const firebaseConfig = {
apiKey: "AIzaSyAHUVDVppBNotGtblcgB09RZYzKRN4UPDU",
authDomain: "axayacatl-israel-duran-velasco.firebaseapp.com",
projectId: "axayacatl-israel-duran-velasco",
storageBucket: "axayacatl-israel-duran-velasco.firebasestorage.app",
messagingSenderId: "82551132091",
appId: "1:82551132091:web:1893f8c4ce32f5007cbe9e",
measurementId: "G-KTY8Z9H5YK"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestNotificationPermission() {
const permission = await Notification.requestPermission();
if (permission === "granted") {
  console.log("Permiso concedido ✅");
  getFCMToken();
} else {
  console.log("Permiso denegado ❌");
}
}

async function getFCMToken() {
const token = await getToken(messaging, { vapidKey: "BMKoSJ5uQJnQPXLeIKl7m8g7xKHSMTpPxwj-xDEL4L9LhbXrcnNqEfeLjBTzkFHXxF6OYKed2R4EOipxq3OcmUk" });
if (token) {
  console.log("Token FCM:", token);
  // Envía este token a tu backend para enviar notificaciones
} else {
  console.log("No se pudo obtener el token");
}
}

requestNotificationPermission();

      if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
        .then(function() { 
          console.log("Service Worker Registered");
        }).catch((error) => {
          console.error("Error al registrar el Service Worker:", error);
        });
        
        navigator.serviceWorker.register("./firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker firebase-messaging éxitoso:", registration);
        })
        .catch((error) => {
          console.error("Error al registrar el Service Worker:", error);
        });
      }
/*
messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
  return messaging.getToken();
})
.then(function(token) {
  console.log('FCM Token:', token);
  // Save the token to your server or use it to send notifications
})
.catch(function(err) {
  console.error('Unable to get permission to notify.', err);
});
messaging.onMessage(function(payload) {
console.log('Message received. ', payload);
// Customize notification UI here
});
*/
      function isPWAInstalled() {
        return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
      }

      if (isPWAInstalled()) {
        document.getElementById("installPWA").style.display = "none"; // Oculta el botón
      }

      let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (event) => {
    // Previene que el navegador muestre el cuadro de instalación automáticamente
    event.preventDefault();
    deferredPrompt = event; // Guarda el evento para usarlo después
  });

  document.getElementById("installPWA").addEventListener("click", () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Muestra el cuadro de instalación
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("El usuario aceptó la instalación");
        } else {
          console.log("El usuario rechazó la instalación");
        }
        deferredPrompt = null; // Limpia el evento
      });
    }
  });
  window.addEventListener("appinstalled", () => {
    console.log("PWA instalada");
    document.getElementById("installPWA").style.display = "none"; // Oculta el botón
  });