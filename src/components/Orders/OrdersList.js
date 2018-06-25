import React from "react";

export default class OrdersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersList: []
    };
  }
  componentDidMount() {}

  render() {
    if (this.state.ordersList.length === 0) {
      return (
        <div className="whitecard">
          <span>There are no orders yet!</span>
        </div>
      );
    } else {
      if (this.state.ordersList === "error") {
        return (
          <div className="whitecard">
            <span style={{ color: "red" }}>
              Couldn't get any orders, please check your connection
            </span>
          </div>
        );
      } else {
        return (
          <div className="whitecard">
            <h1>Orders</h1>
          </div>
        );
      }
    }
  }
}
