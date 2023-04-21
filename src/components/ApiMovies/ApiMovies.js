export default class ApiMovies {
  _baseUrl = 'https://api.themoviedb.org/3/search/movie'
  _apiKey = 'a0ebd979d0247d439d1914491e74f506'
  _language = 'en-US'

  async getResource(url, headers) {
    const res = await fetch(url, { headers })
    if (!res.ok) {
      throw new Error(`Couldnt fetch ${url}, recieved ${res.status}`)
    }
    return await res.json()
  }

  async getAllMovies(queryString = '', currentPage = 1, headers) {
    const url = new URL(this._baseUrl)
    url.searchParams.set('api_key', this._apiKey)
    url.searchParams.set('language', this._language)
    url.searchParams.set('query', queryString)
    url.searchParams.set('page', currentPage)
    url.searchParams.set('include_adult', false)

    const res = await this.getResource(url.toString(), headers).catch((err) => {
      console.error('Status: ', err.status, ' Error:', err)
    })

    let { results, total_results } = res
    let returnArr = results.filter((item) => item.poster_path)
    returnArr.forEach((item) => {
      item['rated'] = 0
      return item
    })

    return { returnArr: returnArr, totalItems: total_results }
  }
}
