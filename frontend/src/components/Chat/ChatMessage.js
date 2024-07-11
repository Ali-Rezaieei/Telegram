import React from 'react';
import { FaUser } from 'react-icons/fa';

const ChatMessage = ({ message, isMyMessage, senderName, time }) => {
    const messageStyle = isMyMessage ? 'bg-green-500 bg-opacity-90 text-white rounded-tl-lg rounded-bl-lg rounded-br-lg ml-auto' : 'bg-blue-500 bg-opacity-90 text-white rounded-tr-lg rounded-bl-lg rounded-br-lg mr-auto';
    const profileIconStyle = isMyMessage ? 'ml-2' : 'mr-2';
    const messageMarginStyle = isMyMessage ? 'mr-4' : 'ml-4'; // Adjust margin accordingly
    const senderNameStyle = 'font-bold';

    return (
        <div className={`flex max-w-xs p-10 my-1 ${messageStyle} ${messageMarginStyle}`} style={{ padding: '5px' }}>
            {!isMyMessage && <FaUser className={`self-center ${profileIconStyle}`} />}
            <div className="flex-1">
                <div className={senderNameStyle}>{senderName}</div>
                <div>{message}</div>
                <div className={`text-xs text-right`}>{time}</div> {/* Align time to the right for my messages */}
            </div>
            {isMyMessage && <FaUser className={`self-center ${profileIconStyle}`} />}
        </div>
    );
};

export default ChatMessage;
