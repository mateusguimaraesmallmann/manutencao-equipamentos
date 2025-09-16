import { Component, model } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-galleria',
  imports: [ 
            ButtonModule, GalleriaModule],
  templateUrl: './galleria.component.html',
  styleUrl: './galleria.component.css'
})
export class GalleriaComponent {
    images = model([])

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(newValue) {
        if (this.images() && 0 <= newValue && newValue <= this.images().length - 1) {
            this._activeIndex = newValue;
        }
    }

    _activeIndex: number = 2;

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    // constructor(private photoService: PhotoService) {}

    // ngOnInit() {
    //     this.photoService.getImages().then((images) => (this.images.set(images)));
    // }

    next() {
        this.activeIndex++;
    }
    prev() {
        this.activeIndex--;
    }
}
