import React from "react";
import renderProfilePhoto from "../renderProfile";
import { useOutletContext } from "./../../OutletContext"
const ProfileBar = () => {
	// const { selectedItem } = useSelectedItem();
	// const { selectedItem, setSelectedItem } = useOutletContext();
	const { selectedItem } = useOutletContext();
	return (
		<div className="h-16 bg-gray-300 flex items-center pl-4">
			{selectedItem!==null && (
				<>
					{" "}
					<div className="mr-4">{renderProfilePhoto(selectedItem.name , selectedItem.photoUrl)}</div>
					<div className="font-bold text-xl">
						{" "}
						{/* Increased font size */}
						{selectedItem.name}
					</div>{" "}
				</>
			)}
		</div>
	);
};

export default ProfileBar;
