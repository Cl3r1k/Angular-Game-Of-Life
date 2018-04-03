import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    hiddenSocialIcons = true;
    iconsHovered = false;

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
    }

    toggleSocialIconsState() {
        this.hiddenSocialIcons = !this.hiddenSocialIcons;
    }
}
