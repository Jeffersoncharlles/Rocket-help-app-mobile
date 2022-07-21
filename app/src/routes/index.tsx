import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "../pages/SignIn";
import { AppRoutes } from "./app.routes";

export const Routes = () => {
    return (
        <NavigationContainer>
            {/* <SignIn /> */}
            <AppRoutes />
        </NavigationContainer>
    )
}