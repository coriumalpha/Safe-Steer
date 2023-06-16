import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  scrollToDocumentation() {
    const element = document.getElementById('documentation');
  
    if (element) {
      element.scrollIntoView({behavior: "smooth"});
    }
  }
}
