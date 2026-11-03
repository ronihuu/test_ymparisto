import { describe, test, expect } from 'vitest';
import ravintola from '/teht1/ravintola.js';

describe('laskeLasku testaus', function () {
  test('laskeLasku palauttaa oikean summan', function () {
    expect(ravintola.laskeLasku(true, true, true)).toBe(17);
    expect(ravintola.laskeLasku(false, false, false)).toBe(6);
  });
});

test('satunnainen arvo sisältyy laskuun', function () {
  const satunnainenArvo = ravintola.palautaTaulukonSatunnainenArvo(
    ravintola.alkuruoat,
  );
  const satunnainenArvo2 = ravintola.palautaTaulukonSatunnainenArvo(
    ravintola.jalkiruoat,
  );
  const satunnainenArvo3 = ravintola.palautaTaulukonSatunnainenArvo(
    ravintola.juomat,
  );
  expect(ravintola.alkuruoat).toContain(satunnainenArvo);
  expect(ravintola.jalkiruoat).toContain(satunnainenArvo2);
  expect(ravintola.juomat).toContain(satunnainenArvo3);
});

test('syoRavintolassa palauttaa oikean tyypin arvon', function () {
  const syonti = ravintola.syoRavintolassa(4);
  expect(Array.isArray(syonti)).toBe(true);
});
