var n = 80, lantern = [], mSize = 0, bg, crowd, people, dyuthi, logo, t = 0, wind;

function setup() {
  createCanvas(1280,720);
  mSize = width/28;
  for(var i=0;i<n;i++)
    lantern.push(new Lantern());
  for(var i=0;i<n;i++)
  {
    lantern[i].img = loadImage("data/"+int(random(4))+".png");
    lantern[i].w = (i+1)*mSize/n;
    lantern[i].vel.y = -lantern[i].w/80;

    
  }
  bg = loadImage("data/bg.png");
  people = loadImage("data/people.png");
  dyuthi = loadImage("data/dyuthi.png");
  logo = loadImage("data/logo.png")
}

function draw() {
  image(bg,0,0,width,height);
  
  var thewind = createVector(wind,0);
  var randWind = createVector(map(noise(t),0,1,-width/8000,width/8000),0);
  
  for(var i=0;i<n;i++)
  {
    lantern[i].display();
    lantern[i].upperbound();
    lantern[i].update();
  }
  
  for(var i = 0;i<n;i++)
  {
    if(i%3 == 0)
      lantern[i].applyForce(createVector(randWind.x,0));
    else
      lantern[i].applyForce(createVector(-randWind.x,0)); 
      
    wind = (mouseX - width/2)/1000;
    lantern[i].applyForce(thewind);
  }
  
  noStroke();
}

function Lantern()
{
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.w = random(0,100);
  this.v = 0;
  this.img;
  
  this.display = function() {
    image(this.img,this.pos.x, this.pos.y, this.w, this.w);
  }
  
  this.upperbound = function()
  {
    if(this.pos.y < -this.w)
      this.pos.y = height + this.w;
    if(this.pos.x>width+this.w)
      this.pos.x = -this.w
    if(this.pos.x<-this.w)
      this.pos.x = width+this.w;
  }
  
  this.update = function()
  {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    if(this.vel.x>3)
      this.vel.x = 3;
    if(this.vel.x<-3)
      this.vel.x = -3;
    this.vel.x*=0.9;
    this.acc.mult(0);
  }
  
  this.applyForce = function(x)
  {
    this.acc.add(x);
  }
  t+=0.01;
}