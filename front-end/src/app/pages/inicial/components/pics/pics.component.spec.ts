import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicsComponent } from './pics.component';

describe('PicsComponent', () => {
  let component: PicsComponent;
  let fixture: ComponentFixture<PicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
