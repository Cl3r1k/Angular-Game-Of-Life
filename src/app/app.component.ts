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

    lengthX = 30;
    lengthY = 50;
    speed = 5;

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

        this.resetGrid();
    }

    toggleSocialIconsState() {
        this.hiddenSocialIcons = !this.hiddenSocialIcons;
    }

    toggle(x: number, y: number) {
        // console.log('x: %d, y: %d, content is: %d', x, y, this.grid[x][y]);
        this.grid[x][y] = this.grid[x][y] === 0 ? 1 : 0;
    }

    resetGrid() {
        this.grid = [];

        for (let x = 0; x < this.lengthX; x++) {
            const row: number[] = [];
            for (let y = 0; y < this.lengthY; y++) {
                row.push(Math.round(Math.random() - 0.2));    // Decrease random on 0.2 to get less 'alive' cells
            }
            this.grid.push(row);
        }
    }

    setGridSize(lengthX: number, lengthY: number) {
        this.lengthX = lengthX;
        this.lengthY = lengthY;
        this.resetGrid();
    }

    setSpeed(speed: number) {
        this.speed = speed;
    }
}
