import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';

import { Routes } from './src/routes';

import { Loading } from './src/components/Loading';
import { THEME } from './src/theme';

import { useEffect } from 'react';
import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

OneSignal.initialize("a66e1ee2-6a71-48ee-9c2d-24e92166ef25")
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result

      if (actionId === "1") {
        return console.log("Ver todos")
      }

      if (actionId === "2") {
        return console.log("Ver pedido")
      }
    }

    OneSignal.Notifications.addEventListener("click", handleNotificationClick)

    return () => OneSignal.Notifications.removeEventListener(
      "click",
      handleNotificationClick
    )
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}