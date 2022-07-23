import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "native-base";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/native";
import { OrderProps } from "../../components/Order";
import { dateFormat } from "../../utils/firestoreDateFormat";
import { OrderDetails, OrderFirestoreDTO } from "./DTOs/OrderFirestoreDTO";


interface IOrderContext {
    setDescription: (data: string) => void
    setPatrimony: (data: string) => void
    isLoading: boolean
    CreateNewRegister: () => void
    orders: OrderProps[]
    statusSelected: 'open' | 'closed'
    setStatusSelected: (status: 'open' | 'closed') => void

    showOrder: (orderId: string) => void
    order: OrderDetails
    setSolution: (text: string) => void
    updateOrderCLosed: (orderId: string) => void
}

export const OrderContext = createContext({} as IOrderContext)



export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
    const toast = useToast()
    const navigation = useNavigation()
    const [orders, setOrders] = useState<OrderProps[]>([])
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
    const [isLoading, setIsLoading] = useState(true)
    const [description, setDescription] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)
    const [solution, setSolution] = useState('')

    //========================================================================================//
    const CreateNewRegister = () => {
        if (!patrimony || !description) {
            return toast.show({ placement: 'top', description: 'Preencha todos os campos', duration: 4000 })
        }
        setIsLoading(true)
        firestore()
            .collection('orders')
            .add({
                patrimony,
                description,
                status: 'open',
                created_at: firestore.FieldValue.serverTimestamp()
            }).then(() => {
                toast.show({ placement: 'top', description: 'Solicitação registrada com sucesso', duration: 4000 })
                navigation.goBack()
                setIsLoading(false)
            }).catch((error) => {
                setIsLoading(false)
                return toast.show({ placement: 'top', description: 'Não foi possível registrar a solicitação', duration: 4000 })
            })
    }
    //========================================================================================//
    const showOrder = (orderId: string) => {
        firestore()
            .collection<OrderFirestoreDTO>('orders')
            .doc(orderId)
            .get()
            .then((doc) => {
                const { patrimony, description, status, created_at, closed_at, solution } = doc.data()
                const closed = closed_at ? dateFormat(closed_at) : null
                setOrder({
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    solution,
                    when: dateFormat(created_at),
                    closed
                })
                setIsLoading(false)
            })
    }
    const updateOrderCLosed = (orderId) => {
        if (!solution) {
            return toast.show({ placement: 'top', description: 'Informa a solução para encerrar a solicitação', duration: 4000 })
        }
        setIsLoading(true)

        firestore().collection<OrderFirestoreDTO>('orders')
            .doc(orderId)
            .update({
                status: 'closed',
                solution,
                closed_at: firestore.FieldValue.serverTimestamp()
            }).then(() => {
                toast.show({ placement: 'top', description: 'Solicitação encerrada', duration: 4000 })
                setIsLoading(false)
                navigation.goBack()
            }).catch((error) => {
                toast.show({ placement: 'top', description: 'Não foi possível encerrar a solicitação', duration: 4000 })
            })
    }
    //========================================================================================//
    useEffect(() => {
        setIsLoading(true)
        const subscriber = firestore()
            .collection('orders')
            .where('status', '==', statusSelected)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map((doc) => {
                    const { patrimony, description, status, created_at } = doc.data()
                    return {
                        id: doc.id,
                        patrimony,
                        description,
                        status,
                        when: dateFormat(created_at)
                    }
                })
                setOrders(data)
                setIsLoading(false)
            })
        return subscriber
    }, [statusSelected])
    //========================================================================================//

    return (
        <OrderContext.Provider value={{
            setDescription, setPatrimony,
            CreateNewRegister, setStatusSelected,
            showOrder, setSolution,
            updateOrderCLosed,
            isLoading, orders, statusSelected, order
        }}>
            {children}
        </OrderContext.Provider>
    )
}


export const useOrder = () => {
    const context = useContext(OrderContext)
    return context
}