const chai = require("chai");
const { expect } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const wd = require("wd");
const config = require("../config");

const url = "https://e2e-boilerplate.github.io/sandbox/";

chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("Sandbox", () => {
  let browser;

  before(function fn() {
    this.timeout(50000);
    browser = wd.promiseChainRemote();
    return config(url, browser);
  });

  after(() => {
    return browser.quit();
  });

  it("should be on Sandbox", () => {
    return browser.title().then((title) => {
      expect(title).to.eql("Sandbox");
    });
  });

  it("should have a page header", () => {
    return browser
      .elementByTagName("h1")
      .text()
      .then((header) => {
        expect(header).to.eql("Sandbox");
      });
  });
}).timeout(50000);
