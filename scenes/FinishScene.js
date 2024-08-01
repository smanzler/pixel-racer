class FinishScene extends Phaser.Scene {
    constructor() {
        super("FinishScene");
    }

    create(data) {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "clouds");
        this.background.setOrigin(0, 0);
        this.background.setScale(1.65);

        const finalTime = data.finalTime;

        this.add.text(400, 350, 'Your Time: ' + finalTime.toFixed(2) + ' seconds', { 
            font: '24px', 
            fill: '#ffffff' 
        }).setOrigin(0.5);

        this.add.text(400, 300, 'Congratulations!', {
            fontSize: '64px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        this.add.text(400, 400, 'Press R to Restart', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('GameScene');
        });
    }

    update() {
        this.background.tilePositionX += 0.5;
    }
}
