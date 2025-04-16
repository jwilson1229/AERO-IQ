import React, { useState } from 'react';
import {
    Box, Button, Input, Heading, Text, Link
} from '@chakra-ui/react';
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import { gql, useMutation } from '@apollo/client';
import { Auth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

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
        <Box
            maxW="lg"
            mx="auto"
            mt="10"
            p="6"
            borderRadius="md"
            boxShadow="lg"
            bg="white"
        >
            <Heading mb="6" textAlign="center" color="teal.500">
                Login
            </Heading>
            <form onSubmit={handleSubmit}>
                <Box mb="4">
                    <FormControl>
                        <FormLabel>Email</FormLabel>
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
                        <FormLabel>Password</FormLabel>
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
                    colorScheme="teal"
                    width="full"
                    mb="4"
                >
                    Login
                </Button>
            </form>

            <Text textAlign="center" mt="4">
                Don't have an account?{' '}
                <Link color="teal.500" onClick={handleRegisterRedirect}>
                Register
                </Link>
            </Text>
        </Box>
    );
}
