const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.redirect("/admin/tickets"); 
});

app.use('/admin', adminRoutes);

app.use(errorController.get404);

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong");
})

mongoose
  .connect(
    'mongodb+srv://mzh200861:moonface@cluster0.xczko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true }
  )
  .then(result => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
