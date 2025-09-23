import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { HeaderComponent } from '../../../components/header/header.component';
import { CardModule } from 'primeng/card'
import { TestmonysCarouselComponent } from "./components/testmonys-carousel/testmonys-carousel.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { ButtonModule } from "primeng/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.css',
  imports: [ToolbarModule,
    AnimateOnScrollModule,
    HeaderComponent,
    CardModule,
    TestmonysCarouselComponent, FooterComponent, ButtonModule],
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

                .box {
                    background-image: radial-gradient(var(--primary-300), var(--primary-600));
                    border-radius: 50% !important;
                    color: var(--primary-color-text);
                }
            }
        `
  ]
})
export class InicialComponent {
    constructor(
    private router: Router
  ) {}

    goToLogin() {
    this.router.navigate(['/login']);
  }
    goToAutoCadatro() {
    this.router.navigate(['/autocadastro']);
  }
}
