class apiMovies {
  async getResource(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Couldnt fetch ${url}, recieved ${res.status}`)
    }
    return await res.json()
  }

  async getAllMovies(queryString = '', currentPage = 1) {
    const _baseUrl =
      'https://api.themoviedb.org/3/search/movie?api_key=a0ebd979d0247d439d1914491e74f506&language=en-US&query='
    const res = await this.getResource(`${_baseUrl}${queryString}&page=${currentPage}&include_adult=false`).catch(
      (err) => {
        console.error(' Status: ', err.status, ' Error:', err)
      }
    )
    let { results, total_results } = res
    let returnArr = results.filter((item) => item.poster_path)
    return { returnArr: returnArr, totalItems: total_results }
  }
}

export default apiMovies
