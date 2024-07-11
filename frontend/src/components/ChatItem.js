import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useOutletContext } from "../OutletContext";
import renderProfilePhoto from "./renderProfile";

const ChatItem = ({ id, photoUrl, name, latestMessage }) => {
	const { selectedItem, setSelectedItem } = useOutletContext();
	const [contextMenuVisible, setContextMenuVisible] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({
		x: 0,
		y: 0,
	});

	const handleClick = () => {
		setSelectedItem({ id, photoUrl, name, latestMessage });
	};

	const handleContextMenu = (e) => {
		e.preventDefault(); // Prevent the default right-click context menu
		setContextMenuPosition({ x: e.clientX, y: e.clientY });
		setContextMenuVisible(true);
	};

	const handleDelete = () => {
		// Add logic to handle delete action
		console.log("Deleting item with id:", id);
	};
	useEffect(() => {
		setContextMenuVisible(false);
	}, [selectedItem]);
	return (
		<div
			className={`flex items-center p-2 cursor-pointer ${
				selectedItem && selectedItem.id === id ? "bg-blue-300" : ""
			}`}
			onClick={handleClick}
			onContextMenu={handleContextMenu} // Attach right-click event handler
		>
			{renderProfilePhoto(name, photoUrl)}
			<div className="ml-3">
				<div className="font-bold">{name}</div>
				<div>{latestMessage.slice(0, 20)}</div>
			</div>

			{/* Render context menu if it's visible */}
			{contextMenuVisible && selectedItem.id === id && (
				<div
					className="absolute bg-white border border-gray-200 rounded p-2"
					style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
				>
					<button
						className="flex items-center text-red-500 hover:bg-red-200 p-1 rounded"
						onClick={handleDelete}
					>
						<RiDeleteBin6Line className="mr-1" />
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

export default ChatItem;
