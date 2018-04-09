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
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={()=> this.props.onClick(i)}
            />);
    }

    render() {
        return (
            <div>
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
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            over: false
        };
    }

    handleClick(i) {
        if (this.state.over) {
            return;
        }

        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        let over = false;
        if (calculateWinner(squares)) {
            over = true;
        }

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            over: over
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        let status;

        if (this.state.over) {
            status = 'Winner: ' + (this.state.xIsNext ? 'O' : 'X');
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-info">
                    <div>{status}</div>
                </div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />

                </div>
            </div>
        );
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