import { useRoute } from '@react-navigation/native';
import { HStack, Text, VStack, useTheme, ScrollView, Box } from 'native-base';
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native';
import { useEffect } from 'react';
import { Button } from '../../components/Button';
import { CardDetails } from '../../components/CardDetails';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Loading } from '../../components/Loading';
import { OrderProps } from '../../components/Order';
import { useOrder } from '../../context/OrderContext';

type RoutesParams = {
    orderId: string
}


export const Details = () => {
    const { showOrder, order, isLoading, setSolution, updateOrderCLosed } = useOrder()
    const { colors } = useTheme()
    const { params } = useRoute()
    const { orderId, } = params as RoutesParams

    const handleOrderCLosed = () => {
        updateOrderCLosed(orderId)
    }

    useEffect(() => {
        showOrder(orderId)
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bg="gray.700">
            <Box px={6} bg="gray.600">
                <Header title='solicitação' />
            </Box>

            <HStack bg="gray.500" justifyContent="center" p={4}>
                {order.status === 'closed' ?
                    <CircleWavyCheck size={22} color={colors.green[300]} />
                    : <Hourglass size={22} color={colors.secondary[700]} />
                }

                <Text
                    fontSize="sm"
                    color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
                    ml={2}
                    textTransform="uppercase"
                >
                    {order.status === 'closed' ? 'finalizado' : 'em andamento'}
                </Text>
            </HStack>
            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <CardDetails
                    title='equipamento'
                    description={`Patrimônio ${order.patrimony}`}
                    icon={DesktopTower}
                    footer={order.when}
                />
                <CardDetails
                    title='descrição do problema'
                    description={`${order.description}`}
                    icon={Clipboard}

                />
                <CardDetails
                    title='solução'
                    description={order.solution}
                    icon={CircleWavyCheck}
                    footer={order.closed && `Encerrado em ${order.closed}`}


                >
                    {order.status === 'open' && (
                        <Input
                            placeholder='Descrição da solução'
                            onChangeText={setSolution}
                            h={24}
                            textAlignVertical="top"
                            multiline
                        />
                    )}
                </CardDetails>

                {order.status === 'open' && <Button title='Encerrar solicitação' mt={5} onPress={handleOrderCLosed} isLoading={isLoading} />

                }

            </ScrollView>
        </VStack>
    );
}