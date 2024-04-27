import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AddToCart, AddToFavorites } from "../Store/action";

function MyCard({
  img,
  title,
  details,
  id,
  price,
  stock,
  description,
  addToFavorites,
}) {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);

  const handleAddToCart = () => {
    dispatch(AddToCart(id)); 
    setCounter(counter + 1); 
  };
  const handleAddToFavorites = () => {
    dispatch(AddToFavorites(id)); 
    setCounter(counter + 1); 
  };

  return (
    <div className="col-md-3 my-0 md={2} xs={1} lg={4} g-3  ">
      <div className="card g-4 " style={{ width: "270px", height: "600px" }}>
        <img
          src={img}
          className="card-img-top"
          alt={title}
          style={{ width: "100%", height: "30%" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{details}</p>
          <div className="card-text mt-auto d-flex align-items-center d-flex  align-items-space-between ">
            <span className="card-text text-muted m-4">Price: {price}</span>
            <span className="card-text text-muted">Stock: {stock}</span>
          </div>
          <p className="card-text d-flex">Description: {description}</p>
          <Link to={`/product/${id}`} className="btn btn-primary w-100">
            View Details
          </Link>
          <br/>
          <br/>
          <div className="mt-auto">
            {stock !== 0 ? (
              <button onClick={handleAddToCart} className="btn btn-success w-100">
                Add To Cart 
              </button>
            ) : (
              <div className="d-flex align-items-center flex-column" 
              style={{ gap: "0.5rem" }}>
                <div className="d-flex align-items-center justify-content-center" 
                style={{ gap: "0.5rem" }}>
                  <Button> - </Button>
                  <span className="fs-2"> 1 In Cart </span>
                  <Button> + </Button>
                </div>
                <Button className="btn btn-danger" size="sm">Remove</Button>
              </div>
              
            )}<br></br><br></br>
            <button onClick={addToFavorites} className="btn btn-success w-100">
                Add To Favorites
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
