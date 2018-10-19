const BN = require("bn.js");

const letters = "acdegilmnoprstuw";
const prime = 37;
const base = 7;
const minHash = prime * base;

function hash(str = "") {
  let hsh = new BN(base, 10);
  for (let i = 0; i < str.length; i++) {
    // i prefix = inline, n suffix = argument is a JS Number (not a BN object)
    hsh.imuln(prime).iaddn(letters.indexOf(str[i]));
  }
  return hsh;
}

function unhash(hsh = 0, len = 0) {
  if (hsh <= minHash) {
    return "";
  }

  const maxGuessLength = 23;
  const hv = new BN(hsh, 10);
  let winner = "";

  // if no length is provided, let's at least take a guess
  // (could also determine if the hash function is collision free and then this
  // might not be a guess, at all)
  if (len < 1) {
    // iterate through lengths starting from 1 to see if we get any matches
    // could be optimized to start with a min length based on the size of hsh
    for (let il = 1; il < maxGuessLength; il++) {
      const s = unhash(hv.toString(10), il);
      if (s.length > 0) {
        return s;
      }
    }
  }

  // iterate over the positions in the original string based on the given length
  for (let i = 0; i < len; i++) {
    // iterate over the possible characters for this position in the original string
    for (let letterIndex = 0; letterIndex < letters.length; letterIndex++) {
      const letter = letters[letterIndex];
      // TODO: optimize by using a binary search instead of linearly finding the next letter
      const high = (winner + letter).padEnd(len, "w");
      const highHash = hash(high);

      if (hv.lte(highHash)) {
        // only compute the lower bound if the original value is under the high bound
        const low = (winner + letter).padEnd(len, "a");
        const lowHash = hash(low);
        if (hv.gte(lowHash)) {
          // correct letter for winner[i] found as letters[letterIndex]
          winner += letter;
          break;
        }
      }
    }
  }

  return winner;
}

module.exports = { hash, unhash };
