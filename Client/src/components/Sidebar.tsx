import { Box, Stack, Flex, Button, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";



const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Box
      w='200px'
      h='100vh'
      bg='blue.900'
      color='white'
      p={4}
      mt={2}
      position='relative'
    >
      <Flex align="center" mb={6}>

      </Flex>
      <div className='buttons'>
        <Stack align='start' gap={4}>
          <Text fontSize={55}>Aero-IQ</Text>
          <Button cursor="pointer" bg='#23337C' onClick={() => navigate("/myBets")}>🏆 My Bets</Button>
          <Button cursor="pointer" bg='#23337C' onClick={() => navigate("/analytics")}>📊 Analytics</Button>
          <Button cursor="pointer" bg='#23337C'>🔍 Arbitrage</Button>
          <Button cursor="pointer" bg='#23337C'>⚙️ Settings</Button>
        </Stack>
      </div>
    </Box>
  );
};

export default Sidebar;