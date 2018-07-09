import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import CustomerList from "./components/Customers/CustomerList";
import CustomerAddForm from "./components/Customers/CustomerAddForm";
import CustomerInfo from "./components/Customers/CustomerInfo";
//import OrdersList from "./components/Orders/OrdersList";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import CategoriesList from "./components/Categories/CategoriesList";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <div className="container-fluid">
              <div className="row nb-fixer">
                <Sidebar />
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 mt-10"
                >
                  <Switch>
                    <Route exact path="/customers" component={CustomerList} />
                    <Route path="/customers/add" component={CustomerAddForm} />
                    <Route
                      path="/customers/info/:id"
                      component={CustomerInfo}
                    />
                    <Route path="/products/" component={CategoriesList} />
                  </Switch>
                </main>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
