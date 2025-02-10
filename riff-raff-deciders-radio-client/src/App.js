import React from 'react';
import './styles/App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>Welcome to Riff Raff Deciders Radio</h1>
        <p>Your streaming radio station application.</p>
      </main>
    </div>
  );
}

export default App;