import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
// import { useSelectedItem } from "../SelectedItemContext";
import { useOutletContext } from "./../../OutletContext"

const ChatHistory = ({chatData}) => {
	// const [selectedItem, setSelectedItem] = useOutletContext();
	const { selectedItem, setSelectedItem } = useOutletContext();
	const bottomRef = useRef(null);
	useEffect(() => {
		// 👇️ scroll to bottom every time messages change
		bottomRef.current?.scrollIntoView({behavior: 'smooth'});
	  }, [chatData]);

	return (
		<div className="h-full overflow-auto">
			{chatData.map((chat, index) => (
				<ChatMessage
					key={index}
					id={index}
					message={chat.message}
					isMyMessage={chat.isMyMessage}
					senderName={chat.senderName}
					time={chat.time}
				/>
			))}
			<div ref={bottomRef} />
		</div>
	);
};

export default ChatHistory;
