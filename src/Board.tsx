import styled from 'styled-components';
import { BOARD_SIZE } from './App'
interface IBoardProps {
    info: Array<Array<string>>;
    setData(x: number, y: number): any;
}
const Bg = styled.div`
    position: relative;

    & div:nth-child(1)>b>div {
        height: 11px;
        top   : 10px;
    }
    
    & div:nth-child(1)>b>div:before {
        top: 0px;
    }
    
    & div:nth-last-child(1)>b>div {
        height: 10px;
    }
`;
const Map = styled.div`
    height: 20px;
    width : 385px;
    margin: 0;

    & b:nth-child(1)>div:before {
        left: 0px;
    }
    
    & b:nth-last-child(1)>div:before {
        left : -9px;
        width: 10px;
    }
`;



export default function Board({ info, setData }: IBoardProps) {

    const getMap = () => {
        let line = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            let rows = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                rows.push(
                    <SquareCell x={i} y={j} key={i + "square" + j} type={info[i][j]} setData={setData} />
                );
            }
            line.push(<Map key={"line" + i} > {rows} </Map>);
        }
        return (<>{line}</>)
    }

    return (
        <Bg>
            {getMap()}
        </Bg >
    )
}

interface ISquareProps {
    x: number;
    y: number;
    type: string;
    setData(x: number, y: number): any;
}

const Cross = styled.div`
    background: #7C4609;
    height    : 20px;
    position  : relative;
    width     : 2px;
    left      : 9px;

    &:before{
    background: #7C4609;
    content   : "";
    height    : 2px;
    left      : -9px;
    position  : absolute;
    top       : 9px;
    width     : 20px;
}`;

const Square = styled.b`
    height    : 20px;
    width     : 20px;
    display   : block;
    float     : left;
    background: #DFA94B;
    position  : relative;

    &:hover{
        background: #f84802;
    }
    ${props => props.color !== 'N' && `
    &:after{
        background   : ${props.color === 'B' ? '#000' : '#fff'};
        content      : "";
        border-radius: 50%;
        height       : 16px;
        left         : 2px;
        top          : 2px;
        position     : absolute;
        width        : 16px;
    }
`}
`;

function SquareCell({ x, y, type, setData }: ISquareProps) {
    return (
        <Square color={type}
            key={x + "cross" + y}
            onPointerUp={() => { setData(x, y) }}>
            <Cross />
        </Square>
    )
}