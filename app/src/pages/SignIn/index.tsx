import { Heading, Icon, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import Logo from '../../assets/logo_primary.svg'
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";


export const SignIn = () => {
    const { colors } = useTheme()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = () => {

    }


    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />
            <Heading
                color="gray.100"
                fontSize="xl"
                mt={20}
                mb={6}
            >
                Acesse sua conta
            </Heading>

            <Input
                type="text"
                placeholder="E-mail"
                mb={4}
                InputLeftElement={
                    <Icon ml={4} as={<Envelope color={colors.gray[300]} />}
                    />}
                onChangeText={e => setEmail(e)}
                value={email}
            />
            <Input
                type="password"
                placeholder="Senha"
                InputLeftElement={
                    <Icon ml={4} as={<Key color={colors.gray[300]} />}
                    />}
                secureTextEntry
                onChangeText={e => setPassword(e)}
                value={password}
            />
            <Button
                title="Entrar"
                mt={6}
                onPress={handleSignIn}
            />
        </VStack>
    );
}