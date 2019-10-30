import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'haunted-house-waiver';
  num = 42;
  accepted = false;

  accept() {
    this.accepted = true;
  }

  newWaiver() {
    this.accepted = false;
    this.num += 1;
  }
}
