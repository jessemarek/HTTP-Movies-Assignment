import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

const Movie = props => {

  const { addToSavedList, movieList, setMovieList } = props

  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = e => {
    e.preventDefault()
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log(res)
        setMovieList(movieList.filter(m => m.id !== params.id))
        push('/')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="edit-button" onClick={() => push(`/update-movie/${params.id}`)}>
        Edit
      </div>

      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
