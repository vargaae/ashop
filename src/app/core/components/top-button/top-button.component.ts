import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'top-button',
  templateUrl: './top-button.component.html',
  styleUrls: ['./top-button.component.scss']
})
export class TopButtonComponent {
  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }
  constructor() { }

  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        // document.getElementById("myBtn").style.display = "block";
    } else {
        // document.getElementById("myBtn").style.display = "none";
    }
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
