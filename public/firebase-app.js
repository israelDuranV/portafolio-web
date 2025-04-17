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
  const token = await getToken(messaging, { vapidKey: "BMKoSJ5uQJnQPXLeIKl7m8g7xKHSMTpPxwj" });
  if (token) {
    console.log("Token FCM:", token);
    // Envía este token a tu backend para enviar notificaciones
  } else {
    console.log("No se pudo obtener el token");
  }
}

requestNotificationPermission();