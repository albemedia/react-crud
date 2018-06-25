import React from "react";
import { connect } from "react-redux";
import {
  sendFormData,
  serverPostResponse
} from "../../actions/customersActions";
import Loading from "../Loading/Loading";

const mapStateToProps = state => ({
  waitingResponse: state.customers.waitingResponse,
  response: state.customers.serverPostResponse
});

const mapDispatchToProps = dispatch => ({
  sendFormData: (url, data) => dispatch(sendFormData(url, data)),
  serverPostResponse: data => dispatch(serverPostResponse(data))
});

class CustomerNewAddressForm extends React.Component {
  componentDidMount() {
    this.resetForm();
  }

  resetForm = () => {
    this.props.serverPostResponse({ status: "ready", msg: "" });
  };

  sendForm = e => {
    e.preventDefault();
    const fd = Object.values(document.forms["addCustomerAddress"].elements);
    const data = {};
    const url =
      "http://localhost:8081/customers/newaddress/" + this.props.customer;
    console.log(url);
    fd.map(elem => {
      return (data[elem.name] = elem.value);
    });
    this.props.sendFormData(url, data);
  };

  render() {
    const { waitingResponse, response } = this.props;
    if (!waitingResponse && response.status === "ready") {
      return (
        <div id="customerForm" className="row clearfix w-100">
          <div className="col-md-12 col-lg-12">
            <form
              id="addCustomerAddress"
              name="addCustomerAddress"
              onSubmit={e => this.sendForm(e)}
            >
              <span className="lead text-info mb-3 d-block">
                {" "}
                Nueva Direccion
              </span>
              <div className="form-group form-row">
                <div className="col-9">
                  <label className="">Calle</label>
                  <input
                    type="text"
                    name="streetName"
                    className="form-control"
                    id="customerStreetName"
                    aria-describedby="streetName"
                    placeholder="Nombre de la Calle"
                  />
                </div>
                <div className="col-3">
                  <label className="">Numero</label>
                  <input
                    type="text"
                    name="streetNumber"
                    className="form-control"
                    id="customerStreetNumber"
                    aria-describedby="streetNumber"
                    placeholder="Numero"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-2">Localidad</label>
                <div className="col">
                  <input
                    type="text"
                    name="locality"
                    className="form-control"
                    id="customerLocality"
                    aria-describedby="locality"
                    placeholder="Localidad"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-2">Provincia</label>
                <div className="col">
                  <input
                    type="text"
                    name="province"
                    className="form-control"
                    id="customerProvince"
                    aria-describedby="province"
                    placeholder="Provincia"
                  />
                </div>
                <label className="col-md-3">Codigo Postal</label>
                <div className="col">
                  <input
                    type="text"
                    name="zipcode"
                    className="form-control"
                    id="customerZipCode"
                    aria-describedby="zipcode"
                    placeholder="Codigo Postal"
                  />
                </div>
              </div>
              <button
                className="btn btn-primary float-right mb-5"
                type="submit"
              >
                Agregar
              </button>
            </form>
          </div>
        </div>
      );
    }

    if (waitingResponse) {
      return (
        <div>
          <h5 className="card-title">
            <Loading text="Enviando..." />
          </h5>
          <p className="card-text">
            Espere un momento, por favor no refresque la pagina.
          </p>
        </div>
      );
    }

    if (!waitingResponse && response.status === "ok") {
      return (
        <div>
          <h5 className="card-title">Resultado</h5>
          <p className="card-text">{this.props.response.msg}</p>
        </div>
      );
    }

    if (!waitingResponse && response.status === "error") {
      return (
        <div>
          <h5 className="card-title text-danger">ERROR</h5>
          <p className="card-text text-danger">{this.props.response.msg}</p>
          <button onClick={this.resetForm} className="btn btn-primary">
            Volver
          </button>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CustomerNewAddressForm
);
