class TitleScene extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }


    create() {
        this.add.image(0, 0, "map");
    }
}