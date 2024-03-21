import React from 'react';
import { Link } from 'react-router-dom';
const CreditsPage = () => {
  
  const githubRepoUrl = "https://github.khoury.northeastern.edu/xiewen2/cs-5610";

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Credits</h1>
      <p>Author: Wen Xie</p>
      <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer">View My GitHub Repo</a>
      <p><Link to="/"style={{ textDecoration: 'none', color: 'white', background: 'blue', padding: '10px 15px', borderRadius: '5px' }}>Go back to homepage</Link></p>
    </div>
    
  );
};

export default CreditsPage;