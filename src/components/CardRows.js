import React, { Component } from "react";
class CardRows extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleSelectedRowClick() {
    console.log(`Child selected ${this.props.selectedDeck}`);
    return this.props.onRowSelected(this.props.selectedDeck);
  }

  render() {
    return (
      <div className="row justify-content-between">
        {this.props.deck.map((value, index) => {
          return (
            <div key={index} className="col-1 my-2 fade-in">
              <div className="card border-0">
                <img
                  src={value}
                  className="card-img-top text-white"
                  alt={value}
                />
              </div>
            </div>
          );
        })}
        <div className="col-2 align-self-center">
          <div className="card border-0">
            <button
              onClick={() => this.handleSelectedRowClick(this.props)}
              className="btn btn-outline-info w-50 btn-lg p-4 text-uppercase"
            >
              Is your Card Here?
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default CardRows;
