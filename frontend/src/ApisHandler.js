//This File Handles all api callings

const base_url = "http://127.0.0.1:1323/api/v1/";

const chats = [
	{ photoUrl: "", name: "John Doe", latestMessage: "Hello, how are you?" },
	{ photoUrl: "profile.jpg", name: "Alice Smith", latestMessage: "Hey there!" },
	{
		photoUrl: "profile.jpg",
		name: "hasan kachal",
		latestMessage: "Hey there!",
	},
	{ photoUrl: "profile.jpg", name: "ali rezaaa", latestMessage: "Hey there!" },
	{ photoUrl: "profile.jpg", name: "user bad", latestMessage: "Hey there!" },
	// Add more dummy data as needed
];

const contacts = [
	{ photoUrl: "", name: "Contact ", latestMessage: "Hello, how are you?" },
	{ photoUrl: "", name: "Contanct 2 ", latestMessage: "sdsd!" },
	// Add more dummy data as needed
];

export function getUserChats() {
	console.log("get chats");
	return chats;
}

export function getUserContacts() {
	console.log("get contacts");
	return contacts;
}

function setTokenCookie(token) {
	const expirationDate = new Date(); // You can set an expiration date if needed
	expirationDate.setHours(expirationDate.getHours() + 24); // Example: Expires in 1 hour

	document.cookie = `Bearer=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}

export async function login(username, password) {
	try {
		const formData = new FormData();
		formData.append("username", username);
		formData.append("password", password);

		const response = await fetch(base_url + "login", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			// Assuming the response contains a JWT token named "token"
			const token = data.token;

			// Set the JWT token to Auth Bearer cookie
			// document.cookie = `Bearer=${token}; Secure; HttpOnly; SameSite=Strict`;
			setTokenCookie(token);
			console.log("token :", token);
			console.log("cookie :", document.cookie);

			// Set security flags (example)
			localStorage.setItem("isLoggedIn", true);

			return true;
		} else {
			// If response is not ok, handle error
			throw new Error("Login failed");
		}
	} catch (error) {
		console.error("Error logging in:", error);
		return false;
	}
}
export async function checkToken() {
	try {
		const response = await fetch(base_url + "users/checktoken", {
			method: "GET",
			headers: getAuthHeader(),
		});

		if (response.status === 200) {
			return true; // Token is valid
		} else if (response.status === 401) {
			return false; // Token is invalid
		} else {
			throw new Error(`Unexpected response status: ${response.status}`);
		}
	} catch (error) {
		console.error("Error checking token:", error);
		return false;
	}
}
function getAuthHeader() {
	return {
		Authorization: `Bearer ${getTokenFromCookie()}`, // Get token from cookie
	};
}
// Function to get token from cookie
function getTokenFromCookie() {
	const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
	for (const cookie of cookies) {
		const [name, value] = cookie.split("=");
		if (name.trim() === "Bearer") {
			return value;
		}
	}
	return null;
}
export function logOut() {
	// Set the Bearer cookie's expiration date to a date in the past
	setTokenCookie("");
}

export async function register(userData) {
	try {
		const formData = new FormData();
		formData.append("username", userData.username);
		formData.append("email", userData.email);
		formData.append("password", userData.password);
		formData.append("firstname", userData.firstName);
		formData.append("lastname", userData.lastName);
		formData.append("bio", userData.bio);
		formData.append("phonenumber", userData.phoneNumber);
		formData.append("image", userData.imageFile);

		const response = await fetch(base_url + "register", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			console.log("Registration successful");
			return true;
		} else {
			throw new Error("Registration failed");
		}
	} catch (error) {
		console.error("Error registering:", error);
		return false;
	}
}
export async function getUser() {
	try {
		const response = await fetch(base_url + "users/", {
			method: "GET",
			headers: getAuthHeader(),
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user data");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw error;
	}
}

export async function updateUser(){
	
}