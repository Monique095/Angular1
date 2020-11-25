import { TestBed, async, inject } from '@angular/core/testing';
import { ProductEditCreateGuard } from './create-edit.guard';


describe('ProductEditCreateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductEditCreateGuard]
    });
  });

  it('should ...', inject([ProductEditCreateGuard], (guard: ProductEditCreateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
