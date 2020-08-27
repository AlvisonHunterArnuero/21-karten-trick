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
      <React.Fragment>
        {this.props.deck.map((value, index) => {
          return (
            <div key={index} className="col-auto my-2 fade-in">
              <div className="card border-0">
                <img src={value} className="card-img-top" alt={value} />
              </div>
            </div>
          );
        })}

        <div className="card border-0">
          <button
            onClick={() => this.handleSelectedRowClick(this.props)}
            className="btn btn-outline-info w-50 btn-lg p-4 text-uppercase"
          >
            Is your Card Here?
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default CardRows;
