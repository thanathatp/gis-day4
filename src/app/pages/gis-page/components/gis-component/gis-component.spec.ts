import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisComponent } from './gis-component';

describe('GisComponent', () => {
  let component: GisComponent;
  let fixture: ComponentFixture<GisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
