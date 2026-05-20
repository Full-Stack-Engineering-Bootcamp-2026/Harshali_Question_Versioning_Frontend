import { getToken } from "firebase/messaging"

import { messaging } from "./firebase"

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission()

    if (permission !== "granted") {
      console.log("Notification permission denied")
      return null
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    })

    console.log("FCM TOKEN:", token)

    return token
  } catch (error) {
    console.log("Error getting FCM token", error)
    return null
  }
}
