import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";

const CircularProgress = ({ percentage }: { percentage: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  // Rotate animation interpolation
  const rotateAnimation = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />
      <Animated.View
        style={[
          styles.progressCircle,
          {
            transform: [{ rotate: rotateAnimation }],
          },
        ]}
      />
      <Text style={styles.percentageText}>{`${percentage}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundCircle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#e6e6e6",
  },
  progressCircle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "blue",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
  },
  percentageText: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});

export default CircularProgress;
