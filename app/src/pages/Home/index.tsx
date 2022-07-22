import { useNavigation } from '@react-navigation/native';
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack, useToast } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth'

import Logo from '../../assets/logo_secondary.svg'
import { Button } from '../../components/Button';
import { Filter } from '../../components/Filter';
import { Order } from '../../components/Order';
import { useOrder } from '../../context/OrderContext';
import { Loading } from '../../components/Loading';



export const Home = () => {
    const { colors } = useTheme()
    const toast = useToast()
    const navigation = useNavigation()
    const { orders, isLoading, statusSelected, setStatusSelected } = useOrder()

    const handleLogout = () => {
        auth().signOut().catch(error => {
            return toast.show({ placement: 'top', description: 'Não foi possível sair', duration: 4000 })
        })
    }

    const handleNewOrder = () => {
        navigation.navigate('register')
    }

    const handleOpenDetails = (orderId: string) => {
        navigation.navigate('details', { orderId })
    }

    return (
        <VStack flex={1} bg="gray.700" pb={6}>
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pb={5}
                pt={12}
                px={6}

            >
                <Logo />

                <IconButton
                    onPress={handleLogout}
                    icon={<SignOut color={colors.gray[300]} size={26} />}
                />

            </HStack>

            <VStack flex={1} px={6}>
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Solicitações
                    </Heading>
                    <Text color="gray.200">
                        {orders.length}
                    </Text>
                </HStack>
                <HStack space={3} mb={8}>
                    <Filter
                        title='em andamento'
                        type='open'
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />
                    <Filter
                        title='finalizados'
                        type='closed'
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>
                {isLoading ? <Loading /> :
                    <FlatList
                        data={orders}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        ListEmptyComponent={() => (
                            <Center>
                                <ChatTeardropText color={colors.gray[300]} size={40} />
                                <Text color="gray.300" fontSize="xl" textAlign="center" mt={6}>
                                    Você ainda não possui {'\n'}
                                    solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                                </Text>
                            </Center>
                        )}

                        renderItem={
                            ({ item }) => <Order order={item} onPress={() => handleOpenDetails(item.id)} />
                        }
                    />
                }
                <Button title='Nova Solicitação' onPress={handleNewOrder} />
            </VStack>





        </VStack>
    );
}