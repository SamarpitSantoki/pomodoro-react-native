import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Input, HStack } from "native-base";
import Timer from "../Components/Timer";

export default function MainScreen() {
  const [mount, setMount] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [inputInterval, setInputInterval] = useState(0);
  // variables for a pomodor timer
  const [pomodoro, setPomodoro] = useState(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [pomodoroBreak, setPomodoroBreak] = useState(false);
  const [pomodoroBreakInterval, setPomodoroBreakInterval] = useState(5);
  const [pomodoroLongBreak, setPomodoroLongBreak] = useState(10);
  const [pomodoroInterval, setPomodoroInterval] = useState(20);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const handleStartTimer = () => {
    setMount(true);
    setPomodoro(true);
    setSeconds(inputInterval > 0 ? inputInterval : pomodoroInterval);
    if (inputInterval) setPomodoroInterval(inputInterval);
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
        style={
          {
            // backgroundColor: "#f5eada",
          }
        }
      >
        <Text
          style={{
            fontSize: 30,
            padding: 10,
            color: "gray",
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
            backgroundColor: "#AEBDCA",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "whitesmoke",
            }}
          >
            Let's do some work
          </Text>
          <Timer seconds={seconds} handleTimerOut={handleTimerOut} />
        </View>
      ) : (
        !pomodoroBreak && (
          <View
            style={{
              padding: 10,
              elevation: 10,
              backgroundColor: "#AEBDCA",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "whitesmoke",
                textAlign: "center",
              }}
            >
              Get Started with Your Awesome Work
            </Text>
            <HStack
              flex={1}
              alignItems="center"
              // justifyContent="center"
              maxH={8}
            >
              <Text>Timer: </Text>
              <Input
                type="text"
                onChangeText={(e) => setInputInterval(parseInt(e))}
                w={250}
                maxH={30}
                padding={5}
              />
            </HStack>
          </View>
        )
      )}

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
              color: "whitesmoke",
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
          padding: 7,
          borderRadius: 10,
          backgroundColor: "#7895B2",
          justifyContent: "space-between",
        }}
      >
        <Button
          backgroundColor={"#F5EFE6"}
          onPress={handleStartTimer}
          children={"Start"}
          _text={{ color: "#7895B2", paddingX: 3 }}
        />
        <Button
          backgroundColor={"#F5EFE6"}
          onPress={handleStopTimer}
          children={"Stop"}
          _text={{ color: "#7895B2", paddingX: 3 }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EFE6",
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    padding: 3,
    minHeight: 50,
    backgroundColor: "yellow",
  },
});
