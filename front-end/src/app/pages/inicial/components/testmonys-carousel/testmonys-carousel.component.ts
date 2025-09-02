import { Component } from '@angular/core';
import { TestmonyCardComponent } from "./components/testmony-card/testmony-card.component";
import { CarouselModule } from 'primeng/carousel'

@Component({
  selector: 'app-testmonys-carousel',
  imports: [TestmonyCardComponent, CarouselModule],
  templateUrl: './testmonys-carousel.component.html',
  styleUrl: './testmonys-carousel.component.css'
})
export class TestmonysCarouselComponent {
  testmonys: TestmonyCardComponent[] = [
    {
      personName: "Pessoas Aleatoria",
      testmony: "foi uma experiencia incrivel lidar com a equipe e tals e tals"
    },
    {
      personName: "Pessoas Aleatoria",
      testmony: "foi uma experiencia incrivel lidar com a equipe e tals e tals"
    },
    {
      personName: "Pessoas Aleatoria",
      testmony: "foi uma experiencia incrivel lidar com a equipe e tals e tals"
    },
    {
      personName: "Pessoas Aleatoria",
      testmony: "foi uma experiencia incrivel lidar com a equipe e tals e tals"
    },
    {
      personName: "Pessoas Aleatoria",
      testmony: "foi uma experiencia incrivel lidar com a equipe e tals e tals"
    }
  ]

  responsiveOptions = [
            {
                breakpoint: '1200px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '788px',
                numVisible: 1,
                numScroll: 1
            }
        ]
}