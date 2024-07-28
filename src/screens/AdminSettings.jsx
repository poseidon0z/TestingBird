import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {
  const initialSettings = {
    gap: 150,
    birdLeft: document.documentElement.clientWidth * 0.05,
    gravity: 1,
    obstacleCount: 4,
    totemGap: 750,
    jumpVelocity: -10,
  };
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [settings, setSettings] = useState(initialSettings);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedSettings = {
      gap: localStorage.getItem('gap'),
      birdLeft: localStorage.getItem('birdLeft'),
      gravity: localStorage.getItem('gravity'),
      obstacleCount: localStorage.getItem('obstacleCount'),
      totemGap: localStorage.getItem('totemGap'),
      jumpVelocity: localStorage.getItem('jumpVelocity'),
    };

    for (const key in storedSettings) {
      if (storedSettings[key]) {
        setSettings((prevSettings) => ({
          ...prevSettings,
          [key]: parseFloat(storedSettings[key]),
        }));
      } else {
        localStorage.setItem(key, initialSettings[key]);
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]: value,
    }));
  };

  const handleSettingsSave = (e) => {
    e.preventDefault();
    for (const key in settings) {
      localStorage.setItem(key, settings[key]);
    }
    alert('Settings saved!');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      {!isLoggedIn ? (
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
            Admin Login
          </h2>
          <form onSubmit={handleLogin}>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
            Settings
          </h2>
          <form onSubmit={handleSettingsSave}>
            {Object.keys(initialSettings).map((key) => (
              <div key={key} className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700"
                  htmlFor={key}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                  type={
                    typeof initialSettings[key] === 'number' ? 'number' : 'text'
                  }
                  id={key}
                  value={settings[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
