import React, { Component } from "react";
import tanks from "./cards.json";
import Scoreboard from "./components/Scoreboard";
import Card from "./components/Card";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class App extends Component {
  state = {
    tanks,
    score: 0,
    topScore: 0,
    showAlert: 0,
    showSuccess: 0,
    clickedtanks: []
  };

  clickedTank = id => {
    let clickedtanks = this.state.clickedtanks;
    let score = this.state.score;
    let topScore = this.state.topScore;
    this.setState({
      showAlert: 0
    });

    if (clickedtanks.indexOf(id) === -1) {
      clickedtanks.push(id);
      console.log(clickedtanks);
      this.handleIncrement();
      this.makeShuffle();
    } else if (this.state.score === 12) {
      this.setState({
        showSuccess: 1,
        score: 0,
        clickedtanks: []
      });
    } else {
      this.setState({
        score: 0,
        clickedtanks: []
      });
      console.log("duplicate");
      this.setState({
        showAlert: 1
      });
    }

    if (score > topScore) {
      this.setState({
        topScore: score
      });
    }
  };

  handleIncrement = () => {
    this.setState({ score: this.state.score + 1 });
  };

  makeShuffle = () => {
    this.setState({ tanks: shuffle(tanks) });
  };

  render() {
    return (
      <div className="container">
        <div
          className="alert alert-danger"
          style={{ opacity: this.state.showAlert }}
        >
          You targeted the same one, GAME OVER! start again!
          </div>
        <div
          className="alert alert-success"
          style={{ opacity: this.state.showSuccess }}
        >
          Good job, keep it up!
          </div>
        <Scoreboard
          title="Just Another Clicky Game"
          score={this.state.score}
          topScore={this.state.topScore}
        />
        <div className="row">
          {this.state.tanks.map(tank => (
            <Card
              key={tank.id}
              id={tank.id}
              image={tank.image}
              clickedTank={this.clickedTank}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;