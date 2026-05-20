importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
)
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
)

firebase.initializeApp({
  apiKey: "AIzaSyCFL_RZ7G3_4gvJccgftRrManIPx792ZjY",
  authDomain: "vitallogprojectfirebase.firebaseapp.com",
  projectId: "vitallogprojectfirebase",
  storageBucket: "vitallogprojectfirebase.firebasestorage.app",
  messagingSenderId: "622310384001",
  appId: "1:622310384001:web:02d636f072d53415844880",
})

const messaging = firebase.messaging()
