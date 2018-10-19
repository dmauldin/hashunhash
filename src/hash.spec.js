var { hash, unhash } = require("./hash.js");

describe("hash", () => {
  it("correctly hashes 'leepadg'", () => {
    expect(hash("leepadg").toString()).toBe("680131659347");
  });

  it("correctly hashes 'promenade'", () => {
    expect(hash("promenade").toString()).toBe("945924806726376");
  });
  it("correctly hashes 'promenadeade", () => {
    expect(hash("promenadeade").toString()).toBe("47913929235111123605");
  });
  it("correctly hashes 'westernista", () => {
    expect(hash("westernista").toString()).toBe("1317985395604951854");
  });
});

describe("unhash", () => {
  it("correctly unhashes 680131659347 with length of 7", () => {
    expect(unhash("680131659347", 7)).toBe("leepadg");
  });

  it("correctly unhashes 945924806726376 with length of 9", () => {
    expect(unhash("945924806726376", 9)).toBe("promenade");
  });

  it("correctly unhashes 1317985395604951854 with length of 11", () => {
    expect(unhash("1317985395604951854", 11)).toBe("westernista");
  });

  it("correctly unhashes 1317985395604951854 without length", () => {
    expect(unhash("1317985395604951854")).toBe("westernista");
  });
});
