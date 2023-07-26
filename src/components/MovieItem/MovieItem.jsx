import React, { Component } from 'react'
import { Spin, Alert } from 'antd'
import { parseISO, format } from 'date-fns'

import img from '../Rectangle 36.svg'
import MovieService from '../../services/APIService'

import './MovieItem.css'

const MAX_DESCRIPTION_LENGTH = 165
const DEFAULT_DESCRIPTION = 'Here is no overview for this movie'
const DEFAULT_ERROR_MESSAGE = 'Ошибка при загрузке данных. Обновите страницу и повторите попытку.'

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
    this.state = {
      loading: true,
      error: false,
      movieDetails: {
        title: null,
        date: null,
        genres: null,
        overview: null,
      },
    }
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  componentDidMount() {
    this.getFilm(this.props.result)
  }

  movieService = new MovieService()

  getFilm(index) {
    this.movieService
      .getAllMovies('fight club', 1)
      .then((body) => {
        const releaseDateMovies = body.results[index].release_date
        const formattedDate = releaseDateMovies ? format(parseISO(releaseDateMovies), 'MMMM d, y') : 'Unknown date'
        this.setState({
          loading: false,
          movieDetails: {
            title: body.results[index].original_title,
            date: formattedDate,
            genres: body.results[index].genre_ids,
            overview: body.results[index].overview,
          },
        })
        console.log(body)
      })
      .catch(this.onError)
  }

  render() {
    const { loading, error, movieDetails } = this.state
    const errorMessage = error && !loading ? <Alert type="error" message={DEFAULT_ERROR_MESSAGE} /> : null
    const spinner = loading ? <Spin className="spinner" /> : <CardView movieDetails={movieDetails} />
    const content = !(loading || error) ? <CardView movieDetails={movieDetails} /> : null
    return (
      <div>
        {spinner}
        {errorMessage}
        {content}
      </div>
    )
  }
}

const CardView = ({ movieDetails }) => {
  const { title, date, genres, overview } = movieDetails
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

export default MovieItem
