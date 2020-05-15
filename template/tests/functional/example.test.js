describe('test UI', () => {
  it('shoueld show component', async () => {
    const page = await browser.newPage();
    await page.goto(`${TEST_URL}/example/index.html`);
    expect(await page.screenshot()).toMatchImageSnapshot();
  });
});
