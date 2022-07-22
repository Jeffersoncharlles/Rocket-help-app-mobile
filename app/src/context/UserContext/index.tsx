import { createContext, useContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'


interface IUserContext {
    loading: boolean
    user: FirebaseAuthTypes.User
    setLoading: (state: boolean) => void
}


export const UserContext = createContext({} as IUserContext)



export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<FirebaseAuthTypes.User>()

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(res => {
            setUser(res)
            setLoading(false)
        })

        return subscriber
    }, [])

    return (
        <UserContext.Provider value={{ loading, user, setLoading }}>
            {children}
        </UserContext.Provider>
    )
}


export const useUser = () => {
    const context = useContext(UserContext)
    return context
}