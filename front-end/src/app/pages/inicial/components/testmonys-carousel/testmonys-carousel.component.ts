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
      personName: "João Mendes",
      testmony: "Equipe muito atenciosa e profissional. Resolveram meu problema rapidamente e ainda deram orientações para evitar futuras falhas"
    },
    {
      personName: "Maria Oliveira",
      testmony: "Fiquei impressionada com a agilidade no atendimento. Além da manutenção, recebi dicas úteis para melhorar o desempenho do meu equipamento."
    },
    {
      personName: "Carlos Ferreira",
      testmony: "Serviço de qualidade e preço justo. Recomendo a todos que buscam confiança e segurança no conserto de seus equipamentos."
    },
    {
      personName: "Fernanda Lima",
      testmony: "Atendimento excelente! Resolveram em poucas horas o que outros demorariam dias. Voltarei sempre que precisar."
    },
    {
      personName: "Rafael Souza",
      testmony: "Equipe de confiança, explicaram todo o processo com clareza e entregaram o equipamento funcionando perfeitamente."
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