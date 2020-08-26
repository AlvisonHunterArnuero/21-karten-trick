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
    this.onUpdateDeck = this.onUpdateDeck.bind(this);
    this.state = {
      chosenRow: "top",
      numbShuffles: 0,
      finalArrangement: [],
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

  onUpdateDeck = (argFinalArrangement) => {
    console.log("Current Arrangement ", argFinalArrangement);
    this.setState(() => {
      return {
        finalArrangement: argFinalArrangement,
      };
    });
  };

  render() {
    let arrFinal = [];
    let topDeck = [];
    let middleDeck = [];
    let bottomDeck = [];
    if (this.state.numbShuffles === 0) {
      topDeck = this.state.arrCurrentDeck.slice(0, 7);
      middleDeck = this.state.arrCurrentDeck.slice(7, 14);
      bottomDeck = this.state.arrCurrentDeck.slice(14, 21);
      arrFinal.push(topDeck, middleDeck, bottomDeck);
      console.log("First Arrange: ", arrFinal);
    } else if (this.state.numbShuffles > 0 && this.state.chosenRow === "top") {
      topDeck = this.state.arrCurrentDeck.slice(7, 14);
      middleDeck = this.state.arrCurrentDeck.slice(0, 7);
      bottomDeck = this.state.arrCurrentDeck.slice(14, 21);
      arrFinal.push(topDeck, middleDeck, bottomDeck);
      console.log("TOP: ", arrFinal);
    } else if (
      this.state.numbShuffles > 0 &&
      this.state.chosenRow === "middle"
    ) {
      topDeck = this.state.arrCurrentDeck.slice(14, 21);
      middleDeck = this.state.arrCurrentDeck.slice(7, 14);
      bottomDeck = this.state.arrCurrentDeck.slice(0, 7);
      arrFinal.push(topDeck, middleDeck, bottomDeck);
      console.log("MIDDLE: ", arrFinal);
    } else if (
      this.state.numbShuffles > 0 &&
      this.state.chosenRow === "bottom"
    ) {
      topDeck = this.state.arrCurrentDeck.slice(0, 7);
      middleDeck = this.state.arrCurrentDeck.slice(14, 21);
      bottomDeck = this.state.arrCurrentDeck.slice(7, 14);
      arrFinal.push(topDeck, middleDeck, bottomDeck);
      console.log("BOTTOM: ", arrFinal);
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
          <strong>{this.state.numbShuffles}</strong>
        </div>

        {this.state.numbShuffles < 1 ? (
          <>
            <CardRows
              deck={topDeck}
              onRowSelected={this.onShuffle}
              selectedDeck={"top"}
            />
            <CardRows
              deck={middleDeck}
              onRowSelected={this.onShuffle}
              selectedDeck={"middle"}
            />
            <CardRows
              deck={bottomDeck}
              onRowSelected={this.onShuffle}
              selectedDeck={"bottom"}
            />
          </>
        ) : (
          <>
            <div className="row justify-content-center">
              <div className="col-auto fade-in">
                <div className="card border-0">
                  {this.state.finalArrangement && (
                    <img
                      src={this.state.finalArrangement[10]}
                      className="card-img-top w-50"
                      alt={this.state.finalArrangement[10]}
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
