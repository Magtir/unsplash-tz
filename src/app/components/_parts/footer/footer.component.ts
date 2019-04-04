import {Component, OnInit} from '@angular/core';
import {routes} from '@services/routes/routes.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {


    r = routes;

    constructor() {
    }

    ngOnInit() {
    }
}
