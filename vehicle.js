function Vehicle(x, y, r, c){
    this.pos = new p5.Vector(random(width), random(height))
    this.vel = p5.Vector.random2D()
    this.acc = new p5.Vector(0, 0)
    this.r = r
    this.target = new p5.Vector(x, y)
    this.maxSpeed = 4
    this.maxForce = 0.3
    this.c = c
}


// shows the vehicle
Vehicle.prototype.show = function(){
    fill(this.c)
    noStroke()
    rect(this.pos.x-this.r, this.pos.y-this.r, this.r*2, this.r*2)
}

// updates the vehicle's position, velocity, and acceleration
Vehicle.prototype.update = function(){
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.mult(0)
}

//applies a force to the vehicle
Vehicle.prototype.applyForce = function(f){
    // f = ma, and m = 1 so a = f
    this.acc.add(f)
}

// applies the vehicle's behaviors
Vehicle.prototype.behaviors = function(){
    // we always want to seek our target
    let seek = this.arrive(this.target)
    // "I'm afraid of the mouse!", says this.
    let mouse = new p5.Vector(mouseX, mouseY)
    let flee = this.flee(mouse)
    // scaling room {
    seek.mult(1)
    flee.mult(2)
    //              }

    // apply our forces
    this.applyForce(seek)
    if (mouseIsPressed){
        this.applyForce(flee)
    }
}

// seeks the target
Vehicle.prototype.seek = function(target){
    // get a line from us to the target, the first step of getting the
    // desired velocity
    let desired = p5.Vector.sub(target, this.pos)
    // we always want to go at our maximum speed
    desired.setMag(this.maxSpeed)
    // steering = desired - current
    desired.sub(this.vel)
    // make sure we don't apply too much force
    return desired.limit(this.maxForce)
}

// flees the target
Vehicle.prototype.flee = function(target){
    // fleeing is the opposite of seeking
    if (p5.Vector.dist(this.pos, target) < 40) {
        return this.seek(target).mult(-1)
    }
    else{
        return new p5.Vector(0, 0)
    }
}

// arrives at the target
Vehicle.prototype.arrive = function(target){
    // get a line from us to the target, the first step of getting the
    // desired velocity
    let desired = p5.Vector.sub(target, this.pos)
    // we always want to go at our maximum speed, except for if we're
    // inside a perception radius
    let speed = this.maxSpeed
    if (desired.mag() < 50){
        speed = map(desired.mag(), 0, 50, 0, this.maxSpeed)
    }
    desired.setMag(speed)
    // steering = desired - current
    desired.sub(this.vel)
    // make sure we don't apply too much force
    return desired.limit(this.maxForce)
}

// wraps around the edges
Vehicle.prototype.edges = function(){
    if (this.pos.x - this.r < 0) {
        this.pos.x = width - this.r
    } if (this.pos.x + this.r > width) {
        this.pos.x = this.r
    }

    if (this.pos.y + this.r > height) {
        this.pos.y = this.r
    } if (this.pos.y - this.r < 0) {
        this.pos.y = height - this.r
    }
}