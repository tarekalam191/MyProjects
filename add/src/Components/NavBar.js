import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types"; 
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import image from '../images/image.jpg';
import fav from '../images/fav.jpg'
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, AddToFavorites } from "../Store/action";
import Cart_Shop from "../Carts/Carts";
import { useState } from "react";
import Favorites from "../Pages/Favoriate";

function NavBar({ company }) { 

  const My_Cart = useSelector((state) => state.cart_Of_P);

  const My_Fav = useSelector((state) => state.Favo_Of_P);

  const dispatch = useDispatch();

  const [favCounter, setFavCounter] = useState(0);

  const HandleAddToCart = () => {
    dispatch(AddToCart(My_Cart));
  };

  const handleAddToFavorites = () => {
    // Assuming My_Fav is an array of favorite item IDs
    const favoriteItemIds = My_Fav.map(item => item.id);
  
    // Assuming you want to add all items in the cart to favorites
    dispatch(AddToFavorites(My_Cart.filter(item => !favoriteItemIds.includes(item.id))));
    setFavCounter(favCounter + My_Cart.length);
  };
  
  
  return (
    <Navbar sticky="top" bg="white" variant="light" expand="lg" className="bg-body-tertiary shadow-sm mb-3">
      <Container>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto mb-4 mb-lg-0">
            <Nav.Link as={Link} to="/products" className="nav-link active">Home</Nav.Link>
            <Nav.Link as={Link} to="/form2" className="nav-link">User Register</Nav.Link>
            <Nav.Link as={Link} to="/form" className="nav-link">Login</Nav.Link>
            <Nav.Link as={Link} to="/Products" className="nav-link">Products</Nav.Link>
            <Nav.Link as={Link} to="Carts" className="nav-link">Carts</Nav.Link>
            <Nav.Link as={Link} to="Favorites" className="nav-link">Favorites</Nav.Link>
            <Nav.Link as={Link} to="/movies" className="nav-link">
            </Nav.Link>
            {company && <Nav.Link as={Link} to={`/company/${company.id}`} className="nav-link">Company Details</Nav.Link>}
          </Nav>
          <form className="d-flex">
            <Button variant="outline-success" type="submit">Search</Button>
          </form>
        </Navbar.Collapse>
      </Container>
      <Button
        id="Add_To_Fav"
        variant="outline-primary"
        className="mb-15 me-3 rounded-circle"
        style={{
          width: "3rem",
          height: "3rem",
          padding: 0,
          border: "none",
          position: "relative",
          color: "white" 
        }}
        onClick={handleAddToFavorites}
      >
        <img
          src={fav}
          alt="Image"
          className="rounded-circle"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        
        <div
          className="rounded-circle bg-success d-flex justify-content-center align-items-center"
          style={{
            position: "absolute",
            color: "white",
            width: "1.5rem",
            height: "1.5rem",
            right: "0",
            bottom: "35px",
            transform: "translate(-40%, 30%)",
            objectFit: "cover"
          }}
        >
          {favCounter}
        </div>
      </Button>
      <Button id="Add_To_Cart" variant="outline-primary" className="rounded-circle" style={{ width: "3rem", height: "3rem", padding: 0, border: "none", position: "relative" }}>
        <img src={image} alt="Image"
             className="rounded-circle"
             style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
             style={{
               position: "absolute",
               color: "white",
               width: "1.5rem",
               height: "1.5rem",
               button: 0,
               right: 0,
               alignItems: "center",
               bottom: "35px",
               transform: "translate(-40%, 30%)",
               objectFit: "cover"
             }}
        >
          {My_Cart}
        </div>
      </Button>
    </Navbar>
  );
}

NavBar.propTypes = {
  company: PropTypes.object 
};

export default NavBar;
