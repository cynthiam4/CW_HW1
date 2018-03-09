function Person(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/person.png"), 384, 0, 64, 64, .1, 3, true, false);
    this.jumpAnimationUp = new Animation(ASSET_MANAGER.getAsset("./img/person.png"), 0, 320, 64, 64, .06, 3, false, true);
    this.jumpAnimationDown = new Animation(ASSET_MANAGER.getAsset("./img/person.png"), 0, 320, 64, 64, .06, 3, false, false);
    this.jumpAnimation = this.jumpAnimationUp;
    this.jumping = false;
    this.radius = 32;
    this.ground = 230;
    this.speed = 3;
    Entity.call(this, game, 0, 230);
}

Person.prototype = new Entity();
Person.prototype.constructor = Person;

Person.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    if (this.jumping) {
        if (this.jumpAnimationUp.isDone()) {
            this.jumpAnimation = this.jumpAnimationDown;
            this.jumpAnimationUp.elapsedTime = 0;
        }
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumpAnimation = this.jumpAnimationUp;
            this.jumping = false;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 10;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
    if (this.x + this.animation.frameWidth < 0) {
        this.x = this.game.ctx.canvas.width;
    }
    this.x -= this.speed;
    Entity.prototype.update.call(this);
}

Person.prototype.draw = function (ctx) {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}