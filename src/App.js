import React from "react";
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

const CardButton = () => {
  return (
    <div className="col-2 align-self-center">
      <div className="card border-0">
        <button
          type="button"
          className="btn btn-outline-info w-50 btn-lg p-4 text-uppercase"
        >
          Is your Card Here?
        </button>
      </div>
    </div>
  );
};

const Cards = ({ cardName }) => {
  return (
    <div className="col-1 my-2 fade-in">
      <div className="card border-0">
        <img
          src={cardName}
          className="card-img-top text-white"
          alt={cardName}
        />
      </div>
    </div>
  );
};
const CardRows = ({ deck }) => {
  return (
    <div className="row justify-content-between">
      {deck.map((value, index) => {
        return <Cards key={index} cardName={value} />;
      })}
      <CardButton />
    </div>
  );
};

function App() {
  let shuffles = 0;
  let currDeck = getDeck();
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
      {shuffles === 0 ? (
        <>
          <CardRows deck={currDeck.slice(0, 7)} />
          <CardRows deck={currDeck.slice(7, 14)} />
          <CardRows deck={currDeck.slice(14, 21)} />
        </>
      ) : (
        <>
          <CardRows deck={currDeck.slice(14, 21)} />
          <CardRows deck={currDeck.slice(7, 14)} />
          <CardRows deck={currDeck.slice(0, 7)} />
        </>
      )}
    </div>
  );
}

export default App;
