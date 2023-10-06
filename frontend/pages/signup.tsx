'use client';
import { useRouter } from 'next/router';
import { FormControl, FormLabel, Button, Flex, Input, VStack, Box, Heading, Highlight, Select } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

const SignUp = () => {
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        if (formData.get("password") === formData.get("confirm_password")) {

            console.log("Email", formData.get("email"));
            console.log("Username", formData.get("username"));
            console.log("password", formData.get("password"));
            console.log("role", formData.get("role"));

            try {
                const response = await fetch('http://localhost:3002/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: formData.get("username"),
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
                    // router.push('/signin');
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
                    console.log("Typeasdasd", result.message);
                }
            } catch (error) {
                console.log("err", error);
            }
            // const response = await fetch('localhost:3002/auth/signup', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         username: formData.get("username"),
            //         email: formData.get("email"),
            //         password: formData.get("password"),
            //         role: formData.get("role")
            //     })
            // });

            // if (response.ok) {
            //     toast({
            //         position: 'bottom-left', render: () => (
            //             <Box color='white' bg='green.300' textAlign="center" padding="10px" rounded="md">
            //                 Account created
            //             </Box>
            //         )
            //     })
            //     router.push('/');
            // } else {
            //     console.error('Error');
            // }
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
                        <FormLabel>Username</FormLabel>
                        <Input name="username" type="text" placeholder='john tan' />
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

                    <Button type='submit' marginLeft="20vw">Signup</Button>

                </VStack>

            </form >
        </VStack >
    );
}
{/* <FormLabel>Email</FormLabel>
<FormLabel>Username</FormLabel>
<FormLabel>Password</FormLabel>
<FormLabel>Confirm Password</FormLabel>
<Input name="email" type="email" />
<Input name="username" type="text" />
<Input name="password" type="password" />
<Input name="confirm_password" type="password" /> */}

export default SignUp;

{/* <form method="post" onSubmit={handleSubmit}>
<label>Email:
    <input name="email" type="email" />
</label>
<label>Username:
    <input name="username" type="text" />
</label>
<label>Password:
    <input name="password" type="password" />
</label>
<label>Confirm Password:
    <input name="confirm_password" type="password" />
</label>
<input type="submit" />
</form> */}
