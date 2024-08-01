class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        this.load.image("map", "assets/images/map.png");
        this.load.image("car", "assets/images/car.png");
        this.load.image("playButton", "assets/images/playButton.png")
        this.load.image("clouds", "assets/images/clouds.png")
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("GameScene");
    }
}