import React, { useState } from 'react';
import LeftSide from './LeftSide';
import ChatPage from './Chat/ChatPage';


const MainPage = () => {
    
    return (
        <div className="flex h-screen">
            <div className="w-1/5 h-full border rounded border-gray-400">
                <LeftSide />
            </div>
            <div className="w-4/5 h-full border rounded border-gray-400">
                <ChatPage />
            </div>
        </div>
    );
}

export default MainPage;
