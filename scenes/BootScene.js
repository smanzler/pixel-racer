class BootScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("map", "assets/images/map.png");
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("titleScene")
    }
}