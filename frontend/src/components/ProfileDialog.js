import React, { useState, useEffect } from 'react';
import * as api from '../ApisHandler';

const ProfileDialog = ({ onClose }) => {
    const [userData, setUserData] = useState(null);
    const [editedData, setEditedData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await api.getUser();
                setUserData(userData);
                setEditedData({ ...userData });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            await api.updateUser(editedData);
            setUserData(editedData);
            onClose();
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
            <div className="bg-gray-200 bg-opacity-75 absolute inset-0"></div>
            <div className="bg-white rounded-lg p-8 max-w-md w-full relative z-10">
                {userData && (
                    <>
                        <img src={userData.image} alt="Profile" className="mx-auto rounded-full h-16 w-16 mb-4" />
                        <input
                            type="text"
                            name="first_name"
                            value={editedData.first_name}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                            placeholder="First Name"
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={editedData.last_name}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                            placeholder="Last Name"
                        />
                        <textarea
                            name="bio"
                            value={editedData.bio}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                            placeholder="Bio"
                            rows="3"
                        ></textarea>
                        <input
                            type="text"
                            name="phone"
                            value={editedData.phone}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                            placeholder="Phone Number"
                        />
                        <button onClick={handleSaveChanges} className="bg-blue-500 text-white rounded-md py-2 px-4 mr-2 hover:bg-blue-600">Save Changes</button>
                        <button onClick={onClose} className="bg-gray-300 text-gray-800 rounded-md py-2 px-4 hover:bg-gray-400">Cancel</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileDialog;
