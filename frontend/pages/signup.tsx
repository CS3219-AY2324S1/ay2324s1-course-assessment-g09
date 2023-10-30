'use client';
import { useRouter } from 'next/router';
import { FormControl, FormLabel, Button, Input, VStack, Box, Heading, Highlight, Select, Spinner } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

const SignUp = () => {
    const router = useRouter();
    const toast = useToast();
    const [submitStatus, setSubmitStatus] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();



        const form = event.target;
        const formData = new FormData(form);
        if (formData.get("password") === formData.get("confirm_password") && !submitStatus) {
            setSubmitStatus(true);
            try {
                const response = await fetch(`/auth_service/userauth/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: formData.get("username"),
                        name: formData.get("name"),
                        email: formData.get("email"),
                        password: formData.get("password"),
                        role: formData.get("role")
                    })
                });

                if (response.ok) {
                    toast({
                        position: 'bottom-left', render: () => (
                            <Box color='white' bg='green.300' textAlign="center" padding="10px" rounded="md">
                                Account created
                            </Box>
                        )
                    })
                    router.push('/signin');
                    return;
                } else {
                    const result = await response.json();
                    result.message.map(err => {
                        toast({
                            position: 'bottom-left', render: () => (
                                <Box color='white' bg='red.300' textAlign="center" padding="10px" rounded="md">
                                    {err}
                                </Box>
                            )
                        })
                    });
                }
            } catch (error) {
                console.log("err", error);
                toast({
                    position: 'bottom-left', render: () => (
                        <Box color='white' bg='red.300' textAlign="center" padding="10px" rounded="md">
                            {"Something went wrong..."}
                        </Box>
                    )
                })
            }
            setSubmitStatus(false);
        } else {

            toast({
                position: 'bottom-left', render: () => (
                    <Box color='white' bg='red.300' textAlign="center" padding="10px" rounded="md">
                        Passwords do not match
                    </Box>
                )
            })
        }
    }

    return (
        <VStack width="100vw" height="100vh" align="center" justifyContent="center" spacing='50px'>
            <Box textAlign="center">
                <Heading>
                    <Highlight query='PeerPrep'
                        styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}>
                        Welcome to PeerPrep
                    </Highlight>
                </Heading>
            </Box>
            <form onSubmit={handleSubmit}>

                <VStack spacing={4} width="25vw">
                    <FormControl >
                        <FormLabel >Email</FormLabel>
                        <Input name="email" type="email" placeholder='john@peerprep.com' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input name="name" type="text" placeholder='john tan' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input name="username" type="text" placeholder='johnxyz' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input name="password" type="password" />
                    </FormControl>
                    <FormControl>
                        <FormLabel> Confirm Password</FormLabel>
                        <Input name="confirm_password" type="password" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Select name="role" >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </Select>
                    </FormControl>
                    {
                        !submitStatus
                            ? (<Button type='submit' marginLeft="20vw">Signup</Button>)
                            : (<Spinner marginLeft="23vw" />)
                    }


                </VStack>

            </form >

        </VStack >
    );
}


export default SignUp;

