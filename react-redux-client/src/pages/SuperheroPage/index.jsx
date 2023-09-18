import React, { useState } from "react";

import { Link } from 'react-router-dom';
import SuperheroForm from "../../components/Superhero/SuperheroForm/SuperheroForm";
import Superhero from "../../components/Superhero";
function SuperheroPage() {
  const [activeTab, setActiveTab] = useState('form'); 

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
    
      <div>
        <ul className="tabs">
          <li
            className={`tab ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => handleTabChange('form')}
          >
            Form
          </li>
          <li
            className={`tab ${activeTab === 'crud' ? 'active' : ''}`}
            onClick={() => handleTabChange('crud')}
          >
            CRUD
          </li>
        </ul>
        {activeTab === 'form' && <SuperheroForm />}
        {activeTab === 'crud' && <Superhero />}
      </div>
    </>
  );
}

export default SuperheroPage;
