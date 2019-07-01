import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.once('open', () => {
  console.log(`...Connected to mongo at ${url}`);
});
