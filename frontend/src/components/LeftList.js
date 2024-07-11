import React from 'react';
import ChatItem from './ChatItem';

const LeftList = ({listItems}) => {
    // Dummy data
    

    return (
        <>
            {listItems.length === 0 ? (
                <p className="flex justify-center items-center h-full bold">No Chat</p>
            ) : (
                listItems.map((chat, index) => (
                    <ChatItem id={index}  key={index} photoUrl={chat.photoUrl} name={chat.name} latestMessage={chat.latestMessage} />
                ))
            )}
        </>
    );
};

export default LeftList;
