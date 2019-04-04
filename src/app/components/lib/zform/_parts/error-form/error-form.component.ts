import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-zform-error',
    templateUrl: './error-form.component.html',
    styleUrls: ['./error-form.component.less']
})
export class ErrorFormComponent implements OnInit {

    @Input() error: string;
    @Input() class: string;

    constructor() {
    }

    ngOnInit() {
        if (!this.class) {
            this.class = 'form-field-error';
        }
    }

}
