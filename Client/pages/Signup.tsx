import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {
    Box, Button, Input, Heading, Text, Link
} from '@chakra-ui/react';
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import { gql, useMutation } from '@apollo/client';
import { Auth } from '../utils/auth';

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
                // Save the token
                Auth.saveToken(data.addUser.token);
                
                // Trigger a storage event to notify other components
                window.dispatchEvent(new Event('storage'));
                
                alert('Signup Successful!');
                
                // Navigate directly to dashboard instead of login page
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
        <Box maxW="sm" mx="auto" mt="10">
            <Heading mb="6">Sign Up</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb="4">
                    <FormLabel>Username</FormLabel>
                    <Input name="username" onChange={handleChange} value={form.username} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" onChange={handleChange} value={form.email} />
                </FormControl>
                <FormControl mb="6">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" onChange={handleChange} value={form.password} />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">Sign Up</Button>
                <Text textAlign="center" mt="4">
                                Already have an account?{' '}
                                <Link color="teal.500" onClick={handleSignInChange}>
                                Login
                                </Link>
                            </Text>
            </form>
        </Box>
    );
}
