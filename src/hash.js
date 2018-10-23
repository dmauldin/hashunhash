const BN = require("bn.js");

const letters = "acdegilmnoprstuw";
const prime = 37;
const base = 7;

function hash(str = "") {
  let hsh = new BN(base, 10);
  for (let i = 0; i < str.length; i++) {
    // i prefix = inline, n suffix = argument is a JS Number (not a BN object)
    hsh.imuln(prime).iaddn(letters.indexOf(str[i]));
  }
  return hsh;
}

function unhash(hsh = 0, len = 0) {
  // initial value, mod 37 is the final index
  // initial value divided by 37 is the next value

  const maxGuessLength = 23;
  let hv = new BN(hsh, 10);

  // if no length is provided, let's at least take a guess
  if (len < 1) {
    // iterate through lengths starting from 1 to see if we get any matches
    // could be optimized to start with a min length based on the size of hsh
    for (let il = 1; il < maxGuessLength; il++) {
      const s = unhash(hv.toString(10), il);
      if (s.length > 0) {
        return s;
      }
    }
  } else {
    let chars = []
    while (hv > 7) {
      const rem = hv.modn(prime);
      hv.idivn(prime);
      chars.unshift(letters[rem]);
    }
    return chars.join('');
  }
}

module.exports = { hash, unhash };
