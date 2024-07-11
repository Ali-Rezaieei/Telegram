const renderProfilePhoto = (name , photoUrl) => {
    if (photoUrl) {
        return <img src={photoUrl} alt="Profile" className="w-10 h-10 rounded-full" />;
    } else {
        return <div className="w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center">{name.charAt(0)}</div>;
    }
};

export default renderProfilePhoto;