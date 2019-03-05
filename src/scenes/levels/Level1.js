import Level from './base/Level';
import MCAfrica from '../../sprites/pc/MCAfrica';
import Engineer from '../../sprites/npc/good/Engineer';

class Level1 extends Level {
  constructor() {
    super('level-level1');
  }

  create() {
    const engineer = new Engineer({
      scene: this,
      x: (20 * 100),
      y: (42 * 100),
      key: 'npc-engineer-sprite',
      dialog: {
        hello: {
          isQuestion: true,
          say: [
            "What's up G?",
            "I been sleeping all day.",
            "Whatchu got?"
          ],
          answers: {
            left: {
              reply: "I got stuff bro.",
              linkTo: "gotJunk"
            },
            right: {
              reply: "Huh?",
              linkTo: "tutorial"
            }
          }
        },
        tutorial: {
          say: [
            "Okay, I'll tell you what I do.",
            "I can make you new weapons.",
            "But to do so, I need resources. Some people call it junk, but I can make something out of anything so it ain't junk to me!",
            "Collect 'resources' while out in the field, fighting robots, and bring them to me.",
            "Especially if you're able to get anything off those damn robots. They have the best materials.",
            "So recap: find resources (junk), bring them to me, I'll make you new weapons."
          ]
        },
        gotJunk: {
          isQuestion: true,
          say: ["What've you got for me today?"],
          answers: {
            left: {
              reply: "I've got some stuff.",
              callback: (npc) => {}
            },
            right: {
              reply: "I just wanted to chat.",
              linkTo: "goAway"
            }
          }
        },
        thanks: {
          say: [
            "Thanks. I'll have something for you in an hour. Come back then.",
            "Seeya later."
          ]
        },
        goAway: {
          say: [
            "Ain't you got anything better to do?",
            "I'm busy here.",
            "Please leave."
          ]
        },
        newWeapon: {
          
        },
        secret: {

        }
      }
    });

    engineer.anims.play('engineer-idle', true);

    engineer.setInteractive();
    
    engineer.on('pointerdown', () => {
      engineer.readDialog("hello");
    });

    const NPCs = [
      engineer
    ];

    this.initScene({
      MCClass: MCAfrica,
      tilemapKey: 'level1-map',
      mcX: (19 * 100),
      mcY: (42 * 100),
      NPCs
    });
  }

  update() {
    this.mc.update();
    this.updateScene();
  }
}

export default Level1;