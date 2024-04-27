import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MyCard from "../CARD/Card";

function ProductDetails() {
  const [oneData, setOneData] = useState({});
  const param = useParams();
  const id = param.id;

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setOneData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="row ">
      <MyCard
        md={2}
        xs={1}
        lg={4}
        key={oneData.id}
        title={oneData.original_title}
        details={oneData.overview}
        img={oneData.thumbnail}
        price={oneData.price}
        stock={oneData.stock}
        description={oneData.description}
      />
    </div>
  );
}

export default ProductDetails;
