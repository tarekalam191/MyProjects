
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { RemoveFromFavorites } from "../Store/action";
import MyCard from "../CARD/Card";
import MyTitle from "./MyTitle";

function Favorites() {
  const [favData, setFavData] = useState([]);
  const param = useParams();
  const id = param.id; 
  const dispatch = useDispatch();
  const Products_Id = useSelector((state) => state.Favo_Of_P);

  useEffect(() => {
    const fetchProducts = async () => {
      
      const products = [];
    
      if (Array.isArray(Products_Id)) {
        for (const id of Products_Id) {
          try {
            const res = await axios.get(`https://dummyjson.com/products/${id}`);
            products.push(res.data);
          } catch (error) {
            console.error(`Error Fetching Product With ID ${id}:`, error);
          }
        }
        setFavData(products);
      } else {
        console.error('Products_Id is not an array');
      }
    };
    fetchProducts();
  }, [Products_Id]); 

  const removeProductFromFavorites = (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this item from the Favorites?");
    if (confirmed) {
      dispatch(RemoveFromFavorites(id));
    }
  };

  return (
    <>
      {favData.length === 0 && <MyTitle textColor="primary" testTitle="No products In Favorites"></MyTitle>}
      <div className="container-fluid bg-white">
        {favData.map((product, index) => (
          <Row key={index} className="mb-3">
            {[0, 1, 2, 3].map((colIndex) => {
              const dataIndex = index * 4 + colIndex;
              const currentProduct = favData[dataIndex];
              if (!currentProduct) return null; 
              return (
                <Col key={currentProduct.id} md={3}>
                  <MyCard
                    img={currentProduct.thumbnail}
                    title={currentProduct.original_title}
                    details={currentProduct.overview}
                    id={currentProduct.id}
                    price={currentProduct.price}
                    stock={currentProduct.stock}
                    description={currentProduct.description}
                  />
                  <Button onClick={() => removeProductFromFavorites(currentProduct.id)} style={{ width: "100%" }} className="btn btn-danger mt-2">Remove</Button>
                </Col>
              );
            })}
          </Row>
        ))}
      </div>
    </>
  );
}

export default Favorites;
