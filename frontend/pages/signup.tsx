'use client';
import { useRouter } from 'next/router';

const SignUp = () => {
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        if (formData.get("password") === formData.get("confirm_password")) {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.get("username"),
                    email: formData.get("email"),
                    password: formData.get("password"),
                    role: "user"
                })
            })
            if (response.ok) {
                router.push('/');
            } else {
                console.error('Error');
            }
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
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
        </form>
    );
}

export default SignUp;
