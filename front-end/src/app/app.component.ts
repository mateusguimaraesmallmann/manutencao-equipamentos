import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router'; // Add this import

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [RouterOutlet]
})
export class AppComponent {
  constructor(public router: Router){
    console.log(this.showBackground());
  }
  showBackground(): boolean{
    const routsWithBackground = ['/']
    return routsWithBackground.includes(this.router.url);
  }
  title = 'front-end';
}
