import React, { useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineGroupAdd } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { useOutletContext } from "../OutletContext";
import NewContactDialogue from "./AddContactDialogue";
import ProfileDialog from "./ProfileDialog";
import * as api from "../ApisHandler";

const ChooseBar = ({ menu, setMenu }) => {
	const [isDialogueOpen, setIsDialogueOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false); // State for profile dialog
	const { setIsLoggedIn } = useOutletContext();
	const handleButtonClick = (name) => {
		if (name === "new_contact") {
			setIsDialogueOpen(true);
		} else if (name === "profile") {
			setIsProfileOpen(true); // Open profile dialog when profile button is clicked
		} else if (name === "logout") {
			api.logOut();
			setIsLoggedIn(false);
		} else {
			setMenu(name);
		}
	};

	const handleCloseDialogue = () => {
		setIsDialogueOpen(false);
	};

	const handleCloseProfile = () => {
		setIsProfileOpen(false); // Close profile dialog
	};

	return (
		<div className="flex justify-between items-center bg-white p-2">
			<button
				className={`p-2 rounded-full hover:bg-gray-400 ${
					menu === "profile" ? "bg-yellow-300" : ""
				}`}
				onClick={() => handleButtonClick("profile")}
			>
				<CgProfile className="text-4xl" />
			</button>

			<button
				className={`p-2 rounded-full ${
					menu === "contacts" ? "bg-yellow-300" : ""
				}`}
				onClick={() => handleButtonClick("contacts")}
			>
				<RiContactsBookFill className="text-4xl" />
			</button>

			<button
				className={`p-2 rounded-full ${menu === "chats" ? "bg-blue-300" : ""}`}
				onClick={() => handleButtonClick("chats")}
			>
				<IoChatbubbleEllipsesSharp className="text-4xl" />
			</button>

			<button
				className={`p-2 rounded-full hover:bg-green-400 `}
				onClick={() => handleButtonClick("new_contact")}
			>
				<MdOutlineGroupAdd className="text-4xl" />
			</button>

			<button
				className={`p-2 rounded-full hover:bg-red-600 `}
				onClick={() => handleButtonClick("logout")}
			>
				<CiLogout className="text-4xl" />
			</button>

			{isDialogueOpen && (
				<NewContactDialogue
					onClose={handleCloseDialogue}
					onSubmit={(data) => {
						console.log("Submitting new contact data:", data);
						// You can perform API call here to submit new contact data
					}}
				/>
			)}

			{isProfileOpen && (
				<ProfileDialog
					onClose={handleCloseProfile}
					/* Add any props you need to pass to ProfileDialog */
				/>
			)}
		</div>
	);
};

export default ChooseBar;
