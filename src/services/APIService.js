export default class MovieService {
  _BaseURL = 'https://api.themoviedb.org/3/'
  _ApiKey = 'e6e7e6f5dbcc6335735f9e09f203c36a'

  async getResource(url) {
    const res = await fetch(`${this._BaseURL}search/movie?api_key=${this._ApiKey}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, receive ${res.status}`)
    }

    const body = await res.json()
    return body
  }

  async getAllMovies(title, page) {
    const url = `&query=${title}&include_adult=false&language=en-US&page=${page}`
    const movies = this.getResource(url)
    return movies
  }
}

// const movieService = new MovieService()

// movieService.getAllMovies('trainspotting', 1).then((res) => {
//   console.log(res)
// })
