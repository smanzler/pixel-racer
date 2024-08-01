class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }


    create() {
        this.track = this.add.image(0, 0, "track").setOrigin(0, 0);
        this.grass = this.physics.add.staticImage(0, 0, "innerGrass");
        this.outerGrass = this.physics.add.staticImage(0, 0, "outerGrass");

        this.player = this.physics.add.image(42, 344, "car");
        this.player.flipY = true;
        this.player.setScale(.013);
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.currentSpeed = 0;

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(4);
    }

    update() {
        this.moveCar();

        if (this.cursors.left.isDown) {
            this.player.angle -= 1; 
        } else if (this.cursors.right.isDown) {
            this.player.angle += 1; 
        }

        this.cameras.main.setRotation(-this.player.rotation);
    }

    moveCar() {
        const maxSpeed = 100;
        const acceleration = 1;
        const deceleration = 0.98;

        const minGrassSpeed = 40;
        const grassDeceleration = 0.9;

        if (this.cursors.down.isDown) {
            this.currentSpeed *= deceleration;
            if (this.currentSpeed < 5) {
                this.currentSpeed = 0; 
            }
        } else if (this.physics.overlap(this.player, this.innerGrass) || this.physics.overlap(this.player, this.outerGrass)) {
            this.currentSpeed > minGrassSpeed ? this.currentSpeed *= grassDeceleration : this.currentSpeed = minGrassSpeed;
        } else {
            this.currentSpeed <= maxSpeed ? this.currentSpeed += acceleration : this.currentSpeed = maxSpeed;
        }

        this.player.setVelocityY(-Math.cos(this.player.rotation) * this.currentSpeed); 
        this.player.setVelocityX(Math.sin(this.player.rotation) * this.currentSpeed); 
    }
}