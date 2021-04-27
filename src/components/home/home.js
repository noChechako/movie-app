import React, { useState, useEffect } from "react";
import {
    fetchMovies,
    fetchGenre,
    fetchMovieByGenre,
    fetchPersons,
    fetchTopratedMovie,
    fetchByEntry
} from "../../service/index.js";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

let incMovies = 0;
let incPersons = 0;
let incTopMovie = 0;
let genreId;
export function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');







    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre(28));
            setPersons(await fetchPersons(incPersons));
            setTopRated(await fetchTopratedMovie(incTopMovie));

        };

        fetchAPI();
    }, []);
    const handleGenreClick = async (genre_id) => {
        genreId = genre_id;
        incMovies = 0;
        setSearchTerm('');
        setMovieByGenre(await fetchMovieByGenre(genre_id, incMovies, false));
    };
    const movies = nowPlaying.slice(0, 10).map((item, index) => {
        return (
            <div style={{ height: 500, width: "100%" }} key={index}>
                <div className="carousel-center">
                    <Link to={`/movie/${item.id}`}>
                        <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
                    </Link>
                </div>

                <div
                    className="carousel-caption"
                    style={{ textAlign: "center", fontSize: 35 }}
                >
                    {item.title}
                </div>
            </div>
        );
    });
    const genreList = genres.map((item, index) => {
        return (
            <li className="list-inline-item" key={index}>
                <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => {
                        handleGenreClick(item.id);
                    }}
                >
                    {item.name}
                </button>
            </li>
        );
    });

    const movieList = () => movieByGenre.map((item, index) => {
        if(!item.poster)
        item.poster=`https://image.tmdb.org/t/p/original/${item.poster_path}`
        return (
            <div className="col-md-3 col-sm-6" key={index}>

                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}></img>
                    </Link>

                </div>

                <div className="mt-3">
                    <p style={{ fontWeight: "bolder" }}>{item.title}</p>
                    <p>Rated: {item.rating}</p>
                    <ReactStars
                        count={item.rating}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    ></ReactStars>
                </div>
            </div>
        );
    });

    const trendingPersons = () => persons.map((p, i) => {
        return (
            <div className="col-md-3 text-center" key={i}>
                <img
                    className="img-fluid rounded-circle mx-auto d-block"
                    src={p.profileImg}
                    alt={p.name}
                ></img>
                <p className="font-weight-bold text-center">{p.name}</p>
                <p
                    className="font-weight-light text-center"
                    style={{ color: "#5a606b" }}
                >
                    Trending for {p.known}
                </p>
            </div>
        );
    });

    const topRatedList = () => topRated.map((item, index) => {
        return (
            <div className="col-md-3" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}></img>
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: "bolder" }}>{item.title}</p>
                    <p>Rated: {item.rating}</p>
                    <ReactStars
                        count={item.rating}
                        size={20}
                        color1={"#f4c10f"}
                    ></ReactStars>
                </div>
            </div>
        );
    });
    let fl=false
    async function changeMovies(e) {
        incMovies !== 16 ? incMovies += 4 : incMovies = 0
        incMovies===0 ? fl=true : fl=false;
        e.preventDefault();
        setMovieByGenre(await fetchMovieByGenre(genreId, incMovies, fl, searchTerm));
        console.log(movieByGenre)

    }
    async function changePersons(e) {
        incPersons !== 16 ? incPersons += 4 : incPersons = 0
        e.preventDefault();
        setPersons(await fetchPersons(incPersons));
    }
    async function changeIncTopMovie(e) {
        incTopMovie !== 16 ? incTopMovie += 4 : incTopMovie = 0
        e.preventDefault();
        setTopRated(await fetchTopratedMovie(incTopMovie));
    }
    async function handleSearch(e) {
        incMovies=0;
        e.preventDefault();
        console.log(searchTerm)
        setMovieByGenre(await fetchMovieByGenre(incMovies,2 ,false ,searchTerm))
    }
    const handleChangeSearch = (e) => {
        setSearchTerm(e.target.value);
    }
    return (

        <div className="container">
            <div className="row mt-2">
                <div className="col">

                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slidesshowSpeed={2000}
                        version={4}
                    // indicators={false}
                    >

                        {movies}
                    </RBCarousel>
                </div>
            </div>
            <form onSubmit={handleSearch}>
            <div className="input-group mb-3">
                <div class="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1" >&#128270;</span>
                </div>
                
                <input type="text" id="search" value={searchTerm} onChange={handleChangeSearch} className="form-control"  placeholder="Search movie"  />
            </div>
            </form>
            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">{genreList}</ul>
                </div>
            </div>
           
            <div className="row mt-3">
                <div className="col">
                    <div className="float-right" onClick={changeMovies}>
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{movieList(incMovies)}</div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{ color: "#5a606b" }}>
                        TRENDING ACTORS ON THIS WEEK
          </p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    {/* <div className="float-left" onClick={changePersons}>
                        <i className="far fa-arrow-alt-circle-left"></i>
                    </div> */}
                    <div className="float-right" onClick={changePersons}>
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{trendingPersons()}</div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{ color: "#5a606b" }}>
                        TOP RATED MOVIES
          </p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right" onClick={changeIncTopMovie}>
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{topRatedList()}</div>
        </div>
    );
}