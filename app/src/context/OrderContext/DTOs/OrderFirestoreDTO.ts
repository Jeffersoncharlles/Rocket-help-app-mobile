import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { OrderProps } from "../../../components/Order";

export interface OrderFirestoreDTO {
    patrimony: string
    description: string
    status: 'open' | 'closed'
    solution?: string;
    created_at: FirebaseFirestoreTypes.Timestamp
    closed_at?: FirebaseFirestoreTypes.Timestamp
}

export interface OrderDetails extends OrderProps {
    description: string
    solution?: string;
    closed: string
}
