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

  // When the user scrolls down 20px from the top of the document, show the button
  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

}
