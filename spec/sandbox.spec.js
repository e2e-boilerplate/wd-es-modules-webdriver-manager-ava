import test from "ava";
import * as wd from "wd";
import config from "../config";

const url = "https://e2e-boilerplate.github.io/sandbox/";

let browser;

test.before(async () => {
  browser = wd.promiseChainRemote();
  return config(url, browser);
});

test.after(async () => {
  return browser.quit();
});

test("should be on Sandbox", async (t) => {
  t.timeout(50000);
  return browser.title().then((title) => {
    t.is(title, "Sandbox");
  });
});

test("should have a page header", async (t) => {
  t.timeout(50000);
  return browser
    .elementByTagName("h1")
    .text()
    .then((header) => {
      t.is(header, "Sandbox");
    });
});
