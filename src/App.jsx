/*

Functions of this password manager:

  1. Defines an array of COLORS that will be used to randomly assign a color to each website entry.

  2. Sets up state variables using the useState hook. There are six variables:
      a) isItTrue			: Keeps track of whether there are any website entries in the updatedList state.
      b) updatedList	: Stores all the passwords
      c) webdomain		: Stores the user's input value in the website domain input box
      d) username			: Stores the user's input value in the username input box
      e) password			: Stores the user's input value in the password input box
      f) isVisible		: True/False values to toggle the visibility of the password characters
      g) dataToSearch	: Gets the search keyword in the searchbox that will be used to search

  3. Defines several functions that handle various aspects of the component's functionality.
    a) handleWebsiteChange	: This is used to constantly change search results as the user types in
    b) handleUsernameChange	: The characters the user types are sent to the username box
    c) handlePasswordChange : The characters the user types are sent to the password box
    d) handleAddContent			: Takes all the input values and adds them to updatedList
    e) handleShowPassword		: Toggles the True/False value in isVisible
    f) handleSearchList			: Prints out the search results as the user types in the search box
    g) handleDeleteItem			: Deletes a password from updatedList

*/

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

// Used to randomly assign a color to each website entry
const COLORS = [
  'yellow',
  'green',
  'orange',
  'brown',
  'blue'
];

function App() {
  const [isItTrue, setIsItTrue] = useState(false);	// Checks if there are any passwords in the list
  const [updatedList, setUpdatedList] = useState([]);			// Stores all the passwords
  const [webdomain, setWebdomain] = useState('');			// As the user types, the value is stored in the webdomain box
  const [username, setUsername] = useState('');			// As the user types, the value is stored in the username box
  const [password, setPassword] = useState('');			// As the user types, the value is stored in the password box
  const [isVisible, setIsVisible] = useState(false);	// True/False values to toggle the visibility of passwords
  const [dataToSearch, setDataToSearch] = useState('');			// Gets the keyword to search from the searchbox

  // As the user types, the value is stored in the webdomain box
  const handleWebsiteChange = (e) => {
    setWebdomain(e.target.value);
  };

  // As the user types, the value is stored in the username box
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // As the user types, the value is stored in the password box
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  // Takes all the input values and adds them to updatedList (Stores the passwords)
  const handleAddContent = (e) => {
    e.preventDefault();
    const initial = webdomain.slice(0, 1).toUpperCase();
    const classValue = COLORS[Math.floor(Math.random() * 5)];
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      webdomainName: webdomain,
      userName: username,
      password: password,
      classAdd: classValue,
    };
    setUpdatedList((prevList) => [...prevList, newValues]);
    setWebdomain('');
    setUsername('');
    setPassword('');
    setIsItTrue(true);
    setDataToSearch('');
    
  };

  useEffect(() => {
    const data = localStorage.getItem('passwords');
    if (data) {
      setUpdatedList(JSON.parse(data));
    }
    console.log(updatedList)
  }, []);

  useEffect(() => {
    console.log(updatedList);
    if (updatedList.length > 0) {
      localStorage.setItem('passwords', JSON.stringify(updatedList));
      setWebdomain('');
      setUsername('');
      setPassword('');
      setIsItTrue(true);
      setDataToSearch('');
    }
  }, [updatedList]);

  // Toggles the visibility of the passwords
  const handleShowPassword = (e) => {
    setIsVisible(e.target.checked);
  };

  // Prints out the search results as the user types in the search box
  const handleSearchList = (e) => {
    setDataToSearch(e.target.value);
  };

  // Deletes a password from updatedList
  const handleDeleteItem = (id) => {
    const newList = updatedList.filter((eachValue) => eachValue.id !== id);
    const isItTrue = newList.length !== 0;
    setUpdatedList(newList);
    setIsItTrue(isItTrue);
  };

  // Filters the list of passwords based on the search keyword
  const newList = updatedList.filter((eachValue) =>
    eachValue.webdomainName.toLowerCase().includes(dataToSearch.toLowerCase())
  );

  // The actual HTML that will be displayed on the browser
  return (
    <div className="main-container">
      <div className="appTitle">
        <h1>Secure Password Manager</h1>
      </div>
      <div className="sub-div1">
        <img
          src="/static/password-manager-sm-img.png"
          className="sub-div1-image2"
          alt="password manager"
        />
        <form className="add-details" onSubmit={handleAddContent}>
          <h1 className="detail-heading">Add New Password</h1>
          <div className="input-holder">
            <img
              src="/static/password-manager-website-img.png"
              className="input-image"
              alt="website"
            />
            <input
              type="text"
              className="input-element"
              placeholder="Enter Website"
              onChange={handleWebsiteChange}
              value={webdomain}
            />
          </div>

          <div className="input-holder">
            <img
              src="/static/password-manager-username-img.png"
              className="input-image"
              alt="username"
            />
            <input
              type="text"
              className="input-element"
              placeholder="Enter Username"
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <div className="input-holder">
            <img
              src="/static/password-manager-password-img.png"
              className="input-image"
              alt="password"
            />
            <input
              type="password"
              className="input-element"
              placeholder="Enter Password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
        <img
          src="/static/password-manager-lg-img.png"
          className="sub-div1-image1"
          alt="password manager"
        />
      </div>
      <div className="sub-div2">
        <div className="first-div">
          <div className="your-password">
            <h1 className="heading-name">Your Passwords</h1>
            <p className="colored-text">{newList.length}</p>
          </div>
          <div className="search-holder">
            <img
              src="/static/password-manager-search-img.png"
              className="input-image"
              alt="search"
            />
            <input
              type="search"
              className="input-element"
              placeholder="Search"
              onChange={handleSearchList}
              value={dataToSearch}
            />
          </div>
        </div>
        <hr />
        <div className="show-passwords">
          <input
            type="checkbox"
            className="check-box"
            id="check"
            onChange={handleShowPassword}
          />
          <label htmlFor="check" className="label-password">
            Show Passwords
          </label>
        </div>
        {!isItTrue && (
          <div className="empty-state">
            <img
              src="/static/no-passwords-img.png"
              className="empty-image"
              alt="no passwords"
            />
            <p className="no-passwords">No Passwords</p>
          </div>
        )}
        {isItTrue && (
          <ul className="result-container">
            {newList.map(eachValue => (
              <li className="item-list" id={eachValue.id} key={eachValue.id}>
                <p className={`initial ${eachValue.classAdd}`}>
                  {eachValue.initialValue}
                </p>
                <div className="list-content">
                  <p className="website">{eachValue.webdomainName}</p>
                  <p className="website">{eachValue.userName}</p>
                  {!isVisible && (
                    <img
                      src="/static/password-manager-stars-img.png"
                      className="stars-image"
                      alt="stars"
                    />
                  )}
                  {isVisible && <p className="website">{eachValue.password}</p>}
                </div>
                <button
                  type="button"
                  className="del-btn"
                  onClick={() => handleDeleteItem(eachValue.id)}
                  testid="delete"
                >
                  <img
                    src="/static/password-manager-delete-img.png"
                    className="del-image"
                    alt="delete"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
