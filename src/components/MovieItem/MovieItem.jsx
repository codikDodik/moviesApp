import React, { Component } from 'react'
import { parseISO, format } from 'date-fns'

import img from '../Rectangle 36.svg'
import MovieService from '../../services/APIService'

import './MovieItem.css'

class MovieItem extends Component {
  state = {
    title: null,
    date: null,
    genres: null,
    overview: null,
  }

  componentDidMount() {
    this.getFilm()
  }

  movieService = new MovieService()

  getFilm() {
    this.movieService.getAllMovies('fight club', 1).then((body) => {
      const releaseDateMovies = body.results[0].release_date
      const formattedDate = releaseDateMovies ? format(parseISO(releaseDateMovies), 'MMMM d, y') : 'Unknown date'
      this.setState({
        title: body.results[0].original_title,
        date: formattedDate,
        genres: body.results[0].genre_ids,
        overview: body.results[0].overview,
      })
      console.log(body)
    })
  }

  render() {
    const { title, date, genres, overview } = this.state
    return (
      <div className="movie-card">
        <div className="movie-card__details">
          <img className="movie-card__poster" src={img} alt="Movie Poster" />
          <div className="movie-card__info">
            <h3 className="movie-card__title">{title}</h3>
            <p className="movie-card__date">{date} </p>
            <p className="movie-card__genre">
              {genres &&
                genres.map((genre, index) => (
                  <span className="genre__item" key={index}>
                    {genre}
                  </span>
                ))}
            </p>
            <p className="movie-card__description">{overview}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieItem
