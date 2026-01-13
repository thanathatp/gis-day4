import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisPage } from './gis-page';

describe('GisPage', () => {
  let component: GisPage;
  let fixture: ComponentFixture<GisPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GisPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GisPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
