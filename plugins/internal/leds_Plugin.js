//const Gpio = require('pigpio').Gpio;
const Gpio1 = require('onoff').Gpio;
var resources = require('../../resources/model');

var model = resources.pi.actuators.leds;
var pluginName = resources.pi.actuators.leds;
var localParams = {'simulate': false, 'frequency': 2000};

exports.start = function (params) { //#A
  localParams = params;
    start_leds();
};

exports.stop = function () { //#A
    sensor.unexport();
  console.info('LEDs plugin stopped!');
};

function start_leds() { //#B
    var LED1 = new Gpio1(4, 'out'); //use GPIO pin 4, and specify that it is output
    var LED2 = new Gpio1(7, 'out'); //use GPIO pin 7, and specify that it is output
    var LED3 = new Gpio1(5, 'out'); //use GPIO pin 5, and specify that it is output
    var LED4 = new Gpio1(6, 'out'); //use GPIO pin 6, and specify that it is output
    var LED5 = new Gpio1(13, 'out'); //use GPIO pin 5, and specify that it is output
    var LED6 = new Gpio1(26, 'out'); //use GPIO pin 6, and specify that it is output
  console.info('Hardware LEDs actuator started!');
};

