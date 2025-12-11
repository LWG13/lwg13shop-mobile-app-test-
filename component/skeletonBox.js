import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export default function SkeletonBox({ width, height, radius = 0 }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: "#e0e0e0",
        opacity,
      }}
    />
  );
}