import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Details } from "../pages/Details";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";


const { Navigator, Screen } = createNativeStackNavigator()

const options = {
    headerShown: false
}

export const AppRoutes = () => {
    return (
        <Navigator screenOptions={options}>
            <Screen name="home" component={Home} />
            <Screen name="register" component={Register} />
            <Screen name="details" component={Details} />
        </Navigator>
    )
}