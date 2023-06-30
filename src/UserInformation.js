import React from "react";

const UserInformation = ({ userData }) => {
  return (
    <div className="user-container">
      <div className="avatar-container">
        <img className="avatar" src={userData.avatar_url} alt="User Avatar" />
        <h2 className="username">{userData.name}</h2>
      </div>
      <div>
        {userData.bio && (
          <p>
            <strong>BIO:</strong> {userData.bio}
          </p>
        )}
        {userData.location && (
          <p>
            <strong>LOCATION:</strong> {userData.location}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserInformation;
