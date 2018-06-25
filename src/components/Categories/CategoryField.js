import React, { PureComponent } from "react";
import axios from "axios";

export default class CategoryField extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ready: true,
      sending: false,
      disabled: false,
      description: ""
    };
  }

  textField = data => {
    this.setState({ description: data });
  };

  submitForm = e => {
    e.preventDefault();
    this.setState({ ready: false, sending: true, disabled: true });
    axios
      .post("http://localhost:5000/api/products/categories", {
        description: this.state.description,
        parent: this.props.parent !== undefined ? this.props.parent : "0"
      })
      .then(response => {
        if (response.data.status === "ok") {
          this.setState({
            ready: true,
            sending: false,
            disabled: false,
            description: ""
          });
          this.props.callback();
        } else {
          throw Error("Something went wrong");
        }
      })
      .catch(error => {
        alert(error);
        this.setState({ ready: true, sending: false, disabled: false });
      });
  };

  render() {
    return (
      <div className="form-group" key="catField">
        <form
          onSubmit={e => {
            if (this.props.parent === "") {
              alert("Select a Category");
            } else {
              this.submitForm(e);
            }
          }}
        >
          <input
            className="form-control"
            onChange={e => {
              this.textField(e.target.value);
            }}
            disabled={this.state.disabled}
            type="text"
            name="description"
            placeholder="Nuevo Item"
            value={this.state.description}
          />
        </form>
      </div>
    );
  }
}
