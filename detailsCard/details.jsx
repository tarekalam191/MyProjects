import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import OneCard from "../oneCard/onecard";

function ListOneMovie() {
  const [oneData, SetOneData] = useState({});

  const param = useParams();
  const id = param.id;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=1c61f7854caf371b34a23ef611f0efed`
      )
      .then((res) => SetOneData(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <>
      <OneCard
        tittle={oneData.original_title}
        details={oneData.overview}
        ch={oneData.release_date}
        img={oneData.poster_path}
      />
    </>
  );
}
export default ListOneMovie;
