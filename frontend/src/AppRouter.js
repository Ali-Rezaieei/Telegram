import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage"; // Your main page component
import LoginPage from "./components/LoginPage"; // Your login page component
import SignUpPage from "./components/Signup"; // Your login page component
import { useOutletContext } from "./OutletContext";
import * as api from "./ApisHandler"

const AppRouter = () => {
	const { isLoggedIn, setIsLoggedIn } = useOutletContext();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkTokenValidity = async () => {
			console.log("!! TOKEN CHECK !!");
			try {
				// Perform API call to check token validity
				const response = await api.checkToken();

				if (response) {
					setIsLoggedIn(true);
				}
			} catch (error) {
				console.error("Error checking token validity:", error);
			} finally {
				setLoading(false);
			}
		};

		checkTokenValidity();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Routes>
			<Route
				path="/login"
				element={isLoggedIn ? <MainPage /> : <LoginPage />}
			/>
			<Route
				path="/signup"
				element={isLoggedIn ? <MainPage /> : <SignUpPage />}
			/>
			<Route path="/" element={isLoggedIn ? <MainPage /> : <LoginPage />} />
		</Routes>
	);
};

export default AppRouter;
