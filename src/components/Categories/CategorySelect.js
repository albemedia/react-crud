import React, { Component } from "react";

export default class CategorySelect extends Component {
  render() {
    return (
      <select
        name="parent"
        onChange={e => {
          this.props.onChange(
            e.target.value,
            e.target[e.target.selectedIndex].text
          );
        }}
      >
        <option value="0" defaultValue>
          Raiz
        </option>
        {this.props.data.map(category => {
          return (
            <option
              key={category._id}
              label={category.description}
              value={category._id}
            >
              {category.description}
            </option>
          );
        })}
      </select>
    );
  }
}
