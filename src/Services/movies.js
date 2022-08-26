import React from "react";
import axios from "axios";

const GetAPI = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/movie/popular?api_key=418ec1cf92b78283099a434959d28a2b&language=pt-BR&page=1"
});

export default class Movies extends React.Component {
  state = {
    movies: [],
    filteredMovies: []
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const answer = await GetAPI.get();
    console.log(answer);
    const onlyMovies = answer.data.results.map((item) => {
      return {
        ...item
      };
    });

    this.setState({
      movies: onlyMovies
    });

    console.log(this.state.movies);
  };

  handleChange = (event) => {
    const filter = this.state.movies.filter((item) => {
      if (
        item.original_title
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        return true;
      } else {
        return "";
      }
    });
    this.setState({ filteredMovies: filter });
    if (event.target.value === "") {
      this.setState({ filteredMovies: [] });
    }
  };

  render() {
    return (
      <div>
        <input onChange={this.handleChange} />
        {this.state.filteredMovies.map((item) => (
          <section>
            <ul>
              <li>{item.title}</li>
              <li>{item.overview}</li>
              <li>{item.original_language}</li>
            </ul>

            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />
            </figure>
          </section>
        ))}
      </div>
    );
  }
}
