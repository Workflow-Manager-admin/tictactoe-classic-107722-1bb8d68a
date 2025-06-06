import React, { useState } from 'react';
import './App.css';

/*
  Color palette used:
  --ttt-primary: #9be4ee;
  --ttt-secondary: #222222;
  --ttt-accent: #ee6868;
  Light theme background, dark text for grid/buttons, game centered.
*/

function TicTacToe() {
  // PUBLIC_INTERFACE
  // State: board (flat array), current turn, status, etc.
  const emptyBoard = () => Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('Playing');
  const [winner, setWinner] = useState(null);

  // PUBLIC_INTERFACE
  // Calculates winner or draw and sets game state
  function calculateWinner(bd) {
    // Returns 'X', 'O', or null
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6],          // diagonals
    ];
    for (let line of lines) {
      const [a,b,c] = line;
      if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) {
        return bd[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function isDraw(bd) {
    return bd.every(cell => cell) && !calculateWinner(bd);
  }

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (winner || board[idx]) return;
    const boardCopy = [...board];
    boardCopy[idx] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);

    const win = calculateWinner(boardCopy);
    if (win) {
      setWinner(win);
      setStatus('won');
    } else if (isDraw(boardCopy)) {
      setWinner(null);
      setStatus('draw');
    } else {
      setXIsNext(prev => !prev);
    }
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setBoard(emptyBoard());
    setXIsNext(true);
    setStatus('Playing');
    setWinner(null);
  }

  // Composing status message
  let displayStatus;
  if (status === 'won') {
    displayStatus = (
      <span>
        <span style={{ color: 'var(--ttt-accent)' }}>{winner}</span> wins!
      </span>
    );
  } else if (status === 'draw') {
    displayStatus = <span style={{ color: 'var(--ttt-accent)' }}>Draw!</span>;
  } else {
    displayStatus = (
      <span>
        Turn: <span style={{
          color: xIsNext ? 'var(--ttt-primary)' : 'var(--ttt-secondary)', 
          fontWeight: 700,
        }}>
          {xIsNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  // PUBLIC_INTERFACE
  function renderCell(idx) {
    return (
      <button
        className="ttt-cell"
        onClick={() => handleCellClick(idx)}
        disabled={!!board[idx] || winner || status === 'draw'}
        aria-label={`TicTacToe cell ${idx} ${board[idx] ? board[idx] : ''}`}
        key={idx}
      >
        {board[idx]}
      </button>
    );
  }

  return (
    <div className="ttt-container">
      <h2 className="ttt-title">Tic Tac Toe Classic</h2>
      <div className="ttt-turn">{status === 'Playing' ? displayStatus : null}</div>
      <div className="ttt-board">
        {[0,1,2].map(row =>
          <div className="ttt-board-row" key={row}>
            {[0,1,2].map(col => renderCell(row*3+col))}
          </div>
        )}
      </div>
      <div className="ttt-status">
        {status !== 'Playing' ? displayStatus : null}
      </div>
      <button className="ttt-restart-btn" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="app" style={{ minHeight: "100vh", background: "#fff" }}>
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol" style={{ color: '#9be4ee' }}>*</span> KAVIA AI
            </div>
            <button className="btn" style={{ background: '#9be4ee' }}>Template Button</button>
          </div>
        </div>
      </nav>
      {/* Centered game content */}
      <main>
        <div className="container">
          <div style={{
            display: "flex",
            minHeight: "calc(100vh - 64px)",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <TicTacToe />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;