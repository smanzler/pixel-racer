class TitleScene extends Phaser.Scene {
    constructor() {
        super("TitleScene");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "clouds");
        this.background.setOrigin(0, 0);
        this.background.setScale(1.65);

        this.playButton = this.add.image(400, 300, 'playButton').setInteractive();

        this.playButton.on('pointerover', () => {
            this.playButton.setTint(0x999999); 
        });

        this.playButton.on('pointerout', () => {
            this.playButton.clearTint(); 
        });
        
        this.playButton.on('pointerdown', () => {
            this.playButton.setTint(0x555555); 
        });

        this.playButton.on('pointerup', () => {
            this.playButton.clearTint(); 
            this.scene.start('GameScene');
        });
    }

    update() {
        this.background.tilePositionX += 0.5;
    }
}
