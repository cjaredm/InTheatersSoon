import keys from "../../.env";

export const urls = {
  OMDB: `http://www.omdbapi.com/?apikey=${keys.OMDBkey}&`,
  OMDBkey: keys.OMDBkey,
  TMDB: "https://api.themoviedb.org/3",
  TMDBkey: keys.TMDBkey,
  TMDB_apiKey: `api_key=${keys.TMDBkey}`,
  TMDB_config: "https://api.themoviedb.org/3/configuration",
  youtubeVideo: "https://www.youtube.com/watch?v=",
  youtubeEmbed: "https://www.youtube.com/embed/"
};

const titleTransformer = title => title.replace(/ +/g, "%20");

export const api = {
  async configuration() {
    return await fetch(`${urls.TMDB_config}?${urls.TMDB_apiKey}`).then(
      response => response.json()
    );
  },
  async upcoming(page = 1) {
    return await fetch(
      `${urls.TMDB}/movie/upcoming?page=${page}&language=en-US&${
        urls.TMDB_apiKey
      }`
    ).then(response => response.json());
  },
  searchMovies(searchValue) {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?${
        urls.TMDB_apiKey
      }&language=en-US&query=${titleTransformer(searchValue)}&page=1`
    ).then(response => response.json());
  },
  getSelectedMovie(id) {
    return fetch(
      `${urls.TMDB}/movie/${id}?${urls.TMDB_apiKey}&language=en-US`
    ).then(response => response.json());
  },
  getMovieTrailers(id) {
    return fetch(
      `${urls.TMDB}/movie/${id}/videos?${urls.TMDB_apiKey}&language=en-US`
    ).then(response => response.json());
  }
};
