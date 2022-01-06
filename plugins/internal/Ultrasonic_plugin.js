const Gpio = require('pigpio').Gpio;
const Gpio1 = require('onoff').Gpio;
var resources = require('../../resources/model');
//var LEDs = require('./leds_Plugin')

//LED's 
var LED1 = new Gpio1(4, 'out'); //use GPIO pin 4, and specify that it is output
var LED2 = new Gpio1(7, 'out'); //use GPIO pin 7, and specify that it is output
var LED3 = new Gpio1(5, 'out'); //use GPIO pin 5, and specify that it is output
var LED4 = new Gpio1(6, 'out'); //use GPIO pin 6, and specify that it is output
var LED5 = new Gpio1(13, 'out'); //use GPIO pin 5, and specify that it is output
var LED6 = new Gpio1(26, 'out'); //use GPIO pin 6, and specify that it is output

//The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;

//Sensors
const echo1 = new Gpio(24, {mode: Gpio.INPUT, alert: true});
const trigger1 = new Gpio(23, {mode: Gpio.OUTPUT});
const trigger2 = new Gpio(12, {mode: Gpio.OUTPUT});
const echo2 = new Gpio(16, {mode: Gpio.INPUT, alert: true});
const trigger3 = new Gpio(27, {mode: Gpio.OUTPUT});
const echo3 = new Gpio(17, {mode: Gpio.INPUT, alert: true});
//Sensors

//var model = resources.pi.sensors.distance.ultrasonic_1;
var pluginName_1 = resources.pi.sensors.distance.ultrasonic_1.name;
var pluginName_2 = resources.pi.sensors.distance.ultrasonic_2.name;
var pluginName_3 = resources.pi.sensors.distance.ultrasonic_3.name;
var localParams = {'simulate': false, 'frequency': 2000};


exports.start_1 = function (params) { //#A
  localParams = params;
  if (localParams.simulate) {
    simulate();
  } else {
    connectHardware_1();
  }
};
exports.start_2 = function (params) { //#A
  localParams = params;
  if (localParams.simulate) {
    simulate();
  } else {
    connectHardware_2();
  }
};

exports.start_3 = function (params) { //#A
  localParams = params;
  if (localParams.simulate) {
    simulate();
  } else {
    connectHardware_3();
  }
};

exports.stop_1 = function () { //#A
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    sensor.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

exports.stop_2 = function () { //#A
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    sensor.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

exports.stop_3 = function () { //#A
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    sensor.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

function connectHardware_1() { //#B
trigger1.digitalWrite(0); // Make sure trigger is low
  console.info('Hardware %s sensor started!', pluginName_1);
  showValue_1()
};

function connectHardware_2() { //#B
  trigger2.digitalWrite(0); // Make sure trigger is low
    console.info('Hardware %s sensor started!', pluginName_2);
    showValue_2()
  };

  
function connectHardware_3() { //#B
  trigger2.digitalWrite(0); // Make sure trigger is low
    console.info('Hardware %s sensor started!', pluginName_2);
    showValue_3()
  };

function simulate() { //#E
  interval = setInterval(function () {
  }, localParams.frequency);
  console.info('Simulated %s sensor started!', pluginName_1);
};

//Sensor 1

const showValue_1 = () => {
  let startTick;
  echo1.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      const distance = diff / 2 / MICROSECDONDS_PER_CM;
      if(distance <= 3)
      {
        LED1.writeSync(1); //turn on LED 1 if PIR Value is true
        resources.pi.actuators.leds.led_1.value = true;
        LED2.writeSync(0); //turn off LED 2 if PIR Value is true
         resources.pi.actuators.leds.led_2.value = false;
        console.log("Garbage BinCompartment 1 is Full")
       // console.log(distance + " cm");
       resources.pi.sensors.distance.ultrasonic_1.value=distance;
     } else
          {
         LED1.writeSync(0); //turn off LED 1 if PIR Value is false
             resources.pi.actuators.leds.led_1.value = false;
          LED2.writeSync(1); //turn on LED 2 if PIR Value is false
            resources.pi.actuators.leds.led_2.value = true;
            console.log("Garbage Bin compartment 1 is Empty")
            //console.log(distance + " cm");
            resources.pi.sensors.distance.ultrasonic_1.value=distance;
          }
      //console.log(distance + " cm");
    }
  });
};


//Sensor 2

const showValue_2 = () => {
  let startTick;
  echo2.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      const distance = diff / 2 / MICROSECDONDS_PER_CM;
      if(distance <= 3)
      {
        LED3.writeSync(1); //turn on LED 4 if Distance Value less or equal to 3cm
        resources.pi.actuators.leds.led_3.value = true;
        LED4.writeSync(0); //turn on off LED 3 if Distance Value less or equal to 3cm
         resources.pi.actuators.leds.led_4.value = false;
        console.log("Garbage Bin Compartment 2 is Full")
       // console.log(distance + " cm");
       resources.pi.sensors.distance.ultrasonic_2.value=distance;
     } else
          {
         LED3.writeSync(0); 
             resources.pi.actuators.leds.led_3.value = false;
          LED4.writeSync(1); 
            resources.pi.actuators.leds.led_4.value = true;
            console.log("Garbage Bin Compartment 2 is Empty")
            //console.log(distance + " cm");
            resources.pi.sensors.distance.ultrasonic_2.value=distance;
          }
      //console.log(distance + " cm");
    }
  });
};

const showValue_3 = () => {
  let startTick;
  echo3.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      const distance = diff / 2 / MICROSECDONDS_PER_CM;
      if(distance <= 3)
      {
        LED5.writeSync(1); //turn on LED 5 if Distance Value less or equal to 3cm
        resources.pi.actuators.leds.led_5.value = true;
        LED6.writeSync(0); //turn on off LED 6 if Distance Value less or equal to 3cm
         resources.pi.actuators.leds.led_6.value = false;
        console.log("Garbage Bin Compartment 3 is Full")
       // console.log(distance + " cm");
       resources.pi.sensors.distance.ultrasonic_3.value=distance;
     } else
          {
         LED5.writeSync(0); 
             resources.pi.actuators.leds.led_5.value = false;
          LED6.writeSync(1); 
            resources.pi.actuators.leds.led_6.value = true;
            console.log("Garbage Bin Compartment 3 is Empty")
            //console.log(distance + " cm");
            resources.pi.sensors.distance.ultrasonic_3.value=distance;
          }
      //console.log(distance + " cm");
    }
  });
};

setInterval(() => {
  trigger1.trigger(10, 1); // Set trigger high for 10 microseconds
  trigger2.trigger(10, 1); // Set trigger high for 10 microseconds
  trigger3.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);



function exit(err) {
  if (err) console.log('An error occurred: ' + err);
  //watchHCSR04.unexport();
  LED1.writeSync(0); // Turn LED 1 off
  LED1.unexport(); // Unexport LED GPIO to free resources
  LED2.writeSync(0); // Turn LED 2 off
  LED2.unexport(); // Unexport LED GPIO to free resources
  LED3.writeSync(0); // Turn LED 2 off
  LED3.unexport(); // Unexport LED GPIO to free resources
  LED4.writeSync(0); // Turn LED 2 off
  LED4.unexport(); // Unexport LED GPIO to free resources
  // LED5.writeSync(0); // Turn LED 2 off
  // LED5.unexport(); // Unexport LED GPIO to free resources
  // LED6.writeSync(0); // Turn LED 2 off
  // LED6.unexport(); // Unexport LED GPIO to free resources
  console.log('Bye, bye!');
  process.exit();
}
process.on('SIGINT', exit);