
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation, Text } from 'react-native-paper';
import {
  Home,
  Login,
  Signup,
  Details,
  Setting,
  Cart,
  CheckOut,
  Search,
  Categories,
  SendPass
} from '../screens'
import { primaryColor } from '../assets/color';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName='Login'
       screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SendPass" component={SendPass} options={{headerShown:true,title:'Quên mật khẩu', headerStyle:{backgroundColor:primaryColor},headerTintColor:'#fff'}}/>
        <Stack.Screen name="Setting" component={Setting}  options={{headerShown:true,title:'Bạn', headerStyle:{backgroundColor:primaryColor},headerTintColor:'#fff'}}/>
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Cart" component={Cart} options={{headerShown:true,title:'Giỏ hàng',headerStyle:{backgroundColor:primaryColor},headerTintColor:'#fff'}}/>
        <Stack.Screen name="CheckOut" component={CheckOut} options={{headerShown:true,title:'Thanh toán', headerStyle:{backgroundColor:primaryColor},headerTintColor:'#fff'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
