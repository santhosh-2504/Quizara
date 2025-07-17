// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../store/slices/userSlice";
// import { Alert } from "react-native";
// // Screens
// import LoginScreen from "../screens/LoginScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import MockTestScreen from "../screens/MockTestScreen";
// import QuizListScreen from "../screens/QuizListScreen";
// import QuizTakingScreen from "../screens/QuizTakingScreen";

// // Create navigators
// const Tab = createBottomTabNavigator();
// const QuizStack = createStackNavigator();
// const MockTestStack = createStackNavigator();
// const ProfileStack = createStackNavigator();

// // Quiz Stack Navigator
// const QuizStackNavigator = () => (
//   <QuizStack.Navigator screenOptions={{ headerShown: false }}>
//     <QuizStack.Screen name="QuizList" component={QuizListScreen} />
//     <QuizStack.Screen name="QuizTaking" component={QuizTakingScreen} />
//   </QuizStack.Navigator>
// );

// // Mock Test Creation Stack Navigator - Added QuizTaking screen here
// const MockTestStackNavigator = () => (
//   <MockTestStack.Navigator screenOptions={{ headerShown: false }}>
//     <MockTestStack.Screen name="MockTest" component={MockTestScreen} />
//     <MockTestStack.Screen name="QuizTaking" component={QuizTakingScreen} />
//   </MockTestStack.Navigator>
// );

// // Profile Stack Navigator 
// const ProfileStackNavigator = () => (
//   <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
//     <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
//     <ProfileStack.Screen name="QuizTaking" component={QuizTakingScreen} />
//   </ProfileStack.Navigator>
// );

// export default function BottomTabs() {
//   const { isAuthenticated } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const handleLogout = (e) => {
//     e.preventDefault(); // Prevent default navigation behavior
//     Alert.alert(
//       "Confirm Logout",
//       "Are you sure you want to logout?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Logout",
//           style: "destructive",
//           onPress: () => dispatch(logoutUser())
//         }
//       ]
//     );
//   };


//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: "#1E90FF",
//         tabBarInactiveTintColor: "gray",
//         tabBarStyle: { paddingVertical: 5 },
//         headerShown: false
//       }}
//     >
//       <Tab.Screen
//         name="QuizzesTab"
//         component={QuizStackNavigator}
//         options={{
//           tabBarLabel: "Quizzes",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="quiz" size={size} color={color} />
//           )
//         }}
//       />

//       <Tab.Screen
//         name="CreateTab"
//         component={MockTestStackNavigator}
//         options={{
//           tabBarLabel: "Create",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="add-circle" size={size} color={color} />
//           )
//         }}
//       />

//       {isAuthenticated ? (
//         <>
//           <Tab.Screen
//             name="Profile"
//             component={ProfileStackNavigator}
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialIcons name="person" size={size} color={color} />
//               )
//             }}
//           />
//           <Tab.Screen
//             name="Logout"
//             component={EmptyScreen}
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialIcons name="exit-to-app" size={size} color={color} />
//               )
//             }}
//             listeners={{ tabPress: handleLogout }}
//           />
//         </>
//       ) : (
//         <Tab.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="login" size={size} color={color} />
//             )
//           }}
//         />
//       )}
//     </Tab.Navigator>
//   );
// }

// const EmptyScreen = () => null;

// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
// // Screens
// import LoginScreen from "../screens/LoginScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import MockTestScreen from "../screens/MockTestScreen";
// import QuizListScreen from "../screens/QuizListScreen";
// import QuizTakingScreen from "../screens/QuizTakingScreen";

// // Create navigators
// const Tab = createBottomTabNavigator();
// const QuizStack = createStackNavigator();
// const MockTestStack = createStackNavigator();
// const ProfileStack = createStackNavigator();

// // Quiz Stack Navigator
// const QuizStackNavigator = () => (
//   <QuizStack.Navigator screenOptions={{ headerShown: false }}>
//     <QuizStack.Screen name="QuizList" component={QuizListScreen} />
//     <QuizStack.Screen name="QuizTaking" component={QuizTakingScreen} />
//   </QuizStack.Navigator>
// );

// // Mock Test Creation Stack Navigator - Added QuizTaking screen here
// const MockTestStackNavigator = () => (
//   <MockTestStack.Navigator screenOptions={{ headerShown: false }}>
//     <MockTestStack.Screen name="MockTest" component={MockTestScreen} />
//     <MockTestStack.Screen name="QuizTaking" component={QuizTakingScreen} />
//   </MockTestStack.Navigator>
// );

// // Profile Stack Navigator 
// const ProfileStackNavigator = () => (
//   <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
//     <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
//     <ProfileStack.Screen name="QuizTaking" component={QuizTakingScreen} />
//   </ProfileStack.Navigator>
// );

// export default function BottomTabs() {
//   const { isAuthenticated } = useSelector((state) => state.user);

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: "#1E90FF",
//         tabBarInactiveTintColor: "gray",
//         tabBarStyle: { paddingVertical: 5 },
//         headerShown: false
//       }}
//     >
//       <Tab.Screen
//         name="QuizzesTab"
//         component={QuizStackNavigator}
//         options={{
//           tabBarLabel: "Quizzes",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="quiz" size={size} color={color} />
//           )
//         }}
//       />

//       <Tab.Screen
//         name="CreateTab"
//         component={MockTestStackNavigator}
//         options={{
//           tabBarLabel: "Create",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="add-circle" size={size} color={color} />
//           )
//         }}
//       />

//       {isAuthenticated ? (
//         <Tab.Screen
//           name="Profile"
//           component={ProfileStackNavigator}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="person" size={size} color={color} />
//             )
//           }}
//         />
//       ) : (
//         <Tab.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="login" size={size} color={color} />
//             )
//           }}
//         />
//       )}
//     </Tab.Navigator>
//   );
// }

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
// Screens
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MockTestScreen from "../screens/MockTestScreen";
import QuizListScreen from "../screens/QuizListScreen";
import QuizTakingScreen from "../screens/QuizTakingScreen";

// Create navigators
const Tab = createBottomTabNavigator();
const QuizStack = createStackNavigator();
const MockTestStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RootStack = createStackNavigator();

// Quiz Stack Navigator
const QuizStackNavigator = () => (
  <QuizStack.Navigator screenOptions={{ headerShown: false }}>
    <QuizStack.Screen name="QuizList" component={QuizListScreen} />
  </QuizStack.Navigator>
);

// Mock Test Creation Stack Navigator
const MockTestStackNavigator = () => (
  <MockTestStack.Navigator screenOptions={{ headerShown: false }}>
    <MockTestStack.Screen name="MockTest" component={MockTestScreen} />
  </MockTestStack.Navigator>
);

// Profile Stack Navigator 
const ProfileStackNavigator = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

// The main tab navigator
const TabNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingVertical: 5 },
        headerShown: false
      }}
    >
      <Tab.Screen
        name="QuizzesTab"
        component={QuizStackNavigator}
        options={{
          tabBarLabel: "Quizzes",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="quiz" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="CreateTab"
        component={MockTestStackNavigator}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle" size={size} color={color} />
          )
        }}
      />

      {isAuthenticated ? (
        <Tab.Screen
          name="Profile"
          component={ProfileStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            )
          }}
        />
      ) : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="login" size={size} color={color} />
            )
          }}
        />
      )}
    </Tab.Navigator>
  );
};

// Root stack that includes both tab navigator and full-screen experiences
export default function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={TabNavigator} />
      <RootStack.Screen 
        name="QuizTaking" 
        component={QuizTakingScreen} 
        options={{ 
          headerShown: false,
          presentation: 'fullScreenModal'
        }}
      />
    </RootStack.Navigator>
  );
}