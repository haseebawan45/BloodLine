importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBB_d0GchvHTiaaPqUpaqDU9GQe_ebxc0A",
  authDomain: "bloodline-2e8a4.firebaseapp.com",
  projectId: "bloodline-2e8a4",
  storageBucket: "bloodline-2e8a4.firebasestorage.app",
  messagingSenderId: "648078735490",
  appId: "1:648078735490:android:70e8994461418ec5cb9c9b"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title || 'BloodLine Notification';
  const notificationOptions = {
    body: payload.notification.body || 'New notification from BloodLine',
    icon: '/icons/Icon-192.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
}); 