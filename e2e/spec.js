describe('greet message', function() {
  it('should say hello protractor if protractor is passed', function() {
    browser.get('/');

    element(by.model('greetMe')).clear().sendKeys('protractor');

    expect(element(by.css('#greet')).getText()).toEqual('hello protractor');
  });
});