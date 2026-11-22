import { describe, expect, test } from 'vitest';
import ravintola from '/teht2/ravintola_updated.js';

describe('Ravintolan toimintaa', function () {
  test('Ravintola ottaa oikean määrän asiakkaita', function () {
    const asiakkaat = ravintola.syoRavintolassa(15);
    expect(asiakkaat).toHaveLength(15);
  });

  test('Ravintola ei ota liikaa asiakkaita', function () {
    expect(() => ravintola.syoRavintolassa(7)).toThrow();
  });

  test('laskeLasku toimii oikein', function () {
    const summa = ravintola.laskeLasku([
      { nimi: 'Alkuruoka', hinta: 5 },
      { nimi: 'Pääruoka', hinta: 10 },
      { nimi: 'Jälkiruoka', hinta: 3 },
      { nimi: 'Juoma', hinta: 2 },
    ]);
    expect(summa).toBe(20);
  });
});
