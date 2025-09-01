import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmonysCarouselComponent } from './testmonys-carousel.component';

describe('TestmonysCarouselComponent', () => {
  let component: TestmonysCarouselComponent;
  let fixture: ComponentFixture<TestmonysCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestmonysCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestmonysCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
