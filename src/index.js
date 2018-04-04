import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <div className="square" onClick={() => this.props.onClick()}>
                <span>{this.props.value}</span>
            </div>
        )
    }
}

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null),
            xTurn: true,
            over: false,
            status: 'Next Player: X'
        }
    }

    handleClick(i) {
        if (this.state.over) {
            return;
        }
        const squares = this.state.squares.slice();
        if (squares[i]) {
            return;
        }
        squares[i] = this.state.xTurn ? 'X' : 'O';

        const winner = calculateWinner(squares);
        if (winner) {
            this.setState(
                {
                    status: 'Winner: ' + winner,
                    squares: squares,
                    over: true
                });
        } else {
            this.setState(
                {
                    status: 'Next Player: ' + (this.state.xTurn ? 'X' : 'O'),
                    squares: squares,
                    xTurn: !this.state.xTurn
                });
        }
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={()=> this.handleClick(i)}
            />);
    }

    render() {
        return (
            <div>
                <div className="status">{this.state.status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">

                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}