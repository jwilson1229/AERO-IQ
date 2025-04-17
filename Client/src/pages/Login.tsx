import React, { useState } from 'react';
import {
    Box, Button, Input, Heading, Text, Link, Center
} from '@chakra-ui/react';
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import { gql, useMutation } from '@apollo/client';
import { Auth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import logo from '../assets/images/logo1.png';

const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [login] = useMutation(LOGIN_USER);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await login({ variables: form });

            Auth.saveToken(data.login.token);


            window.dispatchEvent(new Event('storage'));


            setTimeout(() => {
                navigate("/dashboard");
            }, 100);
        } catch (error) {
            console.error('Login error:', error);
            alert('Login Failed, Please check your credentials');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        
        <Center minH="100vh" bg="linear-gradient(135deg, #262641, #1b3563)">
        <img className='logo' src={logo} alt='Logo'/>
        <Box className='sign-in-box'
            maxW="lg"
            mx="auto"
            mt="12"
            p="6"
            borderRadius="md"
            boxShadow="lg"
            bg="linear-gradient(135deg,rgb(38, 63, 95), #1b3563)"
        >
            <Heading mb="6" textAlign="center" color="white">
                Login
            </Heading>
            <form onSubmit={handleSubmit}>
                <Box mb="4">
                    <FormControl>
                        <FormLabel color="white">Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                            placeholder="Enter your email"
                        />
                    </FormControl>
                </Box>
                <Box mb="4">
                    <FormControl>
                        <FormLabel color="white">Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={form.password}
                            placeholder="Enter your password"
                        />
                    </FormControl>
                </Box>
                <Button
                    type="submit"
                    color="white"
                    width="full"
                    mb="4"
                    bg="#112341"
                >
                    Login
                </Button>
            </form>

            <Text textAlign="center" mt="4" color="white">
                Don't have an account?{' '}
                <Link color="teal.500" onClick={handleRegisterRedirect}>
                    Register
                </Link>
            </Text>
        </Box>
        </Center>
    );
}
