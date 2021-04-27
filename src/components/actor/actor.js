import React, { useState, useEffect } from "react";
import {
    fetchActor,
    fetchMoviesByActor
} from "../../service/index.js";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export function Actor({ match }) {
    const params = match.params;
    console.log(params)
    const [actor, setActor] = useState([]);
    const [movieOfActor, setMovieOfActor] = useState([]);


    useEffect(() => {
        const fetchAPI = async () => {
            setActor(await fetchActor(params.id));
            setMovieOfActor(await fetchMoviesByActor(params.id));
        };

        fetchAPI();
    }, [params.id]);

    const movieList = movieOfActor.slice(0, 6).map((item, index) => {
        
        return (
            <div className="col-md-2 col-sm-6" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={`http://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title}></img>
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: "bolder" }}>{item.original_title}</p>
                    <p>Rated: {item.vote_average}</p>
                    <ReactStars
                        count={item.vote_average}
                        size={20}
                        color1={"#f4c10f"}
                    ></ReactStars>
                </div>
            </div>
        );
    });
    const img = `https://image.tmdb.org/t/p/original${actor.profile_path}`;
    return (
        <div className="container">
            <div className="row mt-3">

                <div className="col-md-3">
                    <img src={img} className="img-fluid"></img>
                </div>
                <div className="col-md-7">
                    <p style={{ color: "#5a606b", fontWeight: "bolder" }}>BIOGRAPHY</p>
                    {actor.biography}
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-3">
                    <p style={{ color: "#5a606b", fontWeight: "bolder" }}>BIRTHDAY</p>
                    <p style={{ color: "#f4c10f" }}>{actor.birthday}</p>
                </div>
                <div className="col-md-3">
                    <p style={{ color: "#5a606b", fontWeight: "bolder" }}>PLACE OF BIRTH</p>
                    <p style={{ color: "#f4c10f" }}>{actor.place_of_birth}</p>
                </div>
                <div className="col-md-3">
                    <p style={{ color: "#5a606b", fontWeight: "bolder" }}>POPULARITY</p>
                    <p style={{ color: "#f4c10f" }}>{actor.popularity}</p>
                </div>

            </div>
            <div className="row mt-7">{movieList}</div>
        </div>
    )
}