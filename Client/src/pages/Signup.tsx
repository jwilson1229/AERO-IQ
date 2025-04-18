import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {
    Box, Button, Input, Heading, Text, Link, Center
} from '@chakra-ui/react';
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import { gql, useMutation } from '@apollo/client';
import { Auth } from '../utils/auth';
import "../styles/signUp.css";
import logo from '../assets/images/logo1.png';

const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password:$password) {
    token
    user {
      _id
      username
      email
  }}}
`;

export default function Signup() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await addUser({ variables: form });
            if (data?.addUser?.token) {
                Auth.saveToken(data.addUser.token);

                window.dispatchEvent(new Event('storage'));

                alert('Signup Successful!');

                setTimeout(() => {
                    navigate('/dashboard');
                }, 100);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Signup Failed');
        }
    };
    const handleSignInChange = () => {
        navigate('/')
    }

    return (
        <Center minH="100vh" bg="linear-gradient(135deg, #262641, #1b3563)">
            <img className='logo' src={logo} alt='Logo' />
        <Box  maxW="lg"
            mx="auto"
            mt="14"
            p="6"
            borderRadius="md"
            boxShadow="lg"
            bg="linear-gradient(135deg,rgb(38, 63, 95), #1b3563)">
            <Heading mb="6" textAlign="center" color="white">Sign Up</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb="4">
                    <FormLabel color="white">Username</FormLabel>
                    <Input name="username" onChange={handleChange} value={form.username} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel color="white">Email</FormLabel>
                    <Input type="email" name="email" onChange={handleChange} value={form.email} />
                </FormControl>
                <FormControl mb="6">
                    <FormLabel color="white">Password</FormLabel>
                    <Input type="password" name="password" onChange={handleChange} value={form.password} />
                </FormControl>
                <Button type="submit" bg="#112341" width="full">Sign Up</Button>
                <Text textAlign="center" mt="4" color="white">
                    Already have an account?{' '}
                    <Link color="teal.500" onClick={handleSignInChange}>
                        Login
                    </Link>
                </Text>
            </form>
        </Box>
        </Center>
    );
}
