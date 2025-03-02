import mongoose from 'mongoose';
import { UserModel, IUser } from './user.js';
import { MovieModel, IMovie } from './movie.js';

async function crud() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    return;
  }

  try {
    // findOne devuelve un objeto usando un filtro.
    const user1: IUser | null = await UserModel.findOne({ name: 'Bill' });
    console.log("user1", user1);

    // Partial<IUser> Indica que el objeto puede tener solo algunos campos de IUser.
    // select('name email') solo devuelve name y email.
    // lean() devuelve un objeto plano de JS en lugar de un documento de Mongoose.
    const user1_2: Partial<IUser> | null = await UserModel.findOne({ name: 'Bill' })
      .select('name email').lean();
    console.log("user1_2", user1_2);

    const aggregationResult = await MovieModel.aggregate([
      { $match: { 'author.name': 'Wachowski' } },
      { $group: { _id: '$author.name', totalBudget: { $sum: '$budget' } } }
      // { $project: { _id: 0, author: '$_id', totalBudget: 1 } }
    ]);
    console.log("aggregationResult", aggregationResult);

    // Update de la película "The Matrix" cambiando el valor del budget a "10"
    const updatedMovie = await MovieModel.findOneAndUpdate(
        { name: 'The Matrix' },
        { budget: 10 },
        { new: true }  
    );
      console.log("updatedMovie", updatedMovie);
  
      // Delete del usuario "Bill"
      const deletedUser = await UserModel.findOneAndDelete({ name: 'Bill' });
      console.log("deletedUser", deletedUser);

  } catch (error) {
    console.error("Error en la operación CRUD:", error);
  }

}

crud();

