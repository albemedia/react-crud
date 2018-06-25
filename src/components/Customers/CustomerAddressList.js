import React from "react";

export default class CustomerAddressList extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="list-group w-100">
        {data.map(list => {
          return (
            <a className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  {list.streetName + ", " + list.streetNumber}
                </h5>
                <small>Ver en Maps</small>
              </div>
              <p className="mb-1">
                {"(" +
                  list.zipcode +
                  ") " +
                  list.locality +
                  ", " +
                  list.province}
              </p>
              <small />
            </a>
          );
        })}
      </div>
    );
  }
}
