import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Timer from "./Components/Timer";

export default function App() {
  const [mount, setMount] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // variables for a pomodor timer
  const [pomodoro, setPomodoro] = useState(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [pomodoroBreak, setPomodoroBreak] = useState(false);
  const [pomodoroBreakInterval, setPomodoroBreakInterval] = useState(5);
  const [pomodoroLongBreak, setPomodoroLongBreak] = useState(10);
  const [pomodoroInterval, setPomodoroInterval] = useState(5);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const handleStartTimer = () => {
    setMount(true);
    setPomodoro(true);
    setSeconds(pomodoroInterval);
  };
  const handleTimerOut = () => {
    if (pomodoro) {
      if (pomodoroCount !== 2) {
        setPomodoro((prev) => !prev);
        setPomodoroCount((prev) => prev + 1);
        setPomodoroBreak((prev) => !prev);
        setSeconds(pomodoroBreakInterval);
      } else {
        setPomodoro((prev) => !prev);
        setPomodoroBreak((prev) => !prev);
        setPomodoroCount(0);
        setSeconds(pomodoroLongBreak);
      }
    } else {
      setPomodoroBreak((prev) => !prev);
      setPomodoro((prev) => !prev);
      setSeconds(pomodoroInterval);
    }
  };

  const handleStopTimer = () => {
    setMount(false);
    setPomodoro(false);
    setPomodoroBreak(false);
    setPomodoroCount(0);
    setSeconds(0);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#7D7D7A",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            padding: 10,
            color: "#fff",
          }}
        >
          Your Pomodoro Timer
        </Text>
      </View>

      {pomodoro ? (
        <View
          style={{
            padding: 10,
            elevation: 10,
            backgroundColor: "#F25C05",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "#fff",
            }}
          >
            Let's do some work
          </Text>
          <Timer seconds={seconds} handleTimerOut={handleTimerOut} />
        </View>
      ) : null}

      {pomodoroBreak ? (
        <View
          style={{
            padding: 10,
            elevation: 10,
            backgroundColor: "#7ABF5A",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "#fff",
            }}
          >
            Let's take a break
          </Text>
          <Timer seconds={seconds} handleTimerOut={handleTimerOut} />
        </View>
      ) : null}
      {/* <Timer seconds={60} /> */}
      <View
        style={{
          width: 200,
          flexDirection: "row",
          padding: 5,
          backgroundColor: "#fff",
          justifyContent: "space-between",
        }}
      >
        <Button title="Mount" onPress={handleStartTimer} />
        <Button title="UnMount" onPress={handleStopTimer} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C98A6",
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    padding: 3,
    minHeight: 50,
    backgroundColor: "yellow",
  },
});
