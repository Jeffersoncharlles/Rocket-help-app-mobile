// import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { SignIn } from './src/pages/SignIn';
import { THEME } from './src/styles/theme';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })



  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <SignIn /> : <Loading />}

    </NativeBaseProvider>
  );
}

