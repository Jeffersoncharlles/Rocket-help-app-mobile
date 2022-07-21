import { useRoute } from '@react-navigation/native';
import { Text, VStack } from 'native-base';
import { Header } from '../../components/Header';

type RoutesParams = {
    orderId: string
}

export const Details = () => {
    const { params } = useRoute()
    const { orderId } = params as RoutesParams

    return (
        <VStack flex={1} bg="gray.700">
            <Header title='solicitação' />
            <Text color="white">
                {orderId}
            </Text>
        </VStack>
    );
}