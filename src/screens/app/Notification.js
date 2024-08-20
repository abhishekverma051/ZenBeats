import * as Notifications from 'expo-notifications';

const handleNotification = (notification)=>{
    console.log('Received notification: ',notification);
}

Notifications.setNotificationHandler({
    handleNotification,
});

Notifications.requestPermissionsAsync({
    ios:{
        allowAlert : true,
        allowBadge: true,
        allowSound:true,
    },
    android:{
        allowAlert : true,
        allowBadge: true,
        allowSound:true,

    },
});
Notifications.scheduleNotificationAsync({
  content: {
    title: "hello",
    body: "hello",
  },
  trigger: {
    seconds: 1,
  },
})
  .then(() => {
    console.log("Notification scheduled successfully");
  })
  .catch((error) => {
    console.error("Error scheduling notification:", error);
  });