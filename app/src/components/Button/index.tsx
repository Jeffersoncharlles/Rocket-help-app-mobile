import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';


interface Props extends IButtonProps {
    title: string
}

export const Button = ({ title, ...rest }: Props) => {

    return (
        <ButtonNativeBase
            bg="green.700"
            w="full"
            h={14}
            fontSize="sm"
            rounded="sm"
            _pressed={{ bg: "green.500" }}



            {...rest}
        >
            <Heading color="white" fontSize="sm">
                {title}
            </Heading>
        </ButtonNativeBase>
    );
}