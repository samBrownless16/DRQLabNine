import React from 'react';
import '../App.css';
import axios from 'axios';

export class Edit extends React.Component {
    constructor() {
        super();
        this.onChangeMovieTitle = this.onChangeMovieTitle.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            Title:'',
            Year:'',
            Poster:''
        }
    }
   
    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get('http://localhost:4000/api/movies/' + this.props.match.params.id)
        .then(response => {
            this.setState({ // This will populate the input fields with the current movie data
                _id:response.data._id,
                Title:response.data.Title,
                Year:response.data.Year,
                Poster:response.data.Poster

            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // onChange events which will update data if/when changed using the form
    onChangeMovieTitle(e){
        this.setState({
            Title:e.target.value
        })
    }
    onChangeMovieYear(e){
        this.setState({
            Year:e.target.value
        })
    }
    onChangeMoviePoster(e){
        this.setState({
            Poster:e.target.value
        })
    }
    onSubmit(e){
        alert("Movie Added " + this.state.Title + " " + this.state.Year + " " + this.state.Poster);
        
        // Set object with the data user entered via the form
        const newMovie = {
            Title: this.state.Title,
            Year: this.state.Year,
            Poster: this.state.Poster,
            _id: this.state._id
        }
        
        // put request (send our edited movie data)
        axios.put('http://localhost:4000/api/movies/' + this.state._id, newMovie)
        .then(response => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <div className="App">
                <h1>This is my Create component</h1>
                {/* Form which allows user to enter movie information */}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Movie Title: </label>
                        <input type="text" className="form-control" value={this.state.Title} onChange={this.onChangeMovieTitle}></input>
                    </div>                    
                    <div className="form-group">
                        <label>Add Movie Year: </label>
                        <input type="text" className="form-control" value={this.state.Year} onChange={this.onChangeMovieYear}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Movie Poster: </label>
                        <input type="text" className="form-control" value={this.state.Poster} onChange={this.onChangeMoviePoster}></input>
                    </div>
                    <div>
                        <input type="submit" value="Edit Movie"></input>
                    </div>
                </form>
            </div>
        );
    }
}
