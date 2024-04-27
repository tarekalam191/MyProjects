import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import UserRegister from "./User_Tarek/Register";
import UserDetails from "./User_Tarek/userDetails";
import NotFound from "./Pages/NotFound";
import ListProducts from "./product/Product";
import ProductDetails from "./product/ProductDetails";
import Cart_test from "./Carts/Carts";
import { NavLink } from "react-bootstrap";
import Cart_Shop from "./Carts/Carts";
import Favorites from "./Pages/Favoriate";
function App() {
  return (
    <BrowserRouter>
    
      <NavBar />
      <div className="Container mb-4">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Carts" component={Cart_Shop} exact />
          <Route path="/form2" component={UserRegister} exact />
          <Route path="/form" component={UserDetails} exact />
          <Route path="/Products" component={ListProducts} exact />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/Favorites" component={Favorites} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
