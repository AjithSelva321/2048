import React, { Component } from "react";
import "./style.css";
import Block from "./BlockComponent";
import KeyboardEventHandler from "react-keyboard-event-handler";

class Game extends Component {
  constructor(props) {
    super(props);

    //Initializing State variables
    this.state = {
      gameNumbers: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      hours: 0,
      min: 0,
      sec: 0,
      hzero: "0",
      mzero: "0",
      szero: "0",
      intervalId: 0,
      score: 0,
      isTimerRunning: false,
    };
  }

  //Resets the timer
  resetTimer = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      hours: 0,
      min: 0,
      sec: 0,
      hzero: "0",
      mzero: "0",
      szero: "0",
    });
    this.state.isTimerRunning = false;
  };

  //Starts the timer
  startTimer = () => {
    this.state.intervalId = setInterval(() => {
      this.setState({
        sec: this.state.sec + 1,
      });
      if (this.state.sec <= 9) {
        this.setState({
          szero: "0",
        });
      } else {
        this.setState({
          szero: "",
        });
      }
      if (this.state.sec == 60) {
        this.setState({
          min: this.state.min + 1,
          sec: 0,
          szero: "0",
        });
        if (this.state.min <= 9) {
          this.setState({
            mzero: "0",
          });
        } else {
          this.setState({
            mzero: "",
          });
        }
        if (this.state.min == 60) {
          this.setState({
            hours: this.state.hours + 1,
            min: 0,
            mzero: "0",
          });
          if (this.state.hours <= 9) {
            this.setState({
              hzero: "0",
            });
          } else {
            this.setState({
              hzero: "",
            });
          }
        }
      }
    }, 1000);
  };

  //Calculates the score based on the game numbers
  calculateScore = () => {
    this.state.score = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.state.score = this.state.score + this.state.gameNumbers[i][j];
      }
    }
    this.setState({});
  };

  //Generates a random number between passed numbers
  randomNumberGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //Generates 2 or 4 on a free space available on the array of gameNumbers
  randomPlaceValueGenerator = () => {
    const { gameNumbers } = this.state;
    stopLoop: for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (gameNumbers[i][j] == 0) {
          let randNumberA;
          let randNumberB;
          let randValue;
          while (1) {
            randNumberA = this.randomNumberGenerator(i, 3);
            randNumberB = this.randomNumberGenerator(0, 3);
            if (gameNumbers[randNumberA][randNumberB] == 0) {
              randValue = this.randomNumberGenerator(1, 10);
              if (randValue <= 8) {
                randValue = 2;
              } else {
                randValue = 4;
              }
              gameNumbers[randNumberA][randNumberB] = randValue;
              break stopLoop;
            }
          }
        }
      }
    }
  };

  //Function which runs on the loading of the application
  componentDidMount() {
    this.newGame();
    this.setState({});
  }

  //Creates a new game
  newGame = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.state.gameNumbers[i][j] = 0;
      }
    }
    this.randomPlaceValueGenerator();
    this.randomPlaceValueGenerator();
    this.state.score = 0;
    this.setState({});
    this.resetTimer();
  };

  //Checks whether 2048 is achieved
  is2048Achieved = () => {
    let isAchieved = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.state.gameNumbers[i][j] == 2048) {
          isAchieved = true;
        }
      }
    }
    return isAchieved;
  };

  //Checks whether further matches are available to continue the game
  isMatchesAvailable = () => {
    let noMatches = true;
    const { gameNumbers } = this.state;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i + 1 != 4) {
          if (gameNumbers[i][j] == gameNumbers[i + 1][j]) {
            noMatches = false;
          }
        }
        if (j + 1 != 4) {
          if (gameNumbers[i][j] == gameNumbers[i][j + 1]) {
            noMatches = false;
          }
        }
      }
    }
    if (noMatches == true) {
      return false;
    } else {
      return true;
    }
  };

  //Checks whether free space is available
  isThereFreeSpace = () => {
    let freeSpaceAvailable = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.state.gameNumbers[i][j] == 0) {
          freeSpaceAvailable = true;
        }
      }
    }
    return freeSpaceAvailable;
  };

  alignNumbersForKeyS = () => {
    let spaceAvailable = 0;
    const { gameNumbers } = this.state;
    for (var i = 0; i < 4; i++) {
      for (var j = 3; j >= 0; j--) {
        if (gameNumbers[j][i] == 0) {
          spaceAvailable += 1;
        } else if (gameNumbers[j][i] != 0 && spaceAvailable > 0) {
          let l = 0;
          for (let k = spaceAvailable; k > 0; k--) {
            gameNumbers[j + l + 1][i] = gameNumbers[j + l][i];
            gameNumbers[j + l][i] = 0;
            l++;
          }
        }
      }
      spaceAvailable = 0;
    }
  };

  //Code to align numbers for key W
  alignNumbersForKeyW = () => {
    let spaceAvailable = 0;
    const { gameNumbers } = this.state;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (gameNumbers[j][i] == 0) {
          spaceAvailable += 1;
        } else if (gameNumbers[j][i] != 0 && spaceAvailable > 0) {
          let l = 0;
          for (let k = spaceAvailable; k > 0; k--) {
            gameNumbers[j - l - 1][i] = gameNumbers[j - l][i];
            gameNumbers[j - l][i] = 0;
            l++;
          }
        }
      }
      spaceAvailable = 0;
    }
  };

  //Code to align numbers for key A
  alignNumbersForKeyA = () => {
    let spaceAvailable = 0;
    const { gameNumbers } = this.state;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (gameNumbers[i][j] == 0) {
          spaceAvailable += 1;
        } else if (gameNumbers[i][j] != 0 && spaceAvailable > 0) {
          let l = 0;
          for (let k = spaceAvailable; k > 0; k--) {
            gameNumbers[i][j - l - 1] = gameNumbers[i][j - l];
            gameNumbers[i][j - l] = 0;
            l++;
          }
        }
      }
      spaceAvailable = 0;
    }
  };

  //Code to align numbers for key D
  alignNumbersForKeyD = () => {
    let spaceAvailable = 0;
    const { gameNumbers } = this.state;
    for (var i = 0; i < 4; i++) {
      for (var j = 3; j >= 0; j--) {
        if (gameNumbers[i][j] == 0) {
          spaceAvailable += 1;
        } else if (gameNumbers[i][j] != 0 && spaceAvailable > 0) {
          let l = 0;
          for (let k = spaceAvailable; k > 0; k--) {
            gameNumbers[i][j + l + 1] = gameNumbers[i][j + l];
            gameNumbers[i][j + l] = 0;
            l++;
          }
        }
      }
      spaceAvailable = 0;
    }
  };

  validationAfterKeypress = () => {
    setTimeout(() => {
      if (this.isThereFreeSpace() == true) {
        if (this.is2048Achieved() == true) {
          alert("Congratulations!! You made it ;)");
          alert(`Time taken = ${this.state.hzero}${this.state.hours} : ${this.state.mzero}${this.state.min} : ${this.state.szero}${this.state.sec} 
          Score = ${this.state.score}`);
          this.newGame();
        }
      } else {
        if (this.is2048Achieved() == true) {
          alert("Congratulations!! You made it ;)");
          alert(`Time taken = ${this.state.hzero}${this.state.hours} : ${this.state.mzero}${this.state.min} : ${this.state.szero}${this.state.sec} 
          Score = ${this.state.score}`);
          this.newGame();
        } else if (this.isMatchesAvailable() == false) {
          alert("Game Over! You can try once more :)");
          alert(`Time taken = ${this.state.hzero}${this.state.hours} : ${this.state.mzero}${this.state.min} : ${this.state.szero}${this.state.sec} 
          Score = ${this.state.score}`);
          this.newGame();
        }
      }
    }, 350);
  };

  //Handles the keypress of keys W, A, S, D
  handleKeypress = (key, event) => {
    const { gameNumbers } = this.state;
    switch (key) {
      case "up":
      case "w":
        if (this.state.isTimerRunning == false) {
          this.startTimer();
          this.state.isTimerRunning = true;
        }
        this.alignNumbersForKeyW();
        //Adds up the nearest same values
        for (var i = 0; i < 4; i++) {
          for (var j = 1; j < 4; j++) {
            if (
              gameNumbers[j][i] == gameNumbers[j - 1][i] &&
              gameNumbers[j][i] != 0
            ) {
              gameNumbers[j - 1][i] = gameNumbers[j][i] + gameNumbers[j - 1][i];
              gameNumbers[j][i] = 0;
            }
          }
        }
        //Further alligns the free space which might be generated on adding same numbers
        this.alignNumbersForKeyW();
        this.randomPlaceValueGenerator();
        this.calculateScore();
        this.setState({});
        this.validationAfterKeypress();
        break;
      case "down":
      case "s":
        if (this.state.isTimerRunning == false) {
          this.startTimer();
          this.state.isTimerRunning = true;
        }
        this.alignNumbersForKeyS();
        //Adds up the nearest same values
        for (var i = 0; i < 4; i++) {
          for (var j = 2; j >= 0; j--) {
            if (
              gameNumbers[j][i] == gameNumbers[j + 1][i] &&
              gameNumbers[j][i] != 0
            ) {
              gameNumbers[j + 1][i] = gameNumbers[j][i] + gameNumbers[j + 1][i];
              gameNumbers[j][i] = 0;
            }
          }
        }
        //Further alligns the free space which might be generated on adding same numbers
        this.alignNumbersForKeyS();
        this.randomPlaceValueGenerator();
        this.calculateScore();
        this.setState({});
        this.validationAfterKeypress();
        break;
      case "left":
      case "a":
        if (this.state.isTimerRunning == false) {
          this.startTimer();
          this.state.isTimerRunning = true;
        }
        this.alignNumbersForKeyA();
        //Adds up the nearest same values
        for (var i = 0; i < 4; i++) {
          for (var j = 1; j < 4; j++) {
            if (
              gameNumbers[i][j] == gameNumbers[i][j - 1] &&
              gameNumbers[i][j] != 0
            ) {
              gameNumbers[i][j - 1] = gameNumbers[i][j] + gameNumbers[i][j - 1];
              gameNumbers[i][j] = 0;
            }
          }
        }
        //Further alligns the free space which might be generated on adding same numbers
        this.alignNumbersForKeyA();
        this.randomPlaceValueGenerator();
        this.calculateScore();
        this.setState({});
        this.validationAfterKeypress();
        break;
      case "right":
      case "d":
        if (this.state.isTimerRunning == false) {
          this.startTimer();
          this.state.isTimerRunning = true;
        }
        this.alignNumbersForKeyD();
        //Adds up the nearest same values
        for (var i = 0; i < 4; i++) {
          for (var j = 2; j >= 0; j--) {
            if (
              gameNumbers[i][j] == gameNumbers[i][j + 1] &&
              gameNumbers[i][j] != 0
            ) {
              gameNumbers[i][j + 1] = gameNumbers[i][j] + gameNumbers[i][j + 1];
              gameNumbers[i][j] = 0;
            }
          }
        }
        //Further alligns the free space which might be generated on adding same numbers
        this.alignNumbersForKeyD();
        this.randomPlaceValueGenerator();
        this.calculateScore();
        this.setState({});
        this.validationAfterKeypress();
        break;
    }
  };

  render() {
    const { gameNumbers } = this.state;
    return (
      <div className="mainContainer">
        <h1>2048</h1>
        <div className="timeAndScoreContainer">
          <div>
            Time -{" "}
            <label>
              {this.state.hzero}
              {this.state.hours} : {this.state.mzero}
              {this.state.min} : {this.state.szero}
              {this.state.sec}
            </label>
          </div>
          <div>Score : {this.state.score}</div>
        </div>
        <div className="componentContainer">
          <div className="componentFlex">
            <Block number={gameNumbers[0][0]} />
            <Block number={gameNumbers[0][1]} />
            <Block number={gameNumbers[0][2]} />
            <Block number={gameNumbers[0][3]} />
          </div>
          <div className="componentFlex">
            <Block number={gameNumbers[1][0]} />
            <Block number={gameNumbers[1][1]} />
            <Block number={gameNumbers[1][2]} />
            <Block number={gameNumbers[1][3]} />
          </div>
          <div className="componentFlex">
            <Block number={gameNumbers[2][0]} />
            <Block number={gameNumbers[2][1]} />
            <Block number={gameNumbers[2][2]} />
            <Block number={gameNumbers[2][3]} />
          </div>
          <div className="componentFlex">
            <Block number={gameNumbers[3][0]} />
            <Block number={gameNumbers[3][1]} />
            <Block number={gameNumbers[3][2]} />
            <Block number={gameNumbers[3][3]} />
          </div>
        </div>
        <button className="buttonReset" onClick={this.newGame}>
          New Game
        </button>
        <KeyboardEventHandler
          handleKeys={["a", "s", "d", "w", "down", "left", "right", "up"]}
          onKeyEvent={this.handleKeypress}
        />
      </div>
    );
  }
}

export default Game;
