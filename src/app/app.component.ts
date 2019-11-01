import { Component, HostListener } from '@angular/core';
import Speech from 'speak-tts';
declare var chrome;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'haunted-house-waiver';
  num = 42;
  display = 'L' + this.num;
  accepted = false;
  clip;
  speech;

  constructor() {
    this.speech = new Speech();
    this.clip = new Audio('assets/welcome.m4a');
    this.clip.load();


    if (this.speech.hasBrowserSupport()) {
      console.log('tts supported');
      this.speech.init({voice: 'Samantha', volume: 0.45}).then(data => {
        console.log('speech ready', data.voices.filter((e) => e.lang.includes('en')));
        this.clip.addEventListener('ended', () => {
          console.log('ended');
          this.speech.speak({text: this.display}).then(() => {
            console.log('said: ', this.display);
          }).catch(e => console.error(e));
        });
      });
    }
  }
  accept() {
    this.accepted = true;
    this.clip.play();
  }

  newWaiver() {
    this.accepted = false;
    this.num += 1;
    this.display = 'L' + this.num;
    this.clip.load();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
      if (this.accepted) {
        this.newWaiver();
      } else {
        this.accept();
      }
    }
  }
}
