const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const { registerValidation } = require('../validation'); 


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
		res.send(savedUser);
	}catch(err) {
		res.status(400).send(err);
	}
});


module.exports = router;