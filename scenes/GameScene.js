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

        // this.cameras.main.startFollow(this.player);
        // this.cameras.main.setZoom(4);

        this.scene.launch('OverlayScene', { parentScene: this });

        this.currentSpeed = 0;
        this.gameStarted = false;
        this.hitCheckpoint = false;

        this.checkpoint = this.physics.add.staticImage(465, 125, null).setSize(50, 10).setVisible(false);
        this.finishLine = this.physics.add.staticImage(47, 315, null).setSize(40, 10).setVisible(false);
        

        this.physics.add.overlap(this.player, this.checkpoint, this.reachCheckpoint, null, this);
        this.physics.add.overlap(this.player, this.finishLine, this.reachFinishLine, null, this);

        this.input.on('pointermove', (pointer) => {
            if (this.finishLine.getBounds().contains(pointer.x, pointer.y)) {
                console.log('Mouse is over the sprite');
            }
        });
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
            { x: 191, y: 114, width: 1, height: 1 },
            { x: 253, y: 64, width: 160, height: 95 },
            { x: 413, y: 97, width: 34, height: 27},
        ];

        positions.forEach(pos => {
            const hitbox = this.physics.add.staticSprite(pos.x + pos.width / 2, pos.y + pos.height / 2, null);
            hitbox.setSize(pos.width, pos.height);
            hitbox.setOrigin(0, 0);
            hitbox.setVisible(false);
            this.grassGroup.add(hitbox);

            // const border = this.add.graphics();
            // border.lineStyle(2, 0xff0000);
            // border.strokeRect(pos.x, pos.y, pos.width, pos.height);
            // this.add.existing(border);
        });
    }

    startGame() {
        this.gameStarted = true;
    }

    reachCheckpoint() {
        if (!this.hitCheckpoint) {
            this.hitCheckpoint = true;
            this.scene.get('OverlayScene').events.emit('updateCheckpoint');
        }
    }

    reachFinishLine() {
        if (this.hitCheckpoint) {
            const finalTime = this.scene.get('OverlayScene').getTimer();
            this.scene.stop('GameScene');
            this.scene.stop('OverlayScene');
            this.scene.start('FinishScene', { finalTime: finalTime });
        }
    }
    
}
