const express = require('express');
const app = express();
const mongoose = require('mongoose');
//Import routes
const authRoutes = require('./routes/auth');

//Connection to DB
mongoose.connect('mongodb://localhost/passport',
	{ useNewUrlParser: true })
	.then(response => console.log('Database connected'))
	.catch(err => console.log(err));


//Middleware
app.use(express.json());

//Routes Middlewares
app.use('/api/user', authRoutes);

app.listen(3000, () => {
	console.log('Server on port 3000');
});