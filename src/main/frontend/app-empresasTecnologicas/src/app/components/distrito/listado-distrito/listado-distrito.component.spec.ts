import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDistritoComponent } from './listado-distrito.component';

describe('ListadoDistritoComponent', () => {
  let component: ListadoDistritoComponent;
  let fixture: ComponentFixture<ListadoDistritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDistritoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoDistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
