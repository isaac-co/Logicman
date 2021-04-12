const path = require('path');

exports.getHome = (req,res)=>{
    if (req.session.loggedin) {
        res.render('userHome.html', {
            persona: req.session.username
        });
    } else {
		res.send('Please login to view this page!');
	}
};