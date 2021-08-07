const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.2dehands.be/l/fietsen-en-brommers/fietsen-racefietsen/');

  // Get the "viewport" of the page, as reported by the page.
  const listing = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("li.mp-Listing--list-item > a")).map(item => {return {"url": item.href};});
  });


  for await (item of listing) {
    await page.goto(item.url);
    const getPrice = await page.evaluate(() => {
      return document.querySelector('.price').innerText;

    })
    item.price = getPrice;
  }

  console.log(listing);

  await browser.close();
})();
