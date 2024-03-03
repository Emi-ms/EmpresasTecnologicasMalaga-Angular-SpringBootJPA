import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDistritoComponent } from './edit-distrito.component';

describe('EditDistritoComponent', () => {
  let component: EditDistritoComponent;
  let fixture: ComponentFixture<EditDistritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDistritoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
