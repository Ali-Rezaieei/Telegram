import React, { useEffect, useState } from "react";
import ChooseBar from "./ChooseBar";
import SearchBar from "./SearchBar";
import LeftList from "./LeftList";
import * as api from "../ApisHandler"

const LeftSide = () => {
	const [listItems, setListItems] = useState([]);
	const [menu, setMenu] = useState("chats");
	// const [contacts , setContacts ] = useState()

	useEffect(() => {
		// setListItems(items)
		if (menu === "chats") {
			const items = api.getUserChats()
			setListItems(items);
		} else if (menu === "contacts") {
			const contacts = api.getUserContacts()
			setListItems(contacts);
		}
	}, [menu]);

	return (
		<div className="w-full h-full flex flex-col">
			<div
				id="chatItemList"
				className="flex-1 bg-gray-300 overflow-y-auto"
				style={{ maxHeight: "calc(100vh - 100px)" }} // Set max height to screen height minus 100px (adjust as needed)
			>
				<LeftList listItems={listItems} />
			</div>
			<div className="h-1/10 bg-gray-300 ">
				<SearchBar setListItems={setListItems} />
			</div>

			<div className="h-1/10 ">
				<ChooseBar menu={menu} setMenu={setMenu} />
			</div>
		</div>
	);
};

export default LeftSide;
