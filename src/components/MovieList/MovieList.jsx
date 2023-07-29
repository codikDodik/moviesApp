import React from 'react'
import { Spin, Alert } from 'antd'

import MovieItem from '../MovieItem/MovieItem.jsx'

import './MovieList.css'

const MovieList = (props) => {
  const { movies, loading, error, errorInfo } = props

  const elements = movies.map((el) => {
    const { movieId } = el
    return <MovieItem data={el} key={movieId} />
  })

  const hasData = !(loading || error)
  const errorMessage =
    error && !loading ? <Alert type="error" description={errorInfo} className="movies__error" /> : null
  const loader = loading && !error ? <Spin size="large" className="movies__loader" /> : null
  const content = hasData ? elements : null

  return (
    <ul className="movies__list">
      {errorMessage}
      {loader}
      {content}
    </ul>
  )
}

MovieItem.defaultProps = {
  movies: [],
  loading: false,
  error: false,
  errorInfo: '',
}

export default MovieList
