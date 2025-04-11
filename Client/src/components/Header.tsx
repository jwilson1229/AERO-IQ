import { Flex, Text, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

    return (
        <Flex
        justify='space-between'
        align='center'
        bg='white'
        p={4}
        boxShadow='md'
        >
            <Text fontSize='xl' fontWeight='bold'>Aero-IQ</Text>
            <Button onClick={() => navigate("/")}>Logout</Button>
            <Button onClick={() => navigate("/dashboard")}>Home</Button>
        </Flex>
    );
};

export default Header;