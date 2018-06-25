import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "../Customers/Customers.css";
import Loading from "../Loading/Loading";
import CategoryField from "./CategoryField";
import CategoryList from "./CategoryList";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      waitingResponse: true,
      listFetchingError: false,
      parentSelected: "",
      subcategories: [],
      level1: "",
      level2: "",
      level3: ""
    };
  }
  componentDidMount() {
    this.updateList();
  }

  updateList = () => {
    axios
      .get("https://deltomapi.herokuapp.com/api/products/categories")
      .then(res => {
        if (res.data.status === "ok") {
          this.setState({
            categories: res.data.categories,
            waitingResponse: false,
            listFetchingError: false
          });
          this.level1Select(this.state.level1);
          this.level2Select(this.state.level2);
          this.level3Select(this.state.level3);
        }
      })
      .catch(error => {
        this.setState({ waitingResponse: false, listFetchingError: true });
      });
  };

  deleteCategory = id => {
    axios
      .get(
        "https://deltomapi.herokuapp.com/api/products/categories/delete/" + id
      )
      .then(res => {
        this.updateList();
      })
      .catch(error => {
        alert("Something went very wrong");
      });
  };

  getArray = () => {
    return this.state.categories;
  };

  level1Select = id => {
    this.setState({ level1: id });
    this.level2Select("");
  };

  level2Select = id => {
    this.setState({ level2: id });
    this.level3Select("");
  };

  level3Select = id => {
    this.setState({ level3: id });
  };

  render() {
    if (this.state.waitingResponse) {
      return (
        <div className="">
          <h1 className="mb-3">Categorias</h1>
          <Loading text="Cargando..." />
        </div>
      );
    }
    if (this.state.listFetchingError) {
      return (
        <div className="">
          <h1 className="mb-3">Categorias</h1>
          <span className="p-3 mb-2 bg-danger text-white d-box">
            <span className="oi oi-warning" />Error de Conexion: La base de
            datos no pudo ser alcanzada!
          </span>
        </div>
      );
    }
    if (!this.state.waitingResponse && !this.state.listFetchingError) {
      if (this.state.categories.length !== 0) {
        //Filter Categories
        const rootCats = this.state.categories.filter(category => {
          return category.parent === "0";
        });
        const subCats = this.state.categories.filter(category => {
          return category.parent === this.state.level1;
        });
        const subSubCats = this.state.categories.filter(category => {
          return category.parent === this.state.level2;
        });
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
            </div>
            <div className="row clearfix w-100">
              <div className="col-lg-4 col-md-4">
                <h1 className="mb-3">Categorias</h1>
                <CategoryList
                  data={rootCats}
                  delete={this.deleteCategory}
                  select={this.level1Select}
                  selected={this.state.level1}
                />
                <CategoryField callback={this.updateList} parent="0" />
              </div>
              <div className="col-lg-4 col-md-4">
                <h2 className="mb-4">Sub-categorias</h2>
                <CategoryList
                  data={subCats}
                  delete={this.deleteCategory}
                  select={this.level2Select}
                  selected={this.state.level2}
                />
                <CategoryField
                  key="addSubCat"
                  callback={this.updateList}
                  parent={this.state.level1}
                />
              </div>
              <div className="col-lg-4 col-md-4">
                <h2 className="mb-4">Sub Sub Categoria</h2>
                <CategoryList
                  data={subSubCats}
                  delete={this.deleteCategory}
                  select={this.level3Select}
                  selected={this.state.level3}
                />
                <CategoryField
                  key="addSubCat"
                  callback={this.updateList}
                  parent={this.state.level2}
                />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="">
            <h1 className="mb-3">Categorias</h1>
            <span className="text-danger">
              No hay categorias en la base de datos a&uacute;n
            </span>
            <ul className="list-group list-group-flush w-100">
              <CategoryField callback={this.updateList} parent="0" />
            </ul>
          </div>
        );
      }
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList);
