import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigator/RootNavigator';
import { MyContextControllerProvider } from './providers';




const App = () => {

  return (
    <MyContextControllerProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </MyContextControllerProvider>
  );
};

export default App;
