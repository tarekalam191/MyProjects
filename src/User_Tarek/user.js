import React, { useState } from 'react';

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

function User() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setLoggedIn(true);
      localStorage.setItem('loggedIn', 'true');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  const handleAddToCart = () => {
    if (loggedIn) {
      console.log('Product added to cart');
    } else {
      setError('You must be logged in to add products to your cart');
    }
  };

  return (
    <div className="App">
      {loggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
      {error && <div className="error">{error}</div>}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default User;
