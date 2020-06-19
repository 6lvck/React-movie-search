/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import SkeletonCard from './skeletonCard';
import QuickNav from './quickNav';
import MovieList from './movieList';
import searchIcon from '../static/search.svg';
import githubIcon from '../static/github.svg';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      movies: [],
      error: null,
      searchText: null
    };
    this.onMostPopularClick = this.onMostPopularClick.bind(this);
    this.onUpcomingClick = this.onUpcomingClick.bind(this);
    this.onShowingClick = this.onShowingClick.bind(this);
    this.onMovieSearchSubmit = this.onMovieSearchSubmit.bind(this);
    this.onMovieSearch = this.onMovieSearch.bind(this);
  }

  componentDidMount() {
    this.onShowingClick();
  }

  onMovieSearchSubmit(e) {
    this.setState({
      ...this.state,
      loading: true
    });
    const apiKey = process.env.MDB_KEY;
    e.preventDefault();
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${this.state.searchText}`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          movies: res.data.results
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err
        });
      });
  }

  onMovieSearch(e) {
    this.setState({
      ...this.state,
      searchText: e.target.value
    });
  }

  onShowingClick() {
    const apiKey = process.env.MDB_KEY;
    this.setState({
      ...this.state,
      loading: true
    });
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          movies: res.data.results
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err
        });
      });
  }

  onMostPopularClick() {
    const apiKey = process.env.MDB_KEY;
    this.setState({
      ...this.state,
      loading: true
    });
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          movies: res.data.results
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err
        });
      });
  }

  onUpcomingClick() {
    const apiKey = process.env.MDB_KEY;
    this.setState({
      ...this.state,
      loading: true
    });
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          movies: res.data.results
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err
        });
      });
  }

  render() {
    let result;
    if (this.state.loading === true) {
      result = <SkeletonCard />;
    } else {
      result = <MovieList movies= {this.state.movies} />;
    }
    return (
        <Container>
                      <div className='nav-bar'>
                    <div className='logo'>
                        <img src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg' alt='netflix-logo' />
                    </div>
                    <Form onSubmit={this.onMovieSearchSubmit} style={{ width: '50%', textAlign: 'center' }}>
                    <img src={searchIcon} className='search-icon' alt='search-icon' />
                        <input onKeyPress={this.onMovieSearch} type='search' placeholder='search for movies' />
                    </Form>
                    <div className='code-repo'>
                    <img src={githubIcon} alt='github-logo' />
                    </div>
                    </div>
                    <QuickNav
                     showing={this.onShowingClick}
                     popular={this.onMostPopularClick}
                     upcoming={this.onUpcomingClick} />

                <div className='movies'>
                {result}
                </div>
            </Container>
    );
  }
}

export default Movies;
