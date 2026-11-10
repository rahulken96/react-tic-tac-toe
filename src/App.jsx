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

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = checkWinner(squares);
  let status = winner
    ? <b>🎉🎉 Pemenang: {winner}</b>
    : `Giliran main: ${isXNext ? 'X' : 'O'}`

  function handleClick(i) {
    if (squares[i] !== null || checkWinner(squares)) return;

    const nextSquares = squares.slice(); // Menyalin array agar state squares tidak diubah langsung.
    nextSquares[i] = isXNext ? 'X' : 'O'; // Mengisi kotak pada indeks i dengan 'X' di array salinan.
    setSquares(nextSquares); // Meminta React memperbarui state dan merender ulang tampilan.
    setIsXNext(!isXNext);

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
  return (
    <>
      <div className='game'>
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <ol>
            <li>Lorem, ipsum.</li>
            <li>Lorem, ipsum.</li>
            <li>Lorem, ipsum.</li>
          </ol>
        </div>
      </div>
    </>
  )
}

export default App;
