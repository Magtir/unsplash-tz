import {Component, OnInit} from '@angular/core';
import {routes} from '@services/routes/routes.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.less',
    ]
})
export class HeaderComponent implements OnInit {

    r = routes;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    onSubmit(input: any) {
        if (input.value) {
            this.router.navigate(['/f/' + input.value]);
            input.value = '';
        } else {
            this.router.navigate(['/' + this.r.index]);
        }
    }
}
