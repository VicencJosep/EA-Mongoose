import mongoose from 'mongoose';
import { UserModel, IUser } from './user.js';
import { MovieModel, IMovie } from './movie.js';

async function main() {
  mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

  await mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

  const user1:  IUser = {
    "name": 'Bill',
    "email": 'bill@initech.com',
    
  };
  const user2: IUser = {
    name: 'Stan Lee',
    email: 'stan@marvel.com',
    
  };

  const user3: IUser = {
    name: 'Wachowski',
    email: 'wachowski@matrix.com',
   
  };

  const movie1: IMovie = {
    "name": 'The Matrix',
    "author": user3,
    "budget": 63000000
  };
  const movie2: IMovie = {
    "name": 'X-men',
    "author": user2,
    "budget": 63000000
  }; 
  const movie3: IMovie = {
    "name":"Jupiter Ascending",
    "author": user3,
    "budget": 176000000
  };
  const newMovie= new MovieModel(movie1);
  const newMovie2= new MovieModel(movie2);
  const newMovie3= new MovieModel(movie3);

  try {
    const movie1_2: IMovie = await newMovie.save();
    const movie2_2: IMovie = await newMovie2.save();
    const movie3_3: IMovie = await newMovie3.save();

  } catch (error) {
    console.error("Error al guardar la película:", error);
  }
  
  const newUser= new UserModel(user1);
  const newUser2= new UserModel(user2);
  const newUser3= new UserModel(user3);
  
  const user1_1: IUser = await newUser.save();
  const user2_2: IUser = await newUser2.save();
  const user3_3: IUser = await newUser3.save();
  


  

  
}

main()

    
