class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }


    create() {
        this.background = this.add.image(0, 0, "map");
        this.background.setOrigin(0, 0);

        this.player = this.physics.add.image(42, 344, "car");
        this.player.flipY = true;
        this.player.setScale(.013);
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

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
        const speed = 100;

        if (this.cursors.down.isDown) {
            this.player.setVelocityX(this.player.body.velocity.x * 0.99); // Adjust deceleration rate as needed
            this.player.setVelocityY(this.player.body.velocity.y * 0.99); // Adjust deceleration rate as needed
        } else {
            this.player.setVelocityY(-Math.cos(this.player.rotation) * speed); // Positive y is upwards
            this.player.setVelocityX(Math.sin(this.player.rotation) * speed); // Positive x is right
    
        }
    }
}