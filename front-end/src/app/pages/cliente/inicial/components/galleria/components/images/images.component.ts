import { Component, OnInit } from '@angular/core';

interface Image {
    url: string;
    title: string;
}

@Component({
  selector: 'app-images',
  imports: [],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent implements OnInit {
    images: Image[] = []
    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ]

    ngOnInit() {
        this.images = [
            {
                url: 'assets/images/image1.jpg',
                title: 'Imagem 1'
            },
            {
                url: 'assets/images/image2.jpg',
                title: 'Imagem 2'
            },
            {
                url: 'assets/images/image3.jpg',
                title: 'Imagem 3'
            }
            
        ]
    }
}
