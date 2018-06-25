import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CustomerNewAddressForm from "./CustomerNewAddressForm";
import CustomerAddressList from "./CustomerAddressList";

const mapStateToProps = state => ({
  customers: state.customers.data
});

class CustomerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddressForm: false
    };
  }

  showAddressForm = (command = false) => {
    this.setState({
      showAddressForm: command
    });
  };

  render() {
    if (this.props.customers.length !== 0) {
      const customer = this.props.customers.find(id => {
        return id.cuit === this.props.match.params.id;
      });
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
          <div className="row w-100">
            <div className="col-md-3 text-center">
              <img
                src={window.location.origin + "/profile_placeholder_thumb.jpg"}
                alt="Imagen del Cliente"
                className="img-thumbnail rounded-circle"
              />
            </div>
            <div className="col-md-9">
              <h1 className="mb-3">{customer.company}</h1>
              <div className="lead mt-3 mb-3">Informacion del cliente</div>
              <div className="row w-100">
                <div className="col-md-3 text-right">
                  <strong>CUIT</strong>
                </div>
                <div className="col-md-9">{customer.cuit}</div>
              </div>
              <div className="row w-100">
                <div className="col-md-3 text-right">
                  <strong>Representante</strong>
                </div>
                <div className="col-md-9">
                  {customer.name} {customer.lastName}
                </div>
              </div>
              <div className="row w-100">
                <div className="col-md-3 text-right">
                  <strong>
                    <span className="oi oi-envelope-closed" />Email
                  </strong>
                </div>
                <div className="col-md-9">{customer.email}</div>
              </div>
              <div className="row w-100">
                <div className="col-md-3 text-right">
                  <strong>
                    <span className="oi oi-phone" />Telefono
                  </strong>
                </div>
                <div className="col-md-9">{customer.tlf}</div>
              </div>
              <div className="lead mt-3 mb-3">Direccion Fiscal</div>
              <div className="row w-100">
                {!this.state.showAddressForm ? (
                  ""
                ) : (
                  <div className="card mb-3 w-100">
                    <div className="card-body">
                      <button
                        onClick={() => this.showAddressForm(false)}
                        type="button"
                        className="close float-right"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <CustomerNewAddressForm customer={customer.cuit} />
                    </div>
                  </div>
                )}
                {!customer.addresses || customer.addresses.length === 0 ? (
                  <button
                    onClick={() => this.showAddressForm(true)}
                    className="btn btn-primary ml-5"
                  >
                    Agregar Direccion
                  </button>
                ) : (
                  <div className="w-100">
                    <CustomerAddressList data={customer.addresses} />
                    <button
                      onClick={() => this.showAddressForm(true)}
                      className="btn btn-primary ml-5 mt-3"
                    >
                      Agregar Direccion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Cliente no encontrado</h5>
          <p className="card-text">
            Vuelva a la seccion de Clientes para ver el listado completo
          </p>
          <Link to="/customers" className="btn btn-primary">
            Volver
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CustomerInfo);
