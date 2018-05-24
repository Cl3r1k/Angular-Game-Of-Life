import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    hiddenSocialIcons = true;
    iconsHovered = false;
    generation = 0;

    lengthX = 50;
    lengthY = 70;
    speed = 3;
    interval;
    isAlive = false;
    pauseState = false;

    grid = [];
    // grid = [
    //     [ 0, 0, 1, 1, 1, 0, 0 ],
    //     [ 0, 0, 0, 1, 0, 0, 0 ],
    //     [ 0, 0, 1, 1, 0, 0, 0 ],
    //     [ 0, 0, 0, 0, 0, 0, 0 ],
    //     [ 0, 0, 0, 0, 0, 1, 0 ],
    // ];

    constructor() { }

    ngOnInit() {
        this.initApp();
        const el = document.getElementById('loader-wrapper');
        if (el) {
            el.classList.add('loaded');
        }
    }

    initApp() {
        this.hiddenSocialIcons = false;

        this.generateGrid(1);
        this.run();
    }

    toggleSocialIconsState() {
        this.hiddenSocialIcons = !this.hiddenSocialIcons;
    }

    toggle(x: number, y: number) {
        // console.log('x: %d, y: %d, content is: %d', x, y, this.grid[x][y]);
        this.grid[x][y] = this.grid[x][y] === 0 ? 1 : 0;
    }

    // clearGrid() {
    //     this.generation = 0;
    //     clearInterval(this.interval);

    //     this.grid = [];

    //     for (let x = 0; x < this.lengthX; x++) {
    //         const row: number[] = [];
    //         for (let y = 0; y < this.lengthY; y++) {
    //             row.push(0);
    //         }
    //         this.grid.push(row);
    //     }
    // }

    generateGrid(state: number) {
        this.generation = 0;
        clearInterval(this.interval);
        this.isAlive = false;
        this.pauseState = false;

        this.grid = [];

        for (let x = 0; x < this.lengthX; x++) {
            const row: number[] = [];
            for (let y = 0; y < this.lengthY; y++) {
                if (!state) {
                    row.push(0);
                } else {
                    row.push(Math.round(Math.random() - 0.2));    // Decrease random on 0.2 to get less 'alive' cells
                }
            }
            this.grid.push(row);
        }
    }

    togglePause() {
        this.pauseState = !this.pauseState;
    }

    setGridSize(lengthX: number, lengthY: number) {
        this.lengthX = lengthX;
        this.lengthY = lengthY;
        this.generateGrid(1);
    }

    setSpeed(speed: number) {
        this.speed = speed;

        if (this.isAlive) {
            clearInterval(this.interval);
            this.run();
        }
    }

    run() {

        if (!this.isAlive) {
            this.isAlive = true;

            this.interval = setInterval(() => {

                if (!this.pauseState) {
                    this.generation++;
                    this.performPass();
                }

            }, 500 / (this.speed * 1.4));
        }
    }

    performPass() {
        const metaGrid = [];

        for (let x = 0; x < this.lengthX; x++) {
            const row: number[] = [];
            for (let y = 0; y < this.lengthY; y++) {
                let cell: number;

                let neighbors = 0;

                // ╔
                if (this.grid[x - 1 < 0 ? this.lengthX - 1 : x - 1][y - 1 < 0 ? this.lengthY - 1 : y - 1] === 1) {
                    neighbors++;
                }

                // ╦
                if (this.grid[x - 1 < 0 ? this.lengthX - 1 : x - 1][y] === 1) {
                    neighbors++;
                }

                // ╗
                if (this.grid[x - 1 < 0 ? this.lengthX - 1 : x - 1][y + 1 > this.lengthY - 1 ? 0 : y + 1] === 1) {
                    neighbors++;
                }

                // ╣
                if (this.grid[x][y + 1 > this.lengthY - 1 ? 0 : y + 1] === 1) {
                    neighbors++;
                }

                // ╝
                if (this.grid[x + 1 > this.lengthX - 1 ? 0 : x + 1][y + 1 > this.lengthY - 1 ? 0 : y + 1] === 1) {
                    neighbors++;
                }

                // ╩
                if (this.grid[x + 1 > this.lengthX - 1 ? 0 : x + 1][y] === 1) {
                    neighbors++;
                }

                // ╚
                if (this.grid[x + 1 > this.lengthX - 1 ? 0 : x + 1][y - 1 < 0 ? this.lengthY - 1 : y - 1] === 1) {
                    neighbors++;
                }

                // ╠
                if (this.grid[x][y - 1 < 0 ? this.lengthY - 1 : y - 1] === 1) {
                    neighbors++;
                }

                // console.log('cell[%d][%d] has neighbors: ', x, y, neighbors);

                if ((this.grid[x][y] === 0 && neighbors === 3) || this.grid[x][y] === 1 && (neighbors === 2 || neighbors === 3)) {
                    cell = 1;
                } else {
                    cell = 0;
                }

                row.push(cell);
            }
            metaGrid.push(row);
        }

        let active = false;
        for (let x = 0; x < this.lengthX; x++) {
            for (let y = 0; y < this.lengthY; y++) {
                if (metaGrid[x][y] === 1) {
                    active = true;
                    break;
                }
            }
        }

        this.grid = metaGrid;

        if (!active) {
            clearInterval(this.interval);
            this.generation = 0;
            this.isAlive = false;
            this.generation = 0;
        }
    }
}
