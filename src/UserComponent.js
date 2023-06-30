import React, { useEffect, useState } from "react";
import axios from "axios";

const UserComponent = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching user repositories:", error);
      }
    };

    fetchUserData();
    fetchUserRepos();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { avatar_url, name, location, bio } = userData;

  return (
    <div>
      <img src={avatar_url} alt="User Avatar" />
      <h1>{name}</h1>
      <p>Location: {location}</p>
      <p>Bio: {bio}</p>

      <h2>Repositories:</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;
