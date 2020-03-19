class Pendulum{
  constructor(radius, mass, initial_velocity){
    this.r = radius;
    this.m = mass;
    this.v1 = initial_velocity;
    this.v2 = 0;
    this.direction = this.v1> 0?1:-1;
    this.theta1 = this.direction*0.01;
    this.theta2 = 0;
    this.g = -9.81;
    console.log(this);
  }
  itterate(dt){
    var sin = Math.sin(this.theta1);
    this.v2 = this.v1 + this.m*this.g*sin*dt;

    var a = Math.cos(this.theta1) + (Math.pow(this.v1, 2) - Math.pow(this.v2, 2))/(2*this.g*this.r);
    //Weird case when it switches direction so this fixes is it
    if(a > 1){
      this.direction *= -1;
      this.theta2 = this.direction*0.009;
    }else{
      this.theta2 = this.direction*Math.acos(a);
    }
    this.theta1 = this.theta2;
    this.v1 =  this.v2;
    return this.theta2
  }
}
class Ball{
  constructor(g){
    this.ginit = g;
    this.g = this.ginit;
    this.v = 0;
    this.x = 0;
  }
  itterate(dt){
    this.v += this.g*dt;
    if(this.x + this.v*dt < 0){
      this.x = 0;
      if(Math.abs(this.v) < 0.1){
        this.g = 0;
      }else{
        this.g = this.ginit;
      }
      this.v *= -0.7;
    }else{
      this.g = this.ginit;
      this.x += this.v*dt;
    }
    return this.x
  }
}

function runForever(dt, call){
  setTimeout(() => {
    call();
    runForever(dt, call);
  }, dt)
}
Math.sin(-0.0225)
var tyreSwing = new Pendulum(4, 30, 4);
var ball = new Ball(-5);


console.log(Math.sin(0.1));
runForever(10, () => {
  var theta = tyreSwing.itterate(0.0005);
  var r = ball.itterate(0.1);
  // console.log(r);
  theta *= 180/Math.PI;
  document.getElementById('rope').style.setProperty('--theta', theta + 'deg');
  document.getElementById('rope').style.setProperty('--r', r*10 + 'px');
})
document.body.addEventListener('click', () => {
  tyreSwing.v1 *= -1;
  console.log('x');
})
function bounce(){
  // tyreSwing.v1 *= -1;
  ball.v = 12;
}

if (!navigator.getUserMedia) navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||  navigator.mozGetUserMedia || navigator.msGetUserMedia;

if (navigator.getUserMedia){
  navigator.getUserMedia({audio:true},
    function(stream) {
      var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        microphone_stream = audioCtx.createMediaStreamSource(stream)
        biquadFilter = audioCtx.createBiquadFilter();
        biquadFilter.frequency = 80;
        var analyser = audioCtx.createAnalyser();
        microphone_stream.connect(biquadFilter);
        biquadFilter.connect(analyser)

        // ...

        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        // Get a canvas defined with ID "oscilloscope"
        var canvas = document.getElementById("oscilloscope");
        var canvasCtx = canvas.getContext("2d");

        // draw an oscilloscope of the current audio source
        var lastSum = 0;
        function draw() {

          requestAnimationFrame(draw);

          analyser.getByteTimeDomainData(dataArray);

          canvasCtx.fillStyle = "rgb(0, 0, 0)";
          canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

          canvasCtx.lineWidth = 5;
          canvasCtx.strokeStyle = "rgb(168, 103, 219)";

          canvasCtx.beginPath();

          var sliceWidth = canvas.width * 1.0 / bufferLength;
          var x = 0;
          var sum = 0;
          for (var i = 0; i < bufferLength; i++) {
            sum += Math.pow(dataArray[i] -128, 2);
            var v = dataArray[i] / 128.0;
            var y = v * canvas.height / 2;

            if (i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
          }
          sum = Math.sqrt(sum/bufferLength);
          if(Math.abs(sum - lastSum)*5 > 80){
            console.log(Math.abs(sum - lastSum)*5);
            bounce()
          }
          var size = (90 + sum*5);
          document.getElementById('tyre').style.setProperty('--size', size + 'px');

          lastSum = sum;
          canvasCtx.lineTo(canvas.width, canvas.height / 2);
          canvasCtx.stroke();
        }

        draw();
    },
    function(e) {
      alert('Error capturing audio.');
    }
  );
} else { alert('getUserMedia not supported in this browser.'); }


// var audioContext = new AudioContext();
// analyserNode = audioContext.createAnalyser()
// analyserNode.fftSize = 2048;
// var buffLength = 100;
// var buff = new Unit8Array(buffLength);
// console.log("audio is starting up ...");
//
// var BUFF_SIZE = 16384;
//
// var audioInput = null,
//     microphone_stream = null,
//     gain_node = null,
//     script_processor_node = null,
//     script_processor_fft_node = null,
//     biquadFilter = null,
//     analyserNode = null;
//
// if (!navigator.getUserMedia)
//         navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
//                       navigator.mozGetUserMedia || navigator.msGetUserMedia;
//
// if (navigator.getUserMedia){
//
//     navigator.getUserMedia({audio:true},
//       function(stream) {
//           start_microphone(stream);
//       },
//       function(e) {
//         alert('Error capturing audio.');
//       }
//     );
//
// } else { alert('getUserMedia not supported in this browser.'); }
//
//
//
// function start_microphone(stream){
//
//   gain_node = audioContext.createGain();
//   biquadFilter = audioContext.createBiquadFilter();
//   analyserNode.getByteTimeDomainData(buff);
//
//   microphone_stream = audioContext.createMediaStreamSource(stream);
//   microphone_stream.connect(biquadFilter);
//   biquadFilter.connect(analyserNode);
// }
