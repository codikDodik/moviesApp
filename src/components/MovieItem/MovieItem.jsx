import React, { Component } from 'react'
import { parseISO, format } from 'date-fns'

import img from '../Rectangle 36.svg'
import MovieService from '../../services/APIService'

import './MovieItem.css'

const MAX_DESCRIPTION_LENGTH = 165
const DEFAULT_DESCRIPTION = 'Here is no overview for this movie'

function formatDescription(text, limit) {
  if (text.length <= limit) {
    return text
  } else {
    text = text.slice(0, limit)
    const lastSpace = text.lastIndexOf(' ')
    if (lastSpace > 0) {
      text = text.substr(0, lastSpace)
    }
    return text + '...'
  }
}

class MovieItem extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    title: null,
    date: null,
    genres: null,
    overview: null,
  }

  componentDidMount() {
    this.getFilm(this.props.result)
  }

  movieService = new MovieService()

  getFilm(index) {
    this.movieService.getAllMovies('fight club', 1).then((body) => {
      const releaseDateMovies = body.results[index].release_date
      const formattedDate = releaseDateMovies ? format(parseISO(releaseDateMovies), 'MMMM d, y') : 'Unknown date'
      this.setState({
        title: body.results[index].original_title,
        date: formattedDate,
        genres: body.results[index].genre_ids,
        overview: body.results[index].overview,
      })
      console.log(body)
    })
  }

  render() {
    const { title, date, genres, overview } = this.state
    const text = overview ? formatDescription(overview, MAX_DESCRIPTION_LENGTH) : DEFAULT_DESCRIPTION
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
            <p className="movie-card__description">{text}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieItem
