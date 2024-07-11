import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const SendMessageButton = (to_user, setUserMessages) => {

	const input = document.getElementById("MessageBar")
	const message = input.value;
	
	setUserMessages((arr) => {
		const new_message = {
			id: 1234,message: message + ' ' + to_user.name ,isMyMessage: true,
			senderName: "You",time: "10:00 AM",}

		return [...arr , new_message ]
	})
	input.value = "" ;
	console.log(message, to_user);
};

const SendMessage = ({ current_user, setUserMessages }) => {
	return (
		<div className="h-16 bg-gray-300 flex items-center justify-between px-4">
			<input
				id="MessageBar"
				type="text"
				onKeyUp={(e) => {
					if (e.keyCode === 13)
					{
						SendMessageButton(current_user, setUserMessages);
					}
					
				}}
				autoComplete="off"
				placeholder="Type a message..."
				className="border border-gray-400 rounded-md py-2 px-4 flex-grow focus:outline-none"
			/>
			<button
				onClick={() => {
					SendMessageButton(current_user, setUserMessages);
				}}
				className="bg-blue-500 hover:bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
			>
				<FaPaperPlane className="ml-2" />
			</button>
		</div>
	);
};

export default SendMessage;
