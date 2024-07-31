class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }


    create() {
        this.track = this.add.image(0, 0, "track").setOrigin(0, 0);
        this.grass = this.add.image(0, 0, "grass").setOrigin(0, 0);

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
        const maxSpeed = 100; // Maximum speed
        const acceleration = 5; // Acceleration rate
        const deceleration = 0.98; // Deceleration rate

        if (this.cursors.down.isDown) {
            // Decelerate the car smoothly
            this.currentSpeed *= deceleration;
            if (this.currentSpeed < 5) {
                this.currentSpeed = 0; // Stop completely if very slow
            }
        } else {
            // Accelerate gradually until reaching the maximum speed
            if (this.currentSpeed < maxSpeed) {
                this.currentSpeed += acceleration;
            } else {
                this.currentSpeed = maxSpeed;
            }
        }

        // Update the car's velocity based on the current speed and rotation
        this.player.setVelocityY(-Math.cos(this.player.rotation) * this.currentSpeed); // Positive y is upwards
        this.player.setVelocityX(Math.sin(this.player.rotation) * this.currentSpeed); // Positive x is right
    }
}