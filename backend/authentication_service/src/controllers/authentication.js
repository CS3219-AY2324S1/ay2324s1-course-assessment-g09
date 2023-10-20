const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const url = require("url");

const authRouter = express.Router();
const axios = require("axios");
const { ZodError } = require("zod");
const userSchema = require("../utility/ZSchema").userSchema;

const tokenDetails = {
	secret: process.env.SECRET_KEY,
	duration: "1800s",
};

authRouter.post("/signup", async (request, response) => {
	try {
		const body = request.body;
		console.log(body);
		const { email, username, password, role } = userSchema.parse(body);

		const pwHash = await bcrypt.hash(password, 17);

		const result = await axios.post(
			"http://localhost:3002/users/createUser",
			{
				email: email,
				username: username,
				password: pwHash,
				role: role,
			}
		);

		return response.json({
			message: [`User:${username} has been created`],
		});
	} catch (error) {
		if (error instanceof ZodError) {
			const allMsg = error.issues.map((issue) => issue.message);
			return response.status(400).json({ message: allMsg });
		}
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.header);
			return response
				.status(error.response.status)
				.json({ message: error.response.data.message });
		} else {
			console.log("Err:", error);
		}
		return response
			.status(500)
			.json({ message: ["something went wrong..."] });
	}
});

authRouter.post("/signin", async (request, response) => {
	// if already have token then don't return token
	console.log("COOK", request.cookies);
	if (request.headers.authorization) {
		jwt.verify(
			request.headers.authorization,
			tokenDetails.secret,
			(error, user) => {
				if (!error) {
					console.log("already logged in");
					return response.status(200).send();
				}
			}
		);
	}

	try {
		const { email, password } = request.body;
		if (!email && !password) {
			return response
				.status(400)
				.json({ message: "Login requires email and password" });
		}

		const params = new url.URLSearchParams({ email: email });

		const result = await axios.get(
			`http://localhost:3002/users/getUserByEmail?${params}`
		);

		const myUser = result.data;
		console.log(myUser);

		const passwordCheck = await bcrypt.compare(password, myUser.password);
		if (!passwordCheck) {
			return response
				.status(400)
				.json({ message: "incorrect email or password" });
		}

		const token = jwt.sign(
			{ email: myUser.email, role: myUser.role },
			tokenDetails.secret,
			{ expiresIn: tokenDetails.duration }
		);

		// response.setHeader('Set-Cookie', [`accessToken=${token}; HttpOnly; Max-Age=34560000`]);
		response.cookie("token", token, {
			secure: false,
			httpOnly: true,
		});
		return response
			.status(200)
			.send({ message: "login success", email: myUser.email }); //.json({ token: token, role: myUser.role });
	} catch (error) {
		if (error.response) {
			if (error.response.status === 404) {
				return response
					.status(400)
					.json({ message: "incorrect email or password" });
			}
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.header);
		} else {
			console.log("Err:", error);
		}

		return response
			.status(500)
			.json({ message: "something went wrong..." });
	}
});

authRouter.post("/signout", async (request, response) => {
	response.cookie("token", "", {
		secure: false,
		httpOnly: true,
	});
	return response.status(200).send(); //.json({ token: token, role: myUser.role });
});

module.exports = authRouter;
