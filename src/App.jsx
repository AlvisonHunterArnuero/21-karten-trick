import React, { Component } from "react";
import CardRows from "./components/CardRows";
import "./App.css";

const getDeck = () => {
  let generatedCard = "";
  const deck = [];
  let cardPath = "./assets/images/";
  const elements = ["C.png", "D.png", "H.png", "S.png"];

  while (deck.length < 21) {
    let rndNumb = String(Math.floor(Math.random() * 13) + 1);
    let value = Math.floor(Math.random() * 2);

    if (rndNumb === "1") {
      generatedCard = cardPath + "A" + elements[value];
    } else if (rndNumb === "11") {
      generatedCard = cardPath + "J" + elements[value];
    } else if (rndNumb === "12") {
      generatedCard = cardPath + "Q" + elements[value];
    } else if (rndNumb === "13") {
      generatedCard = cardPath + "K" + elements[value];
    } else {
      generatedCard = cardPath + rndNumb + elements[value];
    }

    if (deck.indexOf(generatedCard) === -1) {
      deck.push(generatedCard);
    }
  } // end while
  return deck;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.onShuffle = this.onShuffle.bind(this);
    this.state = {
      chosenRow: "top",
      numbShuffles: 0,
      arrCurrentDeck: getDeck(),
    };
  }

  onShuffle = (argChosenRow) => {
    console.log("User has chosen ", argChosenRow);
    this.setState((prevState) => {
      return {
        numbShuffles: prevState.numbShuffles + 1,
        chosenRow: argChosenRow,
      };
    });
  };

  render() {
    let arrFinal = [];
    let leftDeck = [];
    let middleDeck = [];
    let rightDeck = [];
    if (this.state.numbShuffles === 0) {
      leftDeck = this.state.arrCurrentDeck.slice(0, 7);
      middleDeck = this.state.arrCurrentDeck.slice(7, 14);
      rightDeck = this.state.arrCurrentDeck.slice(14, 21);
      arrFinal = leftDeck.concat(middleDeck, rightDeck);
      console.log("First Arrange: ", arrFinal);
    } else if (this.state.numbShuffles > 0 && this.state.chosenRow === "left") {
      leftDeck = this.state.arrCurrentDeck.slice(7, 14);
      middleDeck = this.state.arrCurrentDeck.slice(0, 7);
      rightDeck = this.state.arrCurrentDeck.slice(14, 21);
      arrFinal = leftDeck.concat(middleDeck, rightDeck);
      console.log("LEFT: ", arrFinal);
    } else if (
      this.state.numbShuffles > 0 &&
      this.state.chosenRow === "middle"
    ) {
      leftDeck = this.state.arrCurrentDeck.slice(14, 21);
      middleDeck = this.state.arrCurrentDeck.slice(7, 14);
      rightDeck = this.state.arrCurrentDeck.slice(0, 7);
      arrFinal = leftDeck.concat(middleDeck, rightDeck);
      console.log("MIDDLE: ", arrFinal);
    } else if (
      this.state.numbShuffles > 0 &&
      this.state.chosenRow === "right"
    ) {
      leftDeck = this.state.arrCurrentDeck.slice(0, 7);
      middleDeck = this.state.arrCurrentDeck.slice(14, 21);
      rightDeck = this.state.arrCurrentDeck.slice(7, 14);
      arrFinal = leftDeck.concat(middleDeck, rightDeck);
      console.log("RIGHT: ", arrFinal);
    } else {
      console.log("FROM ELSE: ", arrFinal);
    }

    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h1 className="display-4 mt-3 text-info">
            Welcome to the 21 Karten Trick Game
          </h1>
        </div>
        <div className="row justify-content-center">
          <h4 className="text-warning">
            Please choose a card and remember it! We will try to guess it!
          </h4>
        </div>

        {this.state.numbShuffles < 3 ? (
          <>
            <div className="row justify-content-center">
              <div className="col-4">
                <CardRows
                  wholeDeck={this.state.arrCurrentDeck}
                  deck={leftDeck}
                  onRowSelected={this.onShuffle}
                  selectedDeck={"left"}
                />
              </div>
              <div className="col-4">
                <CardRows
                  wholeDeck={this.state.arrCurrentDeck}
                  deck={middleDeck}
                  onRowSelected={this.onShuffle}
                  selectedDeck={"middle"}
                />
              </div>
              <div className="col-4">
                <CardRows
                  wholeDeck={this.state.arrCurrentDeck}
                  deck={rightDeck}
                  onRowSelected={this.onShuffle}
                  selectedDeck={"right"}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row justify-content-center">
              <div className="col-auto fade-in">
                <div className="card border-0">
                  {arrFinal && (
                    <img
                      src={arrFinal[10]}
                      className="card-img-top w-50"
                      alt={arrFinal[10]}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
