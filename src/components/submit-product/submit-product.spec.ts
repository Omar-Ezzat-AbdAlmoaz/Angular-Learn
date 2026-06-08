import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';

import { SubmitProduct } from './submit-product';

describe('SubmitProduct', () => {
  let component: SubmitProduct;
  let fixture: ComponentFixture<SubmitProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitProduct],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
