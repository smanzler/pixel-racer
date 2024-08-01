class OverlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'OverlayScene' });
    }

    init(data) {
        this.parentScene = data.parentScene;
    }

    create() {
        this.countdown = 3;
        this.countdownText = this.add.text(this.cameras.main.centerX, 50, `${this.countdown}`, {
            fontSize: '64px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5).setScrollFactor(0);

        this.timerText = this.add.text(10, 10, 'Time: 0.00', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setScrollFactor(0);

        this.timer = 0;
        this.time.addEvent({
            delay: 1000,
            callback: this.updateCountdown,
            callbackScope: this,
            loop: true
        });

        this.gameStarted = false;
    }

    update() {
        if (this.gameStarted) {
            this.timer += this.game.loop.delta / 1000;
            this.timerText.setText(`Time: ${this.timer.toFixed(2)}`);
        }
    }

    updateCountdown() {
        if (this.countdown > 1) {
            this.countdown--;
            this.countdownText.setText(`${this.countdown}`);
        } else if (this.countdown === 1) {
            this.countdown--;
            this.gameStarted = true;
            this.parentScene.startGame();
            this.countdownText.setText('GO!');
        } else {
            this.countdownText.setVisible(false);
            this.time.removeAllEvents();
        }
    }
}
