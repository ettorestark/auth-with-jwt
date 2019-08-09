const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation'); 


router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	//Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if(emailExist) return res.status(400).send('Email alreandy exists');

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword
	});
	try {
		const savedUser = await user.save();
		res.send({
			user: user._id
		});
	}catch(err) {
		res.status(400).send(err);
	}
});

//Login
router.post('/login', async (req, res) => {
	const { error } = loginValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	//Checking if the email exists
	const user = await User.findOne({ email: req.body.email });
	if(!user) return res.status(400).send('Email or password is wrong');	

	//Password is correct 
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if(!validPass) return res.status(400).send('Email or password is wrong');

	//Create and assign a token 
	const token = jwt.sign({ _id: user._id }, 'secretPassword');
	res.header('auth-token', token).send(token);
});


module.exports = router;