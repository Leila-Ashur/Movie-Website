import React, { useEffect, useState } from "react";
import { nowPlaying } from "../Utilis/utilitis";
import 'react-slick';
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import "./style.css";

const MovieSlider = () => {
  const [playing, setPlaying] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const playingData = await nowPlaying();
        if (playingData && playingData.result && playingData.result.length > 0) {
          setPlaying(playingData.result);
        } else {
          setError("No movies found");
        }
      } catch (error) {
        setError("Error fetching now playing movies");
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  if (loading) {
    return <h3>Loading... Movies</h3>;
  }

  return (
    <div className="sliderContainer">
      <Slider {...sliderSettings} className="container">
        {playing.length > 0 ? (
          playing.map((movie) => (
            <div
              key={movie.id}
              className="image-container"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_IMAGE_BASE_URL}${movie.poster_path})`,
              }}
            >
              <div className="details">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <div className="button">
                  <button className="btn1">Watch Now</button>
                  <button className="btn2">Add To Favourite</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>{error || "No movies found"}</h1>
        )}
      </Slider>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return <button className="custom-arrow prev-arrow" onClick={onClick}>&#10094;</button>;
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return <button className="custom-arrow next-arrow" onClick={onClick}>&#10095;</button>;
};

export default MovieSlider;
