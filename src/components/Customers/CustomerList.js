import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Customers.css";
import Pagination from "./Pagination";
import Loading from "../Loading/Loading";
import { fetchCustomers, setCurrentPage } from "../../actions/customersActions";

const mapStateToProps = state => ({
  customerList: state.customers.data,
  waitingResponse: state.customers.waitingResponse,
  listFetchingError: state.customers.listFetchingError,
  currentPage: state.customers.pagination.currentPage
});

const mapDispatchToProps = dispatch => ({
  fetchCustomers: url => dispatch(fetchCustomers(url)),
  setCurrentPage: page => dispatch(setCurrentPage(page))
});

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 6
    };
  }
  componentDidMount() {
    this.props.fetchCustomers("https://deltomapi.herokuapp.com/api/customers");
  }

  changeCurrentPage = (currentPage = 1) => {
    this.props.setCurrentPage(currentPage);
  };

  deleteCustomer = cuit => {
    axios
      .delete("https://deltomapi.herokuapp.com/api/customers/" + cuit)
      .then(res => {
        if (res.data.success) {
          this.getCustomers();
        } else {
          alert("There was an error deleting this item");
        }
      })
      .catch(error => {
        alert("Ups! Sorry something bad happened");
      });
  };

  render() {
    if (this.props.waitingResponse) {
      return (
        <div className="">
          <h1 className="mb-3">Clientes</h1>
          <Loading text="Cargando..." />
        </div>
      );
    }
    if (this.props.listFetchingError) {
      return (
        <div className="">
          <h1 className="mb-3">Clientes</h1>
          <span className="p-3 mb-2 bg-danger text-white d-box">
            <span className="oi oi-warning" />Error de Conexion: La base de
            datos no pudo ser alcanzada!
          </span>
        </div>
      );
    }
    if (!this.props.waitingResponse && !this.props.listFetchingError) {
      if (this.props.customerList.length !== 0) {
        //Pagination Start
        const totalPages = Math.ceil(
          this.props.customerList.length / this.state.itemsPerPage
        );
        const { itemsPerPage } = this.state;
        const { currentPage } = this.props;
        const start = (currentPage - 1) * this.state.itemsPerPage;
        const end = currentPage * itemsPerPage;
        const paginatedList = this.props.customerList.slice(start, end);
        //Pagination End
        return (
          <div className="">
            <div
              className="btn-toolbar float-lg-right"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div
                className="btn-group mr-2"
                role="group"
                aria-label="Opciones de Vista"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm active"
                >
                  <span className="oi oi-list" />
                  Lista
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                >
                  <span className="oi oi-list-rich" />
                  Detalle
                </button>
              </div>
              <div className="btn-group mr-2" role="group" aria-label="Agregar">
                <Link to="/customers/add">
                  <button type="button" className="btn btn-primary btn-sm">
                    <span className="oi oi-plus" />
                    Nuevo Cliente
                  </button>
                </Link>
              </div>
            </div>
            <div className="row clearfix w-100">
              <div className="col-lg-12 col-md-12">
                <h1 className="mb-3">Clientes</h1>
                <ul className="list-group list-group-flush w-100">
                  {paginatedList.map(l => (
                    <li className="list-group-item" key={l.cuit}>
                      <Link
                        to={"/customers/info/" + l.cuit}
                        className="nav-link text-primary"
                      >
                        {l.company}{" "}
                        <span className="text-muted">
                          ({l.name + " " + l.lastName})
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Pagination
              totalPages={totalPages}
              handleClick={this.changeCurrentPage}
              currentPage={currentPage}
            />
          </div>
        );
      } else {
        return <div>No hay Clientes</div>;
      }
    }
    return (
      <div className="">
        <h1 className="mb-3">Clientes</h1>
        <span className="text-danger">
          No hay clientes en la base de datos a&uacute;n
        </span>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerList);
