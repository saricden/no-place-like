import {Scene} from 'phaser';
import {db} from '../firebase';

class CreditsScene extends Scene {
  constructor() {
    super('credits');
  }

  create() {

    // Build credits string
    //  - Static (my name, Open Haven)
    //  - Dynamic (Twitch subs, GH contributors (& collaborators), Patrons from Patreon)

    // Assign string to text object
    this.credits = this.add.text(window.innerWidth, window.innerHeight, '', {
      fontFamily: 'Sans Serif',
      color: '#FFF',
      align: 'right',
      padding: 20,
      wordWrap: {
        width: window.innerWidth,
        useAdvancedWrap: true
      }
    });
    this.credits.setOrigin(1, 0);

    // Populate the credits text
    this.creditsLn('A big shout out to my subscribers on Twitch!');
    this.creditsLn('');
    this.creditsLn('.');
    this.creditsLn('');

    let subs_q = db.collection('twitchSubs');
    subs_q = subs_q.orderBy('timestamp', 'desc');
    subs_q = subs_q.limit(1);
    
    subs_q.get().then((querySnap) => {
      // Tween text object, and exit scene at the end of tween

      querySnap.forEach((doc) => {
        const docData = doc.data();
        const {data} = docData.twitchData;

        data.forEach((sub) => {
          const {user_name} = sub;
          if (user_name !== 'saricden') {
            this.creditsLn(user_name);
          }
        });
      });

      this.creditsLn('');
      this.creditsLn('.');
      this.creditsLn('');

      this.tweens.add({
        targets: this.credits,
        y: -this.credits.displayHeight,
        ease: 'Power1',
        duration: (150 * this.credits.text.length),
        yoyo: false,
        repeat: 0,
        onComplete: () => {
          this.scene.start('title-scene');
        }
      });
    }).catch((error) => {
      console.log('OooOooo NUUUUU', error);
    })
  }

  creditsLn(msg) {
    this.credits.setText(this.credits.text + '\n' + msg);
  }
}

export default CreditsScene;