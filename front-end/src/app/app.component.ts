import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router'; // Add this import
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE_FACTORY } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

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
