class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        this.load.image("track", "assets/images/track.png");
        this.load.image("grass", "assets/images/grass.png");
        this.load.image("car", "assets/images/car.png");
        this.load.image("playButton", "assets/images/playButton.png")
        this.load.image("clouds", "assets/images/clouds.png")
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("TitleScene")
    }
}