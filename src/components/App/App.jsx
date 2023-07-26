import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'

import MovieList from '../MovieList'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="main__content">
        <Offline>
          <div>Ошибка: Отсутствует подключение к интернету.</div>
        </Offline>
        <Online>
          <MovieList />
        </Online>
      </div>
    )
  }
}
