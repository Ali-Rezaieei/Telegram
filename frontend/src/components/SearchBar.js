import React from "react";

const SearchBar = ({setListItems}) => {
    
    return (
        <div className="bg-gray-300 rounded-md p-2 flex items-center">
            <input
                type="text"
                className="border border-gray-300 p-1 rounded-md w-full focus:outline-none"
                placeholder="Search..."
                onChange={() => {
                    const randomInt = Math.floor(Math.random() * 10);
                    setListItems(items => {
                        return [...items , 
                            { photoUrl: 'profile.jpg', name: '#' + randomInt, latestMessage: '' }
                        ]
                    } )
                }}
            />
            
        </div>
    );
};

export default SearchBar;
