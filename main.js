
const g = 9.81;
const dt = 0.01;
function Car(car){
  var newCar = {}
  if((car.x > 14)&&(car.x < 31)){
    newCar.vx = car.vx - g*dt*(0.12 + 0.07*Math.exp(0.06*car.vx));
  }else{
    newCar.vx = car.vx - g*dt*0.7;
  }
  newCar.x = car.x + dt*car.vx;
  return newCar
}

function simulate_stop(v0, model){
    var v = [v0];
    var x = [0];
    var idx = 0;
    var mu = [];
    var t = [0];
    while (v[idx] > 0){
      if (x[idx] > 14 && x[idx] < 31 && model == 'B'){
          mu.push(0.12 + 0.07*Math.exp(0.06*v[idx]))
      }else{
          mu.push(0.7)
      }
      var newv = v[idx] - g*dt*mu[idx]
      var newx = x[idx] + dt*v[idx];
      v.push(newv);
      x.push(newx);
      t.push(idx*dt);
      idx = idx + 1;
    }
    return {t, x, v, mu}
}
var data_ab = [];
for(var i = 20; i <= 30; i += 0.1){
  var mb = simulate_stop(i, 'B');
  var ma = simulate_stop(i, 'A');
  data_ab.push({x: i, ma: ma.x[ma.x.length-1], mb: mb.x[mb.x.length-1]});
}
console.log(data_ab);

var  res1 = simulate_stop(23, 'B');
var  res2 = simulate_stop(25.6, 'A');
  var data_x = [];
  var data_v = [];
  var data_mu = [];
  for(var i in res2.t){
    data_x.push({x: res2.t[i], ma: res2.x[i], mb: res1.x[i]?res1.x[i]:null})
    data_v.push({x: res2.t[i], ma: res2.v[i], mb: res1.v[i]?res1.v[i]:null})
    data_mu.push({x: res2.x[i], ma: res2.mu[i], mb: res1.mu[i]?res1.mu[i]:null})
  }
  new Morris.Line({
    element: 'graphdiv',
    data: data_x,
    xkey: 'x',
    ykeys: ['ma', 'mb'],
    pointSize: 0,
    labels: ['Modal A', 'Modal B'],
    parseTime: false,
    xLabels: 'second',
    yLabelFormat: (y)=>{return y + ' m'}
  })
  new Morris.Line({
    element: 'graphdiv2',
    data: data_v,
    xkey: 'x',
    ykeys: ['ma', 'mb'],
    pointSize: 0,
    labels: ['Modal A', 'Modal B'],
    parseTime: false,
    xLabels: 'second',
    yLabelFormat: (y)=>{return y + ' m'}
  })
  new Morris.Line({
    element: 'graphdiv3',
    data: data_mu,
    xkey: 'x',
    ykeys: ['ma', 'mb'],
    pointSize: 0,
    labels: ['Modal A', 'Modal B'],
    parseTime: false,
    xLabels: 'second',
    smooth: false,
    yLabelFormat: (y)=>{return y + ' = mu'}
  })
  new Morris.Line({
    element: 'graphdiv4',
    data: data_ab,
    xkey: 'x',
    ykeys: ['ma', 'mb'],
    pointSize: 0,
    labels: ['Modal A', 'Modal B'],
    parseTime: false,
    xLabels: 'second',
    smooth: false,
    yLabelFormat: (y)=>{return y + ' m/s'}
  })



var count = 0;
var cars = [];
var fr = 0;
var size = 1.5;
var i1 = 20;
var i2 = 30;

iterate({x: 0, vx: (i1 + i2)/2});
 document.documentElement.style.setProperty('--factor', size);
function iterate(lastCar){
  if(lastCar.vx < 0){
    var x = lastCar.x;
    console.log(x);
    if(x > 48 + 0.01){
      i2 = (i1 + i2)/2;
      iterate({x: 0, vx: (i1 + i2)/2})
    }else if(x < 48 - 0.01){
      i1 = (i2 + i1)/2;
      iterate({x: 0, vx: (i1 + i2)/2})
    }else{
      return
    }
    console.log((i1 + i2)/2);
  }else{
    count++
    if(fr%10 == 0){
      document.getElementById('car').style.setProperty('--left-pos', lastCar.x*size +'vw');
      setTimeout(() => {
        iterate(Car(lastCar))
      }, 10);
    }else{
      iterate(Car(lastCar));
    }
  }
}
