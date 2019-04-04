import {Component, OnInit} from '@angular/core';
import {TitleService} from '../../../services/title/title.service';
import {LoaderService} from '../../_parts/loader/services/loader/loader.service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.less']
})
export class NotFoundPageComponent implements OnInit {

    constructor(private ts: TitleService,
                public ls: LoaderService) {
    }

    ngOnInit() {
        this.ts.setTitle('Страница не найдена');

        this.ls.loaderOff();
    }

}
