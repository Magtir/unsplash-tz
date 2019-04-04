import {Component, OnInit} from '@angular/core';
import {HelpService} from '@services/help/help.service';

@Component({
    selector: 'app-scroll-top',
    templateUrl: './scroll-top.component.html',
    styleUrls: ['./scroll-top.component.less']
})
export class ScrollTopComponent implements OnInit {

    show: boolean;

    constructor() {
        this.show = false;
    }

    ngOnInit() {
        window.addEventListener('scroll', () => {
            this.show = window.pageYOffset > 400;
        }, true);
    }

    scrollUp() {
        window.scroll(0, 0);
    }
}
