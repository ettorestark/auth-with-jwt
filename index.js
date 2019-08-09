const express = require('express');
const app = express();
const mongoose = require('mongoose');
//Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//Connection to DB
mongoose.connect('mongodb://localhost/passport',
	{ useNewUrlParser: true })
	.then(response => console.log('Database connected'))
	.catch(err => console.log(err));


//Middleware
app.use(express.json());

//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => {
	console.log('Server on port 3000');
});