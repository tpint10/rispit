import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./HomePage.css";

const InputForm = ({ username, onInputChange, onSearch }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={username}
        onChange={onInputChange}
        placeholder="Enter GitHub username"
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

InputForm.propTypes = {
  username: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

const UserProfile = ({ userData }) => {
  return (
    <div className="user-container">
      <div className="avatar-container">
        <img className="avatar" src={userData.avatar_url} alt="User Avatar" />
        <h2 className="username">{userData.name}</h2>
      </div>
      <div className="user-container">
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

UserProfile.propTypes = {
  userData: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};

const RepositoryTable = ({ repositories, onReset }) => {
  return (
    <div className="repositories">
      <h2 className="repositories-title">Repositories</h2>
      <table className="repo-table">
        <tbody>
          {repositories.map((repo) => (
            <tr className="repo-row" key={repo.id}>
              <td>{repo.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="reset-button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

RepositoryTable.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onReset: PropTypes.func.isRequired,
};

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setRepositories(reposResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setUsername("");
    setUserData(null);
    setRepositories([]);
  };

  return (
    <div className="container">
      <h1 className="title">GitHub User Search</h1>
      <InputForm
        username={username}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
      />
      {userData && <UserProfile userData={userData} />}
      {repositories.length > 0 && (
        <RepositoryTable repositories={repositories} onReset={handleReset} />
      )}
    </div>
  );
};

export default HomePage;
