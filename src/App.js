import React, { Component } from 'react';
import "./App.css"
import ChoosePlayer from "./ChoosePlayer"


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      board: Array(9).fill(null),
      player: null,
      winner: null
    }
  }

  checkWinner = () => {
    let winLines = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"],
    ]

    for (let i = 0; i < winLines.length; i++){
      const [a, b, c] = winLines[i]
      if(this.state.board[a] && this.state.board[a] === this.state.board[b] && this.state.board[a] === this.state.board[c]){
        this.setState({
          winner: this.state.player
        })
      }
    }
  }

  handleClick = (i) => {
    if (this.state.player && !this.state.winner){
      let newBoard = this.state.board
      if(this.state.board[i] === null && !this.state.winner){
        newBoard[i] = this.state.player
        let newPlayer = this.state.player === "X" ? "O" : "X"
        this.setState({
          board: newBoard,
          player: newPlayer
        })
        this.checkWinner()
      }
    }
  }

  setPlayer (player){
    this.setState({
      player: player
    })
  }
  reset = () => {
    this.setState({
      board: Array(9).fill(null),
      player: null,
      winner: null
    })
  }
  render() {
  const Box = this.state.board.map((box, i) => <div className="box" key={i} onClick={() => {this.handleClick(i)}}>{box}</div>)
    return (
      <div className="container">
        <h1 style={{color: "red"}}>Tic Tac Toe</h1>
        {this.state.winner ? 
          <>
            <h2>{this.state.winner} WINS!</h2> 
            <button style={{zoom: 2}} disabled={!this.state.winner} onClick={()=> this.reset()}>Reset</button>
            <br/>
          </>
          : 
          null
        }
        {this.state.player ? null: 
        <ChoosePlayer player={(e)=>this.setPlayer(e)}/>
        }
        <br/>
        <div className="board">
          {Box}
        </div>
      </div>
    );
  }
}

export default App;