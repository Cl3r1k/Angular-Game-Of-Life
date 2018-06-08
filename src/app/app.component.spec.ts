import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let runBtnEl;
    let togglePauseBtnEl;
    let resetStateBtnEl;
    let generateStateBtnEl;
    let setGridSize1BtnEl;
    let setGridSize2BtnEl;
    let setGridSize3BtnEl;
    let setSpeed1BtnEl;
    let setSpeed2BtnEl;
    let setSpeed3BtnEl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        runBtnEl = fixture.debugElement.query(By.css('.run'));       // Find 'run' button element
        togglePauseBtnEl = fixture.debugElement.query(By.css('.togglePause'));       // Find 'togglePause' button element
        resetStateBtnEl = fixture.debugElement.query(By.css('.resetState'));       // Find 'resetState' button element
        generateStateBtnEl = fixture.debugElement.query(By.css('.generateState'));       // Find 'generateState' button element
        setGridSize1BtnEl = fixture.debugElement.query(By.css('.setGridSize1'));       // Find 'setGridSize1' button element
        setGridSize2BtnEl = fixture.debugElement.query(By.css('.setGridSize2'));       // Find 'setGridSize2' button element
        setGridSize3BtnEl = fixture.debugElement.query(By.css('.setGridSize3'));       // Find 'setGridSize3' button element
        setSpeed1BtnEl = fixture.debugElement.query(By.css('.setSpeed1'));       // Find 'setSpeed1' button element
        setSpeed2BtnEl = fixture.debugElement.query(By.css('.setSpeed2'));       // Find 'setSpeed2' button element
        setSpeed3BtnEl = fixture.debugElement.query(By.css('.setSpeed3'));       // Find 'setSpeed3' button element

        // console.log('%crunBtnEl: ', 'color: red;', runBtnEl);
        // console.log('%ctogglePauseBtnEl: ', 'color: red;', togglePauseBtnEl);
        // console.log('%cresetStateBtnEl: ', 'color: red;', resetStateBtnEl);

        fixture.detectChanges();
    });

    it('should create the app', () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    it('should render title in a h2 tag', () => {
        // Arrange

        // Act
        const compiled = fixture.debugElement.nativeElement;

        // Assert
        expect(compiled.querySelector('h2').textContent).toContain('Angular Game of Life (click here to learn more)');
    });

    it(`should have initial params`, () => {
        // Arrange

        // Act

        // Assert
        expect(component.hiddenSocialIcons).toBe(false, 'actually hiddenSocialIcons should be true, but changed in ngOnInit');
        expect(component.iconsHovered).toEqual(false);
        expect(component.generation).toEqual(0);
        expect(component.lengthX).toEqual(30);
        expect(component.lengthY).toEqual(50);
        expect(component.speed).toEqual(5);
        expect(component.isAlive).toEqual(true);
        expect(component.pauseState).toEqual(false);
        expect(component.generateState).toEqual(true);
        expect(component.resetState).toEqual(false);
        expect(component.grid).toBeTruthy();
    });

    describe('#initApp', () => {
        it(`should init app with initial params`, () => {
            // Arrange

            // Act
            component.initApp();

            // Assert
            expect(component.hiddenSocialIcons).toEqual(false);
            expect(component.generateState).toEqual(true);
            expect(component.isAlive).toEqual(true);
        });
    });

    describe('#toggleSocialIconsState', () => {
        it(`should revert 'hiddenSocialIcons' state`, () => {
            // Arrange
            component.hiddenSocialIcons = true;

            // Act
            component.toggleSocialIconsState();

            // Assert
            expect(component.hiddenSocialIcons).toEqual(false);
        });
    });

    describe('#toggle', () => {
        it(`should revert state for given cell`, () => {
            // Arrange

            // Act
            component.generateGrid(0);  // Clear grid before toggle
            component.toggle(0, 0);

            // Assert
            expect(component.grid[0][0]).toEqual(1);
        });
    });

    describe('#generateGrid', () => {
        it(`should generate grid according state 1`, () => {
            // Arrange

            // Act
            component.generateGrid(1);
            let counterAlive = 0;
            component.grid.map(row => {
                row.map(cell => {
                    if (cell === 1) {
                        counterAlive++;
                    }
                });
            });

            // Assert
            expect(counterAlive > 0).toEqual(true);
        });

        it(`should clear grid according state 0`, () => {
            // Arrange

            // Act
            component.generateGrid(1);  // Generate random field before clear
            component.generateGrid(0);
            let counterAlive = 0;
            component.grid.map(row => {
                row.map(cell => {
                    if (cell === 1) {
                        counterAlive++;
                    }
                });
            });

            // Assert
            expect(counterAlive > 0).toEqual(false);
        });
    });

    describe('#togglePause', () => {
        it(`should toggle 'pauseState'`, () => {
            // Arrange
            component.pauseState = false;

            // Act
            component.togglePause();

            // Assert
            expect(component.pauseState).toEqual(true);
        });
    });

    describe('#setGridSize', () => {
        it(`should set 'lengthX' and 'lengthY' to given value`, async(() => {
            // Arrange - restore initial values
            component.lengthX = 0;
            component.lengthY = 0;

            // Act
            component.setGridSize(50, 70);

            // Assert
            expect(component.lengthX).toEqual(50);
            expect(component.lengthY).toEqual(70);
        }));
    });

    describe('#setSpeed', () => {
        it(`should set 'speed' to given value`, async(() => {
            // Arrange
            component.speed = 0;

            // Act
            component.setSpeed(5);

            // Assert
            expect(component.speed).toEqual(5);
        }));
    });

    describe('#run', () => {
        it(`should run the process`, () => {
            // Arrange
            component.isAlive = false;
            component.interval = null;

            // Act
            component.run();

            // Assert
            expect(component.isAlive).toEqual(true);
            expect(component.interval).toBeTruthy();
        });
    });

    describe('#performPass', () => {
        it(`should run the process`, () => {
            // Arrange

            // Act
            component.generateGrid(1);
            let counterAliveOriginal = 0;
            component.grid.map(row => {
                row.map(cell => {
                    if (cell === 1) {
                        counterAliveOriginal++;
                    }
                });
            });

            component.performPass();
            let counterAliveNew = 0;
            component.grid.map(row => {
                row.map(cell => {
                    if (cell === 1) {
                        counterAliveNew++;
                    }
                });
            });

            // Assert
            expect(counterAliveOriginal === counterAliveNew).toEqual(false);
        });
    });

    describe(`#view tests`, () => {
        it(`clicking on button.run should call method 'run()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'run');
            if (runBtnEl instanceof HTMLElement) {
                runBtnEl.click();
            } else {
                runBtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.run).toHaveBeenCalled();
            });
        });

        it(`clicking on button.togglePause should call method 'togglePause()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'togglePause');
            if (togglePauseBtnEl instanceof HTMLElement) {
                togglePauseBtnEl.click();
            } else {
                togglePauseBtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.togglePause).toHaveBeenCalled();
            });
        });

        it(`clicking on button.resetState should call method 'generateGrid()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'generateGrid');
            if (resetStateBtnEl instanceof HTMLElement) {
                resetStateBtnEl.click();
            } else {
                resetStateBtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.generateGrid).toHaveBeenCalled();
            });
        });

        it(`clicking on button.generateState should call method 'generateGrid()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'generateGrid');
            if (generateStateBtnEl instanceof HTMLElement) {
                generateStateBtnEl.click();
            } else {
                generateStateBtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.generateGrid).toHaveBeenCalled();
            });
        });

        it(`clicking on button.setGridSize1 should call method 'setGridSize()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'setGridSize');
            if (setGridSize1BtnEl instanceof HTMLElement) {
                setGridSize1BtnEl.click();
            } else {
                setGridSize1BtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.setGridSize).toHaveBeenCalled();
            });
        });

        it(`clicking on button.setGridSize2 should call method 'setGridSize()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'setGridSize');
            if (setGridSize2BtnEl instanceof HTMLElement) {
                setGridSize2BtnEl.click();
            } else {
                setGridSize2BtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.setGridSize).toHaveBeenCalled();
            });
        });

        it(`clicking on button.setGridSize3 should call method 'setGridSize()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'setGridSize');
            if (setGridSize3BtnEl instanceof HTMLElement) {
                setGridSize3BtnEl.click();
            } else {
                setGridSize3BtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.setGridSize).toHaveBeenCalled();
            });
        });

        it(`clicking on button.setSpeed1 should call method 'setSpeed()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'setSpeed');
            if (setSpeed1BtnEl instanceof HTMLElement) {
                setSpeed1BtnEl.click();
            } else {
                setSpeed1BtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.setSpeed).toHaveBeenCalled();
            });
        });

        it(`clicking on button.setSpeed2 should call method 'setSpeed()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'setSpeed');
            if (setSpeed2BtnEl instanceof HTMLElement) {
                setSpeed2BtnEl.click();
            } else {
                setSpeed2BtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.setSpeed).toHaveBeenCalled();
            });
        });

        it(`clicking on button.setSpeed3 should call method 'setSpeed()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'setSpeed');
            if (setSpeed3BtnEl instanceof HTMLElement) {
                setSpeed3BtnEl.click();
            } else {
                setSpeed3BtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.setSpeed).toHaveBeenCalled();
            });
        });
    });
});
