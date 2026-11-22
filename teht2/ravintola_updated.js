/*
TIKO RAVINTOLA
OHJELMAKOODI
*/

const Ravintola = function () {
  this.alkuruoat = [
    { nimi: 'Tomaattikeitto', hinta: 5 },
    { nimi: 'Leipä', hinta: 3 },
    { nimi: 'Vihersalaatti', hinta: 4 },
    { nimi: 'Salsa', hinta: 2 },
  ];
  this.paaruoat = [
    { nimi: 'Kalakeitto', hinta: 6 },
    { nimi: 'Makaroonilaatikko', hinta: 7 },
    { nimi: 'Kasvispihvi', hinta: 5 },
    { nimi: 'Kanasalaatti', hinta: 8 },
  ];
  this.jalkiruoat = [
    { nimi: 'Hedelmäsalaatti', hinta: 4 },
    { nimi: 'Jäätelö', hinta: 3 },
    { nimi: 'Pulla', hinta: 2 },
    { nimi: 'Donitsi', hinta: 1 },
  ];
  this.juomat = [
    { nimi: 'Tee', hinta: 2 },
    { nimi: 'Kahvi', hinta: 3 },
    { nimi: 'Maito', hinta: 1 },
    { nimi: 'Mehu', hinta: 2 },
  ];
  this.paikkojenMaara = 15;
  this.varauksenMaara = null; // TÃ¤hÃ¤n muuttujaan varauksien lukumÃ¤Ã¤rÃ¤
  this.paikat; // TÃ¤hÃ¤n muuttujaan paikkojen taulukko
};

/**
 * Palauttaa satunnaisen boolean arvon
 * @return {boolean} Randomized boolean
 */
function generoiBoolean() {
  return Math.random() < 0.5;
}

/**
 * Jos 'asiakkaidenMaara' on pienempi tai yhtÃ¤suuri kuin 'paikkojenMaara', luo taulukon 'tilaukset'
 * johon tallennetaan yksittÃ¤isen asiakkaan tilaus. tilaaAteria-funktiolle annetaan satunnaiset boolean arvot
 * argumentteina.
 *
 * Palauttaa pÃ¤Ã¤tteeksi 'tilaukset' taulukon.
 * @param {number} asiakkaidenMaara
 * @return {object} object array
 */
Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
  if (this.tarkistaAsiakasSyote(asiakkaidenMaara) === false) {
    return [];
  }

  if (!this.varaaPaikat(asiakkaidenMaara)) {
    console.log(this.varaaPaikat(asiakkaidenMaara));
    throw new Error('Ravintolassa ei ole tarpeeksi paikkoja varattavaksi.');
  }
  const tilaukset = [];

  for (let i = 0; i < asiakkaidenMaara; i++) {
    console.log('-------------------------------------------------------');
    console.log(
      'Tarjoillaan asiakasta numero ' + (i + 1) + '. MitÃ¤ teille saisi olla?',
    );
    tilaukset.push(
      this.tilaaAteria(generoiBoolean(), generoiBoolean(), generoiBoolean()),
    );
    console.log('Asiakkaalle tarjoiltu. HyvÃ¤Ã¤ ruokahalua!');
  }
  console.log('-------------------------------------------------------');
  console.log('Kaikille asiakkaille tarjoiltu!');

  return tilaukset;
};

/**
 * Tarkistaa, ettÃ¤ 'asiakkaidenMaara' on suurempi kuin 0, mutta pienempi tai yhtÃ¤suuri kuin 'paikkojenMaara'.
 *
 * Kirjoittaa konsoliin tulosteen tilanteesta, ja palauttaa onnistumisen boolean arvona.
 *
 * Jos 'asiakkaidenMaara' ei ole numero, heittÃ¤Ã¤ TypeErrorin.
 * @param {number} asiakkaidenMaara
 * @return {boolean} Onnistuminen
 */
Ravintola.prototype.tarkistaAsiakasSyote = function (asiakkaidenMaara) {
  if (typeof asiakkaidenMaara !== 'number') {
    throw new TypeError();
  }
  if (asiakkaidenMaara <= 0) {
    console.log(
      'IkÃ¤vÃ¤ kyllÃ¤ emme voi tarjoilla ' + asiakkaidenMaara + ' asiakkaalle.',
    );
    return false;
  } else if (asiakkaidenMaara > this.paikkojenMaara) {
    console.log(
      'IkÃ¤vÃ¤ kyllÃ¤ ravintolaamme ei mahdu ' +
        asiakkaidenMaara +
        ' asiakasta.',
    );
    return false;
  }
  return true;
};

/**
 * Luo Ravintolan paikat-muuttujaan uuden taulukon, jonka koko mÃ¤Ã¤rÃ¤ytyy paikkojenMaara-muuttujan mukaisesti,
 * ja tÃ¤yttÃ¤Ã¤ taulukon boolean arvolla false.
 * @return {void}
 */
Ravintola.prototype.generoiPaikat = function () {
  this.paikat = new Array(this.paikkojenMaara).fill(false);
};

/**
 * JSDoc tÃ¤nne
 * Varaa paikkoja ravintolassa.
 * Jos paikkoja ei ole tarpeeksi varattavaksi, kirjoittaa konsoliin ilmoituksen.
 * Jos paikkoja on tarpeeksi, varaa paikat asettamalla taulukon arvoksi true.
 * Palauttaa lopulta true/false riippuen onnistuuko varaus vai ei.
 * @returns {boolean} Onnistuminen/epäonnistuminen
 */
Ravintola.prototype.varaaPaikat = function (varaustenMaara) {
  if (Array.isArray(this.paikat) === false) {
    this.generoiPaikat();
  }
  if (varaustenMaara === undefined) {
    varaustenMaara = 1;
  }

  const vapaatPaikat = this.paikat.filter((paikka) => paikka === false).length;
  if (vapaatPaikat < varaustenMaara) {
    console.log('Ei tarpeeksi paikkoja varattavaksi.');
    return false;
  }
  let varatutPaikat = 0;
  for (
    let i = 0;
    i < this.paikat.length && varatutPaikat < varaustenMaara;
    i++
  ) {
    if (this.paikat[i] === false) {
      this.paikat[i] = true;
      varatutPaikat++;
    }
  }
  return true;
};

/**
 * Ottaa parametreina 3 boolean arvoa, joiden avulla mÃ¤Ã¤ritellÃ¤Ã¤n mitÃ¤ ruokia asiakas tilaa.
 * Jos parametrit eivÃ¤t ole tyyppiÃ¤ boolean, heitetÃ¤Ã¤n TypeError.
 *
 * Tilaukset tallennetaan 'ruoat' taulukkoon boolean parametrien mukaisesti.
 *
 * Lopuksi kutsutaan 'laskeLasku' funktiota, jolla lasketaan tilauksen lasku.
 *
 * Palauttaa objektin, joka sisÃ¤ltÃ¤Ã¤ numeron ja string-taulukon
 *
 * @param {boolean} ottaaAlkuruoan
 * @param {boolean} ottaaJalkiruoan
 * @param {boolean} ottaaJuoman
 * @return {{summa: number, ruoat: object[]}} object - number, string[]
 */
Ravintola.prototype.tilaaAteria = function (
  ottaaAlkuruoan,
  ottaaJalkiruoan,
  ottaaJuoman,
) {
  if (
    typeof ottaaAlkuruoan !== 'boolean' ||
    typeof ottaaJalkiruoan !== 'boolean' ||
    typeof ottaaJuoman !== 'boolean'
  ) {
    throw new TypeError();
  }

  const ruoat = [];
  let ruoka;

  if (ottaaAlkuruoan) {
    ruoka = this.palautaTaulukonSatunnainenArvo(this.alkuruoat);
    console.log(
      'Ottaisin alkuruoaksi: ' + ruoka.nimi + ' (' + ruoka.hinta + '€)',
    );
    ruoat.push(ruoka);
  }

  ruoka = this.palautaTaulukonSatunnainenArvo(this.paaruoat);
  console.log(
    'Ottaisin pÃ¤Ã¤ruoaksi: ' + ruoka.nimi + ' (' + ruoka.hinta + '€)',
  );
  ruoat.push(ruoka);

  if (ottaaJalkiruoan) {
    ruoka = this.palautaTaulukonSatunnainenArvo(this.jalkiruoat);
    console.log(
      'Ottaisin jÃ¤lkiruoaksi: ' + ruoka.nimi + ' (' + ruoka.hinta + '€)',
    );
    ruoat.push(ruoka);
  }

  if (ottaaJuoman) {
    ruoka = this.palautaTaulukonSatunnainenArvo(this.juomat);
    console.log('Ottaisin juomaksi: ' + ruoka.nimi + ' (' + ruoka.hinta + '€)');
    ruoat.push(ruoka);
  }

  const summa = this.laskeLasku(ruoat);
  console.log('Lasku on yhteensÃ¤: ' + summa + '€');

  return { summa, ruoat };
};

/**
 * Palauttaa satunnaisen arvon annetusta taulukosta
 * @param {object[]} taulukko
 * @return {object}
 */
Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
  return taulukko[Math.floor(Math.random() * taulukko.length)];
};

/**
 * Laskee summan annettujen boolean parametrien mukaisesti.
 * Jos parametrit eivÃ¤t ole tyyppiÃ¤ boolean, heittÃ¤Ã¤ TypeErrorin.
 * 'loppuSumma' muuttujaan lisÃ¤tÃ¤Ã¤n automaattisesti 'paaruokaHinta', ja loput hinnat sitten parametrien mukaisesti.
 * Palauttaa lopussa 'loppuSumma'.
 * @param {object[]} ruoat-taulukko ruoka-olioita
 * @return {number} Tilauksen loppusumma
 */
Ravintola.prototype.laskeLasku = function (ruoat) {
  return ruoat.reduce((summa, ruoka) => summa + ruoka.hinta, 0);
};

const ravintola = new Ravintola();

export default ravintola;
