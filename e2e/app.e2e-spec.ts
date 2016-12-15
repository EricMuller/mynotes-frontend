import { MynotesFrontendPage } from './app.po';

describe('mynotes-frontend App', function() {
  let page: MynotesFrontendPage;

  beforeEach(() => {
    page = new MynotesFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
