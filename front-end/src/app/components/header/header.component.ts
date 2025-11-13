import { Component, Input } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { Router } from '@angular/router';
import { ɵɵRouterLink } from "@angular/router/testing";

@Component({
  selector: 'app-header',
  imports: [Toolbar, AvatarModule, ButtonModule, ɵɵRouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private router: Router
  ) {}
 
  goToLogin() {
    this.router.navigate(['/login']);
  }

  @Input() logoColor:string = "white"
  @Input() personName:string = ""
  @Input() backgroudColor!: string
  @Input() buttons!: HeaderButton[]
  @Input() headerlinks!: HeaderLink[]
  @Input() severityLink!: string
}
class HeaderButton {
  label!: string
  severity: ButtonSeverity
  onCLick: any
  icon!: string
}

class HeaderLink{
  label!: string
  routerLink!: string
  icon!: string
}