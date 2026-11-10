/* eslint-disable no-unused-vars */
import { useState } from 'react'
// import Header from "./components/Header";

function Square({ value, onSquareClick }) {
  return (
    <>
      <button className='square' onClick={onSquareClick}>{value}</button>
    </>
  )
}

function Board({ isXNext, squares, onPlay }) {
  const winner = checkWinner(squares);
  let status = winner
    ? <b>🎉🎉 Pemenang: {winner}</b>
    : `Giliran main: ${isXNext ? 'X' : 'O'}`

  function handleClick(i) {
    if (squares[i] !== null || checkWinner(squares)) return;

    const nextSquares = squares.slice(); // Menyalin array agar state squares tidak diubah langsung.
    nextSquares[i] = isXNext ? 'X' : 'O'; // Mengisi kotak pada indeks i dengan 'X' di array salinan.

    /* Dikomentar karena sudah ditangani oleh App dan diganti jadi function onPlay */
    // setSquares(nextSquares); // Meminta React memperbarui state dan merender ulang tampilan.
    // setIsXNext(!isXNext);
    onPlay(nextSquares)

    // console.log(squares);
    // console.log(nextSquares);
    // console.log('===========================');
  }

  function checkWinner(squares) {
    const rules = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < rules.length; i++) {
      // const a = rules[i][0];
      // const b = rules[i][1];
      // const c = rules[i][2];

      /* Array Destructuring */
      const [a, b, c] = rules[i];

      if (
        squares[a]
        && (squares[a] === squares[b])
        && (squares[a] === squares[c])
      ) {
        return squares[a]
      }
    }

    return false;
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
        {squares.map((val, idx) => (
          <Square
            key={idx}
            value={val}
            onSquareClick={() => handleClick(idx)}
          />
        ))}
      </div>
    </>
  )
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const isXNext = currentMove % 2 === 0; // Langkah genap (0, 2, 4...) giliran X.

  const checkPlayer = (move) => {
    return (move % 2 !== 0) ? 'X' : 'O';
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleJumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  /* squares => val, move => idx */
  const moves = history.map((squares, move) => {
    const player = checkPlayer(move);
    let desc = (move > 0)
      ? `Loncat langkah #${move} (oleh ${player})`
      : "Mulai Game Terlebih Dahulu!"

    return (
      <li key={move}>
        {/* <button >{desc}</button> */}
        <button onClick={() => handleJumpTo(move)}>{desc}</button>
      </li>
    )
  })

  return (
    <>
      <div className='game'>
        <div className="game-board">
          <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}

export default App;
