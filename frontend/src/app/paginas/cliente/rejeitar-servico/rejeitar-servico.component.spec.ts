import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeitarServicoComponent } from './rejeitar-servico.component';

describe('RejeitarServicoComponent', () => {
  let component: RejeitarServicoComponent;
  let fixture: ComponentFixture<RejeitarServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejeitarServicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejeitarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
