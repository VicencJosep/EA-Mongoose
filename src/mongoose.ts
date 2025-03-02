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
    "avatar": 'https://i.imgur.com/dM7Thhn.png'
  };



  const movie1: IMovie = {
    "name": 'The Matrix',
    "author": 'Wachowski',
    "budget": 63000000
  };
  const movie1_2: IMovie = {
    "name": 'X-men',
    "author": 'Stan Lee',
    "budget": 63000000
  }; 
  const movie1_3: IMovie = {
    "name":"Jupiter Ascending",
    "author": 'Wachowski',
    "budget": 176000000
  };
  const newMovie= new MovieModel(movie1);
  const newMovie2= new MovieModel(movie1_2);
  const newMovie3= new MovieModel(movie1_3);

  try {
    const movie2: IMovie = await newMovie.save();
    const movie3: IMovie | null = await MovieModel.findById(movie2._id);
    console.log("movie3",movie3);

  } catch (error) {
    console.error("Error al guardar la película:", error);
  }
  const movie2_2: IMovie = await newMovie2.save();
  const movie2_3: IMovie = await newMovie3.save();



 
  const newUser= new UserModel(user1);
  
  const user2: IUser = await newUser.save();
  

  // findById devuelve un objeto usando el _id.
  const user3: IUser | null = await UserModel.findById(user2._id);
  console.log("user3",user3);

  // findOne devuelve un objeto usando un filtro.
  const user4: IUser | null = await UserModel.findOne({name: 'Bill'});
  console.log("user4",user4);

  // Partial<IUser> Indica que el objeto puede tener solo algunos campos de IUser.
  // select('name email') solo devuelve name y email.
  // lean() devuelve un objeto plano de JS en lugar de un documento de Mongoose.
  const user5: Partial<IUser> | null  = await UserModel.findOne({ name: 'Bill' })
    .select('name email').lean();
  console.log("user5",user5);

  try {
    const aggregationResult = await MovieModel.aggregate([
      { $match: { author: 'Wachowski' } },
      { $group: { _id: '$author', totalBudget: { $sum: '$budget' } } }
      //{ $project: { _id: 0, author: '$_id', totalBudget: 1 } }
    ]);
    console.log("aggregationResult", aggregationResult);
  } catch (error) {
    console.error("Error en la agregación:", error);
  }


  
}

main()

    
