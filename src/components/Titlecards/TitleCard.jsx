import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCard = ({ title, category }) => {
  // horizontally scrollabale cards

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  // api
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmZlZDFhM2U3MjdmNjA4MzI4OTEwM2UzOGJhZTU0NCIsIm5iZiI6MTcyNzQ0MjYyMS4yMzAxMDksInN1YiI6IjY2ZjZhZDA1YjlmZDI3NjI3OTUwYzFmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DxvQjvozoMTV8_n9FTgTkpB-u0wX3-1ofFDIJqL0VAI",
    },
  };

  // till here
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  });

  // till here

  return (
    <div className="title-cards">
      <h1>{title ? title : "Popular on Netflix"}</h1>
      <div className="card-list" ref={cardsRef}>
        {/* from this api data we are displaing movie img and name */}
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCard;
