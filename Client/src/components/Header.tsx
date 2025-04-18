import { Flex, Image, Button, } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo1.png";
import '../styles/header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justify="space-between"
      align="center"
      bg="linear-gradient(135deg, #262641, #1b3563)"
      p={4}
      boxShadow="md"
      position="relative"
      height="100px"
    >
      <div className="buttons">
        <Image
          src={logo}
          alt="Aero IQ Logo"
          boxSize="85px"
          mr={2}
          borderRadius={10}
          background="transparent"
          boxShadow="md"
        />
        <Button bg="#23337C" cursor="pointer" onClick={() => navigate("/dashboard")}>
          Home
        </Button>
        <Button bg="#23337C" cursor="pointer" onClick={() => navigate("/")}>
          Logout
        </Button>
      </div>
    </Flex>
  );
};

export default Header;
