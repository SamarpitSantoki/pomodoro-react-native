import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Audio } from "expo-av";
function Timer({
  seconds,
  handleTimerOut,
}: {
  seconds: number;
  handleTimerOut: () => void;
}) {
  const [sound, setSound] = useState<any>();
  const [timer, setTimer] = useState(seconds);
  let interval: any;
  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/ring.mp3")
    );
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  };

  const handleBell = () => {
    playSound();
    console.log("bell");
  };
  useEffect(() => {
    if (timer !== 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    console.log("timer is 0");
    return () => {
      console.log("cleaning up");

      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (timer === 0) {
      handleBell();
      console.log("timer out");
      handleTimerOut();
    }
  }, [timer]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text
        style={{
          fontSize: 17,
          color: "#E8DFCA",
        }}
      >
        {Math.floor(timer / 60)} Minutes : {timer % 60} Seconds
      </Text>
    </View>
  );
}
export default Timer;
