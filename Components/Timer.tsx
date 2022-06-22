import { useEffect, useState } from "react";
import { Text, View } from "react-native";
function Timer({
  seconds,
  handleTimerOut,
}: {
  seconds: number;
  handleTimerOut: () => void;
}) {
  const [timer, setTimer] = useState(seconds);
  let interval: any;
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
        }}
      >
        {Math.floor(timer / 60)} Minutes : {timer % 60} Seconds
      </Text>
    </View>
  );
}
export default Timer;
