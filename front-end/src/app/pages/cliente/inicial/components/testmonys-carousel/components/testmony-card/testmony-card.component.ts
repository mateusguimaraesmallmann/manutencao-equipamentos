import { Component, Input } from '@angular/core';
import { Card } from "primeng/card";

@Component({
  selector: 'app-testmony-card',
  imports: [Card],
  templateUrl: './testmony-card.component.html',
  styleUrl: './testmony-card.component.css'
})
export class TestmonyCardComponent {
  @Input() personName!: string
  @Input() testmony!: string 
}
