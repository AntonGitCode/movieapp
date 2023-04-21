const BASE_URL = 'https://api.themoviedb.org/3'

export default class GetGenres {
  _genreUrl = '/genre/movie/list'

  async getResource(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Couldnt get SESSION while fetching: ${url}, recieved ${res.status}`)
    }
    return await res.json()
  }
  async getGenres() {
    let genres
    try {
      const genreUrl = new URL(`${BASE_URL}${this._genreUrl}`)
      genreUrl.searchParams.set('api_key', 'a0ebd979d0247d439d1914491e74f506')
      genreUrl.searchParams.set('language', 'en-US')
      genres = await this.getResource(genreUrl.toString())
      if (!genres) throw new Error('Failed to get genres')
    } catch (error) {
      console.error('Status: ', error.status, ' Error:', error)
    }
    return genres
  }
}
