const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const url = require("url");

const authRouter = express.Router();
const axios = require("axios");
const { ZodError } = require("zod");
const userSchema = require("../utility/ZSchema").userSchema;
const passwordSchema = require("../utility/ZSchema").passwordSchema;

const tokenDetails = {
	secret: process.env.SECRET_KEY,
	duration: "2 days",
};

const user_service = process.env.USER_SERVICE;

authRouter.post("/signup", async (request, response) => {
	try {
		const body = request.body;
		console.log(body);
		const { email, name, username, password, role } = userSchema.parse(body);

		const pwHash = await bcrypt.hash(password, 6);

		const result = await axios.post(
			`http://${user_service}/users/createUser`,
			{
				email: email,
				name: name,
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

authRouter.post('/signin', async (request, response) => {
	// if already have token then don't return token
	console.log("COOK", request.cookies);
	if (request.cookies && Object.getPrototypeOf(request.cookies) !== null) {
		try {
			const decoded = await jwt.verify(request.cookies.token, process.env.SECRET_KEY);
			return response.status(200).send({ message: "login success" });
		} catch (error) {
			console.log("verify", error.message);
		}
	}

	try {
		const { email, password } = request.body;
		if (!email && !password) {
			return response.status(400).json({ message: "Login requires email and password" });
		}

		const params = new url.URLSearchParams({ email: email });

		const result = await axios.get(`http://${user_service}/auth/getUserByEmail?${params}`);

		const myUser = result.data;
		console.log(myUser);

		const passwordCheck = await bcrypt.compare(password, myUser.password);
		if (!passwordCheck) {
			return response.status(400).json({ message: "incorrect email or password" });
		}

		const token = jwt.sign({ email: myUser.email, role: myUser.role, id: myUser.id }, tokenDetails.secret, { expiresIn: tokenDetails.duration });

		// response.setHeader('Set-Cookie', [`accessToken=${token}; HttpOnly; Max-Age=34560000`]);
		response.cookie('token', token, {
			secure: false,
			httpOnly: true
		});
		return response.status(200).send({ message: "login success", email: myUser.email, role: myUser.role });//.json({ token: token, role: myUser.role });
	} catch (error) {
		if (error.response) {
			if (error.response.status === 404) {
				return response.status(400).json({ message: "incorrect email or password" });
			}
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.header);
		} else {
			console.log("Err:", error);
		}

		return response.status(500).json({ message: "something went wrong..." });
	}

});

authRouter.post("/signout", async (request, response) => {
	response.cookie("token", "", {
		secure: false,
		httpOnly: true,
	});
	return response.status(200).send(); //.json({ token: token, role: myUser.role });
});

authRouter.put("/updatePassword/", async (request, response) => {

	try {
		console.log("ENTER AUTH ROUTER")
		const { password } = passwordSchema.parse(request.body);
		const { id } = request.body;
		console.log("ID IS", id);
		if (request.cookies && Object.getPrototypeOf(request.cookies) !== null) {

			const decoded = await jwt.verify(request.cookies.token, process.env.SECRET_KEY);
			console.log("decoded", decoded);
			if (decoded.id != id) {
				return response.status(401).send();
			}
			const pwHash = await bcrypt.hash(password, 6);
			console.log("Right before user_service")
			const result = await axios.put(
				`http://${user_service}/auth/updatePassword`,
				{
					id: id,
					password: pwHash,
				}
			);
			response.cookie("token", "", {
				secure: false,
				httpOnly: true,
			});
			return response.json({
				message: [`Password has been updated`],
			}).send();
		} else {
			return response.status(401).send();
		}
	} catch (error) {
		if (error instanceof ZodError) {
			const allMsg = error.issues.map((issue) => issue.message);
			return response.status(400).json({ message: allMsg });
		} else if (error instanceof jwt.JsonWebTokenError) {
			return response.status(401).send();
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

module.exports = authRouter;
