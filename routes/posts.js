const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
	res.json({
		post: {
			title: 'My first post',
			description: 'Lorem ipsum dolor sit amet'
		}
	});
});

module.exports = router;