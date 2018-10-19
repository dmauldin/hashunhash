const BN = require("bn.js");

const letters = "acdegilmnoprstuw";
const prime = 37;
const base = 7;
const minHash = prime * base;

function hash(s = "") {
  let h = new BN(base, 10);
  for (var i = 0; i < s.length; i++) {
    // i prefix = inline, n suffix = argument is a JS Number (not a BN object)
    h.imuln(prime).iaddn(letters.indexOf(s[i]));
  }
  return h;
}

function unhash(n = 0, len = 0) {
  if (n <= minHash) {
    return "";
  }

  const maxGuessLength = 23;
  const hv = new BN(n, 10);
  let winner = "";

  // if no length is provided, let's at least take a guess
  if (len < 1) {
    // iterate through lengths starting from 1 to see if we get any matches
    for (let il = 1; il < maxGuessLength; il++) {
      const s = unhash(hv.toString(10), il);
      if (s.length > 0) {
        return s;
      }
    }
  }

  for (let i = 0; i < len; i++) {
    for (let letterIndex = 0; letterIndex < letters.length; letterIndex++) {
      const letter = letters[letterIndex];
      // TODO: optimize
      const high = (winner + letter).padEnd(len, "w");
      const highHash = hash(high);

      if (hv.lte(highHash)) {
        // only compute the lower bound if the original value is under the high bound
        const low = (winner + letter).padEnd(len, "a");
        const lowHash = hash(low);
        if (hv.gte(lowHash)) {
          // correct letter for result[i] found as letters[letterIndex]
          winner += letter;
          break;
        }
      }
    }
  }

  return winner;
}

module.exports = { hash, unhash };
