import { Box, Stack, Flex, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";



const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <Box 
            w='200px'
            h='100vh'
            bg='blue.800'
            color='white'
            p={4}
                  >
        <Flex align ="center" mb={6}>
      
        </Flex>

        <Stack align='start' gap={4}>
        <Button cursor="pointer" onClick={() => navigate("/myBets")}>🏆 My Bets</Button>
        <Button cursor="pointer"onClick={() => navigate("/analytics")}>📊 Analytics</Button>
        <Button cursor="pointer">🔍 Arbitrage</Button>
        <Button cursor="pointer">⚙️ Settings</Button>
        </Stack>
      </Box>      
    );
};

export default Sidebar;