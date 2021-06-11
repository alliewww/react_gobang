import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import { check } from './Logic';

const AppWrapper = styled.div`
  padding-inline-start: 45px;
`;
export const BOARD_SIZE = 19
export default function App() {

  const [info, setInfo] = useState<Array<Array<string>>>((new Array(BOARD_SIZE)).fill([]).map(function () { return new Array(BOARD_SIZE).fill("N"); }));
  const [isBlack, setIsBlack] = useState<boolean>(true);
  const [xy, setXy] = useState<Array<number>>([NaN, NaN]);
  const [winner, setWinner] = useState<string>("");

  useEffect(() => {
    const winner = check(info, xy)
    if (!winner) return;
    setWinner(winner)
  }, [info])

  const setData = useCallback((x: number, y: number) => {
    if (info[x][y] !== "N") return;
    if (winner) return;
    setInfo(
      info.map((row, rowIndex) => {
        if (rowIndex !== x) return row
        return row.map((col, colIndex) => {
          if (colIndex !== y) return col
          return isBlack ? 'B' : 'W'
        })
      })
    )
    setIsBlack(!isBlack);
    setXy([x, y]);
  }, [info, isBlack, winner])

  const reset = () => {
    setInfo((new Array(19)).fill([]).map(function () { return new Array(19).fill("N"); }))
    setIsBlack(true);
    setXy([NaN, NaN]);
    setWinner("");
  }

  return (
    <AppWrapper >
      <Board info={info} setData={setData} />
      <h3>{isBlack ? "現在輪到黑子" : "現在輪到白子"}</h3>
      {winner && <div>{winner} 贏惹</div>}
      <button onClick={reset}>重新遊戲</button>
    </AppWrapper>
  )

}

