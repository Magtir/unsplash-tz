import {Injectable, OnInit} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TitleService implements OnInit {
    titlePrefix = 'TZ';
    titleDelimiter = ' - ';

    constructor() {
    }

    ngOnInit() {
    }

    setTitle(text: string = null) {
        let title = this.titlePrefix;

        if (text) {
            title += this.titleDelimiter + text;
        }
        document.title = title;
    }
}
