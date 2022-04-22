const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `./config.env` });

process.on('uncaughtException', (err) => {
  console.log('shutting down exception error');
  console.log(err.name, err.message);

  process.exit(1);
});
const app = require('./app.js');

console.log(`${process.env.NODE_ENV} from server.js`);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// console.log(DB);

mongoose.connect(DB).then((con) => {
  console.log('I am connected');
});

// const testTour = new Tour({
//   name: 'the forest',
//   rating: 4.7,
//   price: 497,
// });
// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(err));
// const testTour2 = new Tour({ name: 'the rain', rating: 3.5, price: 310 });
// testTour2
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(err));

// {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// }

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`I am listening from port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('unhandled error');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
