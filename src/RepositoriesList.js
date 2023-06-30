import React from "react";

const RepositoriesList = ({ repositories, handleReset }) => {
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
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default RepositoriesList;
