const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser); // Needed to parse POST request bodies

server.post("/login", (req, res) => {
	const { email } = req.body;
	const users = router.db.get("users").value(); // Returns the user object
	const user = users.find((u) => u.email === email);
	if (user) {
		const result_json = {
			id: user.id,
			name: user.name,
			email: user.email,
			token: `mock-token-${user.id}`,
			role: user.role,
			employee_id: user.employee_id != null ? user.employee_id : null,
			client_id: user.client_id != null ? user.client_id : null,
		};

		res.json(result_json);
	} else {
		res.status(401).json({
			message: "Invalid email or password",
		});
	}
});

server.post("/new_client", async (req, res) => {
	const fetch = (await import("node-fetch")).default;
	const { name, email, document, zip_code, address, phone } = req.body;

	try {
		const userResponse = await fetch("http://localhost:3000/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name,
				email,
				role: 2,
				employee_id: null,
				client_id: null,
			}),
		});

		if (!userResponse.ok) {
			throw new Error("Failed to create user");
		}

		const newUser = await userResponse.json();

		const clientResponse = await fetch("http://localhost:3000/clients", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				document,
				zip_code,
				address,
				phone,
				user_id: newUser.id,
			}),
		});

		if (!clientResponse.ok) {
			throw new Error("Failed to create client");
		}

		const newClient = await clientResponse.json();

		const updateUserResponse = await fetch(
			`http://localhost:3000/users/${newUser.id}`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ client_id: newClient.id }),
			},
		);

		if (!updateUserResponse.ok) {
			throw new Error("Failed to update user with client_id");
		}

		const updatedUser = await updateUserResponse.json();

		res.status(201).json({
			user: updatedUser,
			client: newClient,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error while registering",
			error: error.message,
		});
	}

	const users = router.db.get("users").value();
});

server.use(router);
server.listen(3000, () => {
	console.log("JSON Server is running on port 3000");
});
