var gameSettings = {
    
}

var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);