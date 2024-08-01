class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.background = this.add.image(0, 0, "map").setOrigin(0, 0);

        this.player = this.physics.add.image(42, 344, "car");
        this.player.flipY = true;
        this.player.setScale(.013);
        this.player.setCollideWorldBounds(true);

        this.grassGroup = this.physics.add.staticGroup();
        this.createGrassHitboxes();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(4);

        // Start the overlay scene
        this.scene.launch('OverlayScene', { parentScene: this });

        this.currentSpeed = 0;
        this.gameStarted = false;
    }

    update() {
        if (!this.gameStarted) return;

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
        } else if (this.physics.overlap(this.player, this.grassGroup)) {
            this.currentSpeed > minGrassSpeed ? this.currentSpeed *= grassDeceleration : this.currentSpeed = minGrassSpeed;
        } else {
            this.currentSpeed <= maxSpeed ? this.currentSpeed += acceleration : this.currentSpeed = maxSpeed;
        }

        this.player.setVelocityY(-Math.cos(this.player.rotation) * this.currentSpeed);
        this.player.setVelocityX(Math.sin(this.player.rotation) * this.currentSpeed);
    }

    createGrassHitboxes() {
        const positions = [
            { x: 0, y: 0, width: 512, height: 30 },
            { x: 0, y: 30, width: 205, height: 60 },
            { x: 0, y: 90, width: 173, height: 35 },
            { x: 173, y: 90, width: 26, height: 30 },
            { x: 253, y: 64, width: 205, height: 60 },
        ];

        positions.forEach(pos => {
            const hitbox = this.physics.add.staticSprite(pos.x + pos.width / 2, pos.y + pos.height / 2, null);
            hitbox.setSize(pos.width, pos.height);
            hitbox.setOrigin(0, 0);
            hitbox.setVisible(false);
            this.grassGroup.add(hitbox);

            const border = this.add.graphics();
            border.lineStyle(2, 0xff0000);
            border.strokeRect(pos.x, pos.y, pos.width, pos.height);
            this.add.existing(border);
        });
    }

    startGame() {
        this.gameStarted = true;
    }
}
