import { AppPage } from './app.po';

describe('angular-to-do-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Todo message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Todo list(v_0.0.3)');
  });
});
