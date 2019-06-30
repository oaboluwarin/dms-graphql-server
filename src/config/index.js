import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const url = `mongodb://localhost:27017/${process.env.DB_NAME}`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.once('open', () => {
  console.log(`Connected to mongo at ${url}`);
});
