import React, { Component } from 'react'

import MovieList from '../MovieList'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="main__content">
        <MovieList />
      </div>
    )
  }
}
