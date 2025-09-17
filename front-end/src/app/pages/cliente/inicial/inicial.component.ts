import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { HeaderComponent } from '../../../components/header/header.component';
import { CardModule } from 'primeng/card'
import { TestmonysCarouselComponent } from "./components/testmonys-carousel/testmonys-carousel.component";
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-inicial',
  imports: [ToolbarModule,
    AnimateOnScrollModule,
    HeaderComponent,
    CardModule,
    TestmonysCarouselComponent, FooterComponent],
  styles: [
    `
            :host {
                @keyframes slidedown-icon {
                    0% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(20px);
                    }

                    100% {
                        transform: translateY(0);
                    }
                }

                .slidedown-icon {
                    animation: slidedown-icon;
                    animation-duration: 3s;
                    animation-iteration-count: infinite;
                }
            }
        `
  ],
  standalone: true,
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.css'
})
export class InicialComponent {

}
