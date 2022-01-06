var express = require('express'),
router = express.Router(),
resources = require('./../resources/model.js');

router.route('/').get(function(req,res,next)
{
    res.send(resources.pi.actuators);
});

router.route('/').get(function(req,res,next)
{
    res.send(resources.pi.actuators.leds);
});

module.exports = router;
