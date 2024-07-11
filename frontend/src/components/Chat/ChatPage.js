import React, { useEffect, useRef, useState } from "react";
import ProfileBar from "./ProfileBar";
import ChatsHistory from "./ChatsHistory";
import SendMessage from "./SendMessage";
import { useOutletContext } from "./../../OutletContext";

const get_data = (selectedItem) => {
	if (selectedItem !== null) {
		return [
			{
				id: selectedItem.id,
				message: "Hello! " + selectedItem.name,
				isMyMessage: false,
				senderName: selectedItem.name,
				time: "10:00 AM",
			},
			{
				id: selectedItem.id,
				message: "Hi there!",
				isMyMessage: true,
				senderName: "You",
				time: "10:05 AM",
			},
			{
				id: selectedItem.id,
				message: "Hi there!",
				isMyMessage: true,
				senderName: "You",
				time: "10:05 AM",
			},
			{
				id: selectedItem.id,
				message: "Hi there!",
				isMyMessage: true,
				senderName: "You",
				time: "10:05 AM",
			},
			{
				id: selectedItem.id,
				message: "Hi there!",
				isMyMessage: true,
				senderName: "You",
				time: "10:05 AM",
			},
			{
				id: selectedItem.id,
				message: "How are you?",
				isMyMessage: false,
				senderName: selectedItem.name,
				time: "10:10 AM",
			},
			{
				id: selectedItem.id,
				message: "I'm good, thanks!",
				isMyMessage: true,
				senderName: "You",
				time: "10:15 AM",
			},
		];
	} else {
		return [];
	}
};

const ChatPage = () => {
	// const [selectedItem, setSelectedItem] = useOutletContext();
	const { selectedItem, setSelectedItem } = useOutletContext();
	const [userMessages, setUserMessages] = useState([]);
	let chatData = [];
	useEffect(() => {
		setUserMessages(get_data(selectedItem));
	}, [selectedItem]);

	return (
		<div className="h-full flex flex-col">
			<ProfileBar />
			<ChatsHistory chatData={userMessages} />
			<SendMessage setUserMessages = {setUserMessages} current_user = {selectedItem} />
		</div>
	);
};

export default ChatPage;
