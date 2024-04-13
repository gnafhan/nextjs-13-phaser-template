// import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { AlignGrid } from './../util/AlignGrid';
import { Align } from './../util/Align';
import { UIBlock } from './../util/UIBlock';

export class First extends Scene
{
    logoTween;
    

    constructor ()
    {
        super('First');
    }

    create ()
    {
        let bg = this.add.image(512, 384, 'background').setOrigin(0,0);
        Align.scaleToGameW(bg, 2)
        this.cameras.main.setBounds(0,0, bg.displayWidth, bg.displayHeight)
        var gridConfig = {
            'scene': this,
            'cols': 20,
            'rows': 20
        }
        this.aGrid = new AlignGrid(gridConfig);
        this.aGrid.showNumbers();
        var text=this.add.text(0,-30,"Message Here",{color:'#ff0000'}).setOrigin(0.5,0.5);

        var alert = new UIBlock();
        alert.add(text)
        alert.x = 340
        alert.y = 200

        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 700, 'logo').setScale(.3).refreshBody();
        this.platforms.create(600, 730, 'logo');
        this.platforms.create(200, 730, 'logo');
        this.platforms.create(900, 730, 'logo');
        this.platforms.create(50, 250, 'logo');
        this.platforms.create(750, 220, 'logo');

        this.player = this.physics.add.sprite(0, 0, 'dude');
        // this.cat = this.physics.add.sprite(0, 0, 'cat');    
        
        // this.player.setBounce(0.2);
        // this.player.setCollideWorldBounds(true);
        
        this.anims.create({ key:'up', frames: this.anims.generateFrameNames('cat', {prefix: 'up', end: 4, zeroPad:2}), repeat: -1, frameRate: 10})
        this.anims.create({ key:'down', frames: this.anims.generateFrameNames('cat', {prefix: 'down', end: 4, zeroPad:2}), repeat: -1, frameRate: 10})
        this.anims.create({ key:'idle', frames: this.anims.generateFrameNames('cat', {prefix: 'down', end: 1, zeroPad:2}), repeat: -1, frameRate: 1})

        this.anims.create({ key:'leftcat', frames: this.anims.generateFrameNames('cat', {prefix: 'left', end: 4, zeroPad:2}), repeat: -1, frameRate: 10})
        this.anims.create({ key:'rightcat', frames: this.anims.generateFrameNames('cat', {prefix: 'right', end: 4, zeroPad:2}), repeat: -1, frameRate: 10})


        this.cat = this.physics.add.sprite(0, 0, 'cat').setScale(2);    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude',  { start: 0, end: 3 }),
            frameRate: 8,
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.platforms);
        // this.aGrid.placeAtIndex(306, this.player)
        this.cameras.main.startFollow(this.player)
        
        // this.logo = this.add.image(512, 300, 'logo').setDepth(100);

        // this.add.text(512, 460, 'Main Menu', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setDepth(100).setOrigin(0.5);
        
        // EventBus.emit('current-scene-ready', this);
    }

    update(){
        var cursors = this.input.keyboard.createCursorKeys();
        // console.log(cursors)
        
        if (cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.cat.setVelocityX(-160);

            this.player.anims.play('left', true);
            this.cat.anims.play('leftcat', true);

        }
        else if (cursors.up.isDown){
            this.player.setVelocityY(-160);
            this.cat.setVelocityY(-160);

            this.cat.anims.play('up', true);

        }
        else if (cursors.down.isDown){
            this.player.setVelocityY(160);
            this.cat.setVelocityY(160);


            this.cat.anims.play('down', true);

        }
        else if (cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.cat.setVelocityX(160);

            this.player.anims.play('right', true);
            this.cat.anims.play('rightcat', true);

        } 
        else
        {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.cat.setVelocityX(0);
            this.cat.setVelocityY(0);


            this.player.anims.play('turn');
            this.cat.anims.play('idle', true);
        }

        if (cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('First');
    }

    moveLogo (reactCallback)
    {
        if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        }
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (reactCallback)
                    {
                        reactCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}
