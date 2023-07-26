import { Component } from 'react'
// import { Spin } from 'antd'

import './MovieList.css'
import MovieItem from '../MovieItem'

export default class MovieList extends Component {
  // state = {
  //   loading: true,
  // }

  // handleLoading() {
  //   this.setState({ loading: false })
  // }

  render() {
    // const { loading } = this.state

    // if (loading) {
    //   return <Spin />
    // }
    const movieItems = Array(6)
      .fill()
      .map((_, index = 0) => (
        <li className="movie-list__item" key={index}>
          <MovieItem result={index + 1} stopLoading={this.handleLoading} />
        </li>
      ))

    return (
      <div>
        <ul className="movie-list">{movieItems}</ul>
      </div>
    )
  }
}
