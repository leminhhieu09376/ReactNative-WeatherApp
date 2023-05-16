
import { StyleSheet, View } from 'react-native';
import Weather from './src';
import Todo from './src/toDo';
import Planned from './src/planned';
import Remind from './src/remind';
import Chart from './src/chart';
import SevenDayW from './src/senvenDayW';
import Login from './src/login';
import Register from './src/register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/home';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Feeding from './src/feeding';
import Sharing from './src/sharing';
import ViewFriend from './src/viewFriend';
const Drawer = createDrawerNavigator();


const Stack = createNativeStackNavigator();
const HomeDrawer = () => {
  return (
    <Drawer.Navigator useLegacyImplementation={true} initialRouteName='Home' screenOptions={{ headerShown: false }} >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Chart" component={Chart} />
      <Drawer.Screen name="SevenDayW" component={SevenDayW} />
      <Drawer.Screen name="Todo" component={Todo} />
      <Drawer.Screen name="Planned" component={Planned} />
      <Drawer.Screen name="Remind" component={Remind} />
      <Drawer.Screen name="Feeding" component={Feeding} />
      <Drawer.Screen name="Sharing" component={Sharing} />
      <Drawer.Screen name="ViewFriend" component={ViewFriend} />
      <Drawer.Screen name="Logout" component={Weather} />


    </Drawer.Navigator>
  );
}
export default function App() {
  return (


    <NavigationContainer>

      <Stack.Navigator >
        <Stack.Screen name="Weather" component={Weather} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="Planned" component={Planned} options={{ headerShown: false }} />
        <Stack.Screen name="Feeding" component={Feeding} options={{ headerShown: false }} />
        <Stack.Screen name="Sharing" component={Sharing} options={{ headerShown: false }} />
        <Stack.Screen name="ViewFriend" component={ViewFriend} options={{ headerShown: false }} />
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <Weather /> */}
        {/* <Chart /> */}
        {/* <Todo /> */}
        {/* <Planned /> */}
        {/* <Remind /> */}
        {/* <SevenDayW /> */}

      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
