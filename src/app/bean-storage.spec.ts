import { TestBed } from '@angular/core/testing';
import { BeanStorage, isBeanCount } from './bean-storage';

describe('BeanStorage', () => {
  let storage: BeanStorage;

  beforeEach(() => {
    storage = TestBed.inject(BeanStorage);
    storage.clearAll();
  });

  afterEach(() => storage.clearAll());

  it('round-trips a valid value', () => {
    storage.save('count', 42);
    expect(storage.load('count', 0, isBeanCount)).toBe(42);
  });

  it('returns the fallback when nothing is saved', () => {
    expect(storage.load('count', 0, isBeanCount)).toBe(0);
  });

  it('returns the fallback for corrupt JSON', () => {
    localStorage.setItem('beanland:v1:count', 'banana');
    expect(storage.load('count', 0, isBeanCount)).toBe(0);
  });

  it('returns the fallback for values that fail validation', () => {
    for (const bad of [-1, 1.5, '12', 9_999_999, null]) {
      localStorage.setItem('beanland:v1:count', JSON.stringify(bad));
      expect(storage.load('count', 0, isBeanCount)).toBe(0);
    }
  });

  it('only clears its own keys', () => {
    localStorage.setItem('someone-else', 'keep me');
    storage.save('count', 5);
    storage.clearAll();
    expect(localStorage.getItem('beanland:v1:count')).toBeNull();
    expect(localStorage.getItem('someone-else')).toBe('keep me');
    localStorage.removeItem('someone-else');
  });
});
