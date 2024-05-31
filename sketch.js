let capture;
let wind
let cx, xy
let lasttouch= 0;
let frt = true;
let scl = 1


function preload(){
  wind = loadImage("win1.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  pixelDensity(1); 
   
  //if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
  //capture = createCapture(VIDEO,constraints);
  //capture = createCapture(VIDEO);
  //}else{
    // false for not mobile device
    var constraints = {
      audio: false,
           
      video: {
        facingMode: "user"
      } 
    };
   capture = createCapture(VIDEO,constraints)
 // }
  //
  //capture = createCapture(VIDEO)
  capture.size(width/10,height/5)
  capture.hide();
  
  
   
  wind.resize(0,windowHeight)
  //frameRate(1)
   
}


 

 function draw(){
  
  background(60,98,170)
 
  let cnt =windowWidth/2-wind.width/2
  push()
  if (frt) {
    scale(-1,1)
    image(capture, -cnt-wind.width/5,wind.height/6,-wind.width+wind.width/3,wind.height-wind.height/3); 
  }else{
    scale(1,1)
    image(capture, cnt-wind.width/5,wind.height/6,wind.width-wind.width/3,wind.height-wind.height/3); 

  }
  
  
  filter(POSTERIZE,3)
  pop()
  
  image(wind,cnt,0)
   

}


function touchStarted(){
  const currenttime = millis();
  const timesincelasttouch = currenttime - lasttouch;

  if (timesincelasttouch > 500) {
    if (frt){
      capture.remove();
      var constraints = {
        audio: false,
        video: {
          facingMode: {
            exact: "environment"
          }
        }    
        //video: {
          //facingMode: "user"
        //} 
      };
      capture = createCapture(VIDEO,constraints);
      capture.size(width/10,height/5)
      capture.hide();
      frt = false
      
    }else{
      capture.remove();// need to remove
      capture = createCapture(VIDEO);
      capture.size(width/10,height/5)
      capture.hide();
      frt = true
    }
  
  }

  lasttouch = currenttime;
  
}

function mouseClicked(){
  touchStarted()
}


 
 
 
