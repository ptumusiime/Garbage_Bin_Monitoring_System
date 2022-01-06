var express = require('express'),
router = express.Router(),
resources = require('./../resources/model.js');

router.route('/').get(function(req,res,next)
{
    res.send(resources.pi.sensors);
});

router.route('/').get(function(req,res,next)
{
    res.send(resources.pi.sensors);
});

module.exports = router;
