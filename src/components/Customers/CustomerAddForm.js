import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  sendFormData,
  serverPostResponse
} from "../../actions/customersActions";
import "./Customers.css";
import Loading from "../Loading/Loading";

const mapStateToProps = state => ({
  waitingResponse: state.customers.waitingResponse,
  response: state.customers.serverPostResponse
});

const mapDispatchToProps = dispatch => ({
  sendFormData: (url, data) => dispatch(sendFormData(url, data)),
  serverPostResponse: data => dispatch(serverPostResponse(data))
});

class CustomerAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "fisica",
      cuitInputValue: ""
    };
  }

  componentDidMount() {
    this.resetForm();
  }

  resetForm = () => {
    this.props.serverPostResponse({ status: "ready", msg: "" });
  };

  changeOption = e => {
    console.log(e.target.value);
    this.setState({
      selectedOption: e.target.value
    });
  };

  formatInput = e => {
    const input = e.target.value;
    this.setState({
      cuitInputValue: input.replace(/[\W\s.-]/, "")
    });
  };

  sendForm = e => {
    e.preventDefault();
    const fd = Object.values(document.forms["addCustomer"].elements);
    const data = {};
    fd.map(elem => {
      return (data[elem.name] = elem.value);
    });
    this.props.sendFormData(
      "https://deltomapi.herokuapp.com/api/customers",
      data
    );
  };

  render() {
    const { waitingResponse, response } = this.props;

    if (!waitingResponse && response.status === "ready") {
      return (
        <div>
          <div
            className="btn-toolbar float-md-right"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div className="btn-group mr-2" role="group" aria-label="Volver">
              <Link to="/customers">
                <button type="button" className="btn btn-primary btn-sm">
                  <span className="oi oi-chevron-left" />
                  Volver
                </button>
              </Link>
            </div>
          </div>
          <div id="customerForm" className="row clearfix w-100">
            <div className="col-md-12 col-lg-12">
              <h1 className="mb-3">Nuevo Cliente</h1>
              <form
                id="addCustomer"
                name="addCustomer"
                onSubmit={e => this.sendForm(e)}
              >
                <span className="lead text-info mb-3 d-block">
                  {" "}
                  Informacion de la Empresa
                </span>
                <div className="form-group row">
                  <label className="col-md-3 col-form-label">
                    Nombre de la Empresa
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      name="company"
                      className="form-control"
                      id="customerCompanyName"
                      aria-describedby="company"
                      placeholder="Razon Social de la Empresa"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3">Numero de Identificacion</label>
                  <div className="col">
                    <input
                      type="text"
                      name="cuit"
                      className="form-control"
                      id="customerCuit"
                      aria-describedby="cuit"
                      placeholder="CUIT, CUIL o DNI"
                      value={this.state.cuitInputValue}
                      onChange={this.formatInput}
                      maxLength="13"
                    />
                    <small id="cuitHelp" className="form-text text-muted">
                      Si es persona fisica colocar CUIL o CUIT en caso de no
                      poseer colocar DNI
                    </small>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3">Tipo de persona</label>
                  <div className="col">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tipopersona"
                        value="juridica"
                        onClick={() => alert("Hello")}
                        defaultChecked={
                          this.state.selectedOption === "juridica"
                        }
                      />
                      <label className="form-check-label">Juridica</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tipopersona"
                        value="fisica"
                        defaultChecked={this.state.selectedOption === "fisica"}
                      />
                      <label className="form-check-label">Fisica</label>
                    </div>
                  </div>
                </div>
                <span className="lead text-info mb-3 d-block">
                  {" "}
                  Informacion Personal
                </span>
                <div className="form-row">
                  <div className="col">
                    <label className="">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="customerName"
                      aria-describedby="name"
                      placeholder="Nombre"
                    />
                  </div>
                  <div className="col">
                    <label className="">Apellido</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      id="customerLastName"
                      aria-describedby="lastName"
                      placeholder="Apellido"
                    />
                  </div>
                </div>
                <span className="lead text-info mb-3 mt-4 d-block">
                  {" "}
                  Informacion de Contacto
                </span>
                <div className="form-group row">
                  <label className="col-md-3">Email</label>
                  <div className="col">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="customerEmail"
                      aria-describedby="email"
                      placeholder="Direccion de Email"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3">Telefono</label>
                  <div className="col">
                    <input
                      type="text"
                      name="tlf"
                      className="form-control"
                      id="customerTlf"
                      aria-describedby="tlf"
                      placeholder="11 0000-0000"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3">Celular</label>
                  <div className="col">
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      id="customerMobile"
                      aria-describedby="mobile"
                      placeholder="11 15 0000-0000"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary float-right mb-5"
                  type="submit"
                >
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    if (waitingResponse) {
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <Loading text="Enviando..." />
            </h5>
            <p className="card-text">
              Espere un momento, por favor no refresque la pagina.
            </p>
          </div>
        </div>
      );
    }

    if (!waitingResponse && response.status === "ok") {
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Resultado</h5>
            <p className="card-text">{this.props.response.msg}</p>
            <Link to="/customers/" className="btn btn-primary">
              Volver
            </Link>
          </div>
        </div>
      );
    }

    if (!waitingResponse && response.status === "error") {
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-danger">ERROR</h5>
            <p className="card-text text-danger">{this.props.response.msg}</p>
            <Link
              onClick={this.resetForm}
              to="/customers/add"
              className="btn btn-primary"
            >
              Volver
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerAddForm);
