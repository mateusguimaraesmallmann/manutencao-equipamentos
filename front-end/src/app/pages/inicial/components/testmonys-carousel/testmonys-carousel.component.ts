import { Component } from '@angular/core';
import { TestmonyCardComponent } from "./components/testmony-card/testmony-card.component";

@Component({
  selector: 'app-testmonys-carousel',
  imports: [TestmonyCardComponent],
  templateUrl: './testmonys-carousel.component.html',
  styleUrl: './testmonys-carousel.component.css'
})
export class TestmonysCarouselComponent {

}
