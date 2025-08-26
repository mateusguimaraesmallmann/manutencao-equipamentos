import { Component } from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-test-page',
  imports: [Toolbar, AvatarModule, ButtonModule],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})
export class TestPageComponent {

}
