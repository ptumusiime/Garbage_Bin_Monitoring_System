var httpsServer = require('./servers/http'),
resources = require('./resources/model');

var server = httpsServer.listen(resources.pi.port,function()
{
    console.info('The pi is up and running on port %s',
    resources.pi.port);
});

// var ledsPlugin = require('./plugins/internal/leds_Plugin');
// ledsPlugin.start({'frequecy': 2000})
var UltrasonicPlugin = require('./plugins/internal/Ultrasonic_plugin');
UltrasonicPlugin.start_1({'simulate':false,'frequency': 2000});
UltrasonicPlugin.start_2({'simulate':false,'frequency': 2000});
UltrasonicPlugin.start_3({'simulate':false,'frequency': 2000});
