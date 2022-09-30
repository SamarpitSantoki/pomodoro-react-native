import { NativeBaseProvider } from "native-base";
import MainScreen from "./screens/Main";
import { Button } from "native-base";
import { Audio } from "expo-av";
import { useState } from "react";
function App() {
  const [sound, setSound] = useState<any>();

  return (
    <NativeBaseProvider>
      <MainScreen />
    </NativeBaseProvider>
  );
}
export default App;
