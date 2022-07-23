import { useToast, VStack } from 'native-base';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import { useOrder } from '../../context/OrderContext';


export const Register = () => {
    const { isLoading, setDescription, setPatrimony, CreateNewRegister } = useOrder()


    const handleNewCreateOrder = () => {
        CreateNewRegister()
    }


    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title='Solicitação' />
            <Input
                placeholder='Numero do patrimônio'
                mt={4}
                onChangeText={setPatrimony} />
            <Input
                placeholder='Descrição do problema'
                mt={5}
                flex={1}
                multiline
                textAlignVertical='top'
                onChangeText={setDescription} />
            <Button title='Cadastrar' mt={5} onPress={handleNewCreateOrder} isLoading={isLoading} />
        </VStack>
    );
}