import { AppPage } from './app.po';

describe('angular-game-of-life App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Angular Game of Life (click here to learn more)');
    });
});
