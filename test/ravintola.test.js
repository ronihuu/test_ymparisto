import { describe, test, expect } from 'vitest';
import { Ravintola } from './ravintola.js';

describe('Ravintola', () => {
  test('laskeLasku palauttaa oikean summan', () => {
    const ravintola = new Ravintola();
    const lasku = ravintola.laskeLasku(5, 10);
    expect(lasku).toBe(50);
  });
});
