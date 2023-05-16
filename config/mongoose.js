const mongoose = require('mongoose');

const db = main()
.then(() => {console.log("Connected to MogoDB")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB);
}

mongoose.connection.on('disconnect', () => {
    console.log("MongoDB disconnect")
});
mongoose.connection.on('disconnect', () => {
    console.log("MongoDB disconnect")
});

module.exports = db;