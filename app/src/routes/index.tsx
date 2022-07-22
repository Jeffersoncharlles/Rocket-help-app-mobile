import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "../pages/SignIn";
import { AppRoutes } from "./app.routes";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { UserProvider, useUser } from "../context/UserContext";
import { OrderProvider } from "../context/OrderContext";

export const Routes = () => {
    // const { loading, setLoading, user } = useUser()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<FirebaseAuthTypes.User>()

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(res => {
            setUser(res)
            setLoading(false)
        })

        return subscriber

    }, [])

    if (loading) {
        return <Loading />
    }

    return (

        <UserProvider>
            <NavigationContainer>
                <OrderProvider>
                    {user ? <AppRoutes /> : <SignIn />}
                </OrderProvider>
            </NavigationContainer>
        </UserProvider>

    )
}