import {useState} from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: "64462ea9a5f5577c2975ae70",
      Title: "The Lord of the Rings: The Two Towers",
      Description: "Frodo and Sam continue their journey to Mordor to destroy the One Ring, while Aragorn, Legolas, and Gimli prepare for a final battle against Saruman and his army of orcs at the fortress of Helm's Deep.",
      Genre: [
        {
          Name: "Action",
          Description: ""
        }      
      ],
      Director: {
        Name: "Peter Jackson",
        Bio: "xxx",
        Birth: "xxx",
        Death: "xxx"
      },
      ImagePath: "https://m.media-amazon.com/images/I/513N2WS7ENL._SY445_.jpg",
      Featured: false
    },
    {
      _id: "64462ea9a5f5577c2975ae74",
      Title: "Kill Bill: Vol. 1",
      Description: "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.",
      Genre: [
        {
          Name: "Action",
          Description: ""
        }
      ],
      Director: {
        Name: "Quentin Tarantino",
        Bio: "xxx",
        Birth: "xxx",
        Death: "xxx"
      },      
      ImagePath: "https://m.media-amazon.com/images/I/514W87SBYHL._SY445_.jpg",
      Featured: false
    },
    {
      _id: "64462f40a5f5577c2975ae79",
      Title: "The Hateful Eight",
      Description: "In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.",
      Genre: [
        {
          Name: "Action",
          Description: ""
        }
      ],
      Director: {
        Name: "Quentin Tarantino",
        Bio: "xxx",
        Birth: "xxx",
        Death: "xxx"
      },       
      ImagePath: "https://m.media-amazon.com/images/I/91L6M95tlKL._SL1500_.jpg",
      Featured: false
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
    );
  }

  if (movies.length === 0) {
    return (
      <div>The list is empty!</div>
    )
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard 
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          />
        )
      })}
    </div>
  );
};