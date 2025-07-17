// // components/quiz/QuizTimer.js
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Animated } from "react-native";
// import Svg, { Circle, Text as SvgText } from "react-native-svg";

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// const QuizTimer = ({ timeLeft }) => {
//   const [circleAnimation] = useState(new Animated.Value(0));

//   useEffect(() => {
//     Animated.timing(circleAnimation, {
//       toValue: 1,
//       duration: 600000,
//       useNativeDriver: false,
//     }).start();

//     return () => {
//       circleAnimation.stopAnimation();
//     };
//   }, []);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   const getTimerColor = () => {
//     if (timeLeft > 450) return "#34c759"; // Green (10:00 - 7:30)
//     if (timeLeft > 300) return "#ffcc00"; // Yellow (7:30 - 5:00)
//     if (timeLeft > 150) return "#ff9500"; // Orange (5:00 - 2:30)
//     return "#ff3b30"; // Red (2:30 - 0:00)
//   };

//   // Calculate stroke dash offset for circular timer
//   const circumference = 2 * Math.PI * 40; // Radius = 40
//   const strokeDashoffset = circleAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, circumference],
//   });

//   return (
//     <View style={styles.timerContainer}>
//       <Svg height="100" width="100" viewBox="0 0 100 100">
//         <Circle
//           cx="50"
//           cy="50"
//           r="40"
//           stroke="#e6e6e6"
//           strokeWidth="10"
//           fill="none"
//         />
//         <AnimatedCircle
//           cx="50"
//           cy="50"
//           r="40"
//           stroke={getTimerColor()}
//           strokeWidth="10"
//           fill="none"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round"
//           transform="rotate(-90, 50, 50)"
//         />
//         <SvgText
//           x="50"
//           y="50"
//           fill="#1a1a1a"
//           fontSize="20"
//           fontWeight="600"
//           textAnchor="middle"
//           dy=".3em"
//         >
//           {formatTime(timeLeft)}
//         </SvgText>
//       </Svg>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   timerContainer: {
//     padding: 12,
//     backgroundColor: "#f8f8f8",
//     alignItems: "center",
//     justifyContent: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e6e6e6",
//     elevation: 2,
//   },
// });

// export default QuizTimer;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const QuizTimer = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const getTimerColor = () => {
    if (timeLeft > 450) return "#34c759"; // Green (10:00 - 7:30)
    if (timeLeft > 300) return "#ffcc00"; // Yellow (7:30 - 5:00)
    if (timeLeft > 150) return "#ff9500"; // Orange (5:00 - 2:30)
    return "#ff3b30"; // Red (2:30 - 0:00)
  };

  return (
    <View style={[styles.timerContainer, { borderColor: getTimerColor() }]}>
      <Text style={[styles.timerText, { color: getTimerColor() }]}>
        {formatTime(timeLeft)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default QuizTimer;