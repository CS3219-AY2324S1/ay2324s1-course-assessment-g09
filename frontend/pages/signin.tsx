'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormControl, FormLabel, Button, Input, VStack, Box, Heading, Highlight, HStack, Link, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

const SignUp = () => {
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        if (sessionStorage.getItem("login")) {
            const eToken = JSON.parse(sessionStorage.getItem("login")).token;
            if (eToken) {
                router.push('/');
            }
        }
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        try {
            var eToken = "";
            if (sessionStorage.getItem("login")) {
                eToken = JSON.parse(sessionStorage.getItem("login")).token;
            }
            const response = await fetch('http://localhost:3002/auth/signin', {
                method: 'POST',
                headers: {
                    'Authorization': eToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.get("email"),
                    password: formData.get("password"),
                })
            });
            const result = await response.json();
            // console.log("result", result);
            if (response.ok) {
                sessionStorage.setItem(
                    "login",
                    JSON.stringify({
                        userLogin: true,
                        token: result.token,
                        role: result.role
                    })
                );

                toast({
                    position: 'bottom-left', render: () => (
                        <Box color='white' bg='green.300' textAlign="center" padding="10px" rounded="md">
                            Welcome to PeerPrep, { }
                        </Box>
                    )
                })
                router.push('/');
            } else {
                toast({
                    position: 'bottom-left', render: () => (
                        <Box color='white' bg='red.300' textAlign="center" padding="10px" rounded="md">
                            {result.message}
                        </Box>
                    )
                })
            }
        } catch (error) {
            console.log("err", error);
        }

    }

    return (
        <VStack width="100vw" height="100vh" align="center" justifyContent="center" spacing='50px'>
            <Box textAlign="center">
                <Heading>
                    <Highlight query='PeerPrep'
                        styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}>
                        Login to PeerPrep
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
                        <FormLabel>Password</FormLabel>
                        <Input name="password" type="password" />
                    </FormControl>

                    <HStack>

                        <Link href='/signup' width="7vw">
                            Create account
                        </Link>


                        <Button type='submit' marginLeft="13vw">Login</Button>
                    </HStack>

                </VStack>

            </form >
        </VStack >
    );
}


export default SignUp;

