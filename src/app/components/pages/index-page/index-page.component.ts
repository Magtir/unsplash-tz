import {Component, HostListener, OnInit} from '@angular/core';
import {RestApiService} from '@services/restApi/rest-api.service';
import {TitleService} from '@services/title/title.service';
import {LoaderService} from '@_parts/loader/services/loader/loader.service';
import {ActivatedRoute} from '@angular/router';
import {HelpService} from '@services/help/help.service';
import {UniversalStorage} from '@lib/storage/universal.storage';

@Component({
    selector: 'app-index',
    templateUrl: './index-page.component.html',
    styleUrls: [
        './index-page.component.less',
        '../../../../../node_modules/ng-masonry-grid/ng-masonry-grid.css',
    ],
})
export class IndexPageComponent implements OnInit {

    filter: string;
    load = false;
    page = 1;
    c = 0;
    column0 = [];
    column1 = [];
    column2 = [];
    total_pages: number;

    constructor(
        private api: RestApiService,
        private ts: TitleService,
        public ls: LoaderService,
        private route: ActivatedRoute,
        private helpService: HelpService,
        private storage: UniversalStorage,
    ) {
    }

    @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
        if (this.helpService.definePercentScrollHeight() === 100) {
            if (this.load) {
                this.initPhotos();
            }
        } else {
            this.load = true;
        }
    }

    ngOnInit() {
        this.ts.setTitle();
        this.initPhotos();
        this.ls.loaderOff();
    }

    initPhotos() {
        this.load = false;
        this.filter = this.route.snapshot.paramMap.get('filter');
        if (this.filter) {
            this.searchPhotos();
        } else {
            this.getPhotos();
        }
    }

    getPhotos() {
        this.api.get('/photos?page=' + this.page + '&per_page=30', (res) => {
            if (res) {
                this.formatColumn(res);
            }

            this.load = true;
        });
    }

    searchPhotos() {
        this.api.get('/search/photos?page=' + this.page + '&per_page=30&query=' + this.filter, (res) => {
            if (res && res.results.length > 0 && (!this.total_pages || this.page < this.total_pages)) {
                this.total_pages = res.total_pages;
                this.formatColumn(res.results);
            }

            this.load = true;
        });
    }

    formatColumn(arr = []) {
        for (const item of arr) {

            if (this.storage.getItem(item.id)) {
                item.liked_by_user = true;
                item.likes++;
            }

            switch (this.c) {
                case 0:
                    this.column0.push(item);
                    break;
                case 1:
                    this.column1.push(item);
                    break;
                case 2:
                    this.column2.push(item);
                    break;
            }

            this.c++;
            if (this.c > 2) {
                this.c = 0;
            }
        }

        this.page++;
    }
}
