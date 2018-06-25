import React, { Component } from "react";

export default class CategoryList extends Component {
  render() {
    if (this.props.data) {
      if (this.props.data !== undefined && this.props.data.length !== 0) {
        return (
          <div className="list-group list-group-flush w-100">
            {this.props.data.map(list => {
              return (
                <button
                  type="button"
                  className={
                    "list-group-item list-group-item-action" +
                    (this.props.selected === list._id ? " active" : "")
                  }
                  key={list._id}
                  onClick={() => this.props.select(list._id)}
                >
                  {list.description}
                  <a
                    className="badge badge-danger"
                    onClick={() => {
                      this.props.delete(list._id);
                    }}
                  >
                    X
                  </a>
                </button>
              );
            })}
          </div>
        );
      } else {
        return "Nothing to list";
      }
    } else {
      return "Nothing to list";
    }
  }
}
