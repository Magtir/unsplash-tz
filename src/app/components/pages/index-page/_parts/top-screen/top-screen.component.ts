import {Component, Input, OnInit} from '@angular/core';
import {routes} from '@services/routes/routes.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-top-screen',
    templateUrl: './top-screen.component.html',
    styleUrls: [
        './top-screen.component.less',
        './search-title.component.less',
    ]
})
export class TopScreenComponent implements OnInit {

    r = routes;
    @Input() filterRoute: string;
    text: string;

    constructor(private router: Router) {
    }

    ngOnInit() {
        if (this.filterRoute) {
            switch (this.filterRoute) {
                case this.r.filterWallpapers:
                    this.text = 'Free stunning HD wallpapers for your mobile and desktop screens.';
                    break;

                case this.r.filterTexturesAndPatterns:
                    this.text = 'Find your next perfect texture or pattern in high-quality.';
                    break;

                case this.r.filterNature:
                    this.text = 'Featuring the wild and beautiful Earth from the eyes of photographers worldwide.';
                    break;

                case this.r.filterCurrentEvents:
                    this.text = 'Covering the latest important events and movements from around the world.';
                    break;

                case this.r.filterArchitecture:
                    this.text = 'Discover a new appreciation for the world of architecture, ' +
                        'featuring buildings and structures from around the world.';
                    break;

                case this.r.filterBusinessAndWork:
                    this.text = 'Discover the perfect photo of work for your business.';
                    break;

                case this.r.filterAnimals:
                    this.text = 'Featuring wildlife photographers as they explore the beauty of the natural world.';
                    break;

                case this.r.filterTravel:
                    this.text = 'Featuring travellers from around the world as they explore destinations & adventures.';
                    break;

                case this.r.filterFashion:
                    this.text = 'Featuring the work of fashion photographers that push the boundaries of beauty and style.';
                    break;

                case this.r.filterFoodAndDrink:
                    this.text = 'Featuring the best food and drink photos showcasing the world of culinary delights.';
                    break;

                case this.r.filterSpirituality:
                    this.text = 'Exploring themes of love and loss, challenge and transformation, gratitude and celebration, ' +
                        'healing and forgiveness in the hopes of helping us understand life\'s bigger purpose.';
                    break;

                case this.r.filterExperimental:
                    this.text = 'Featuring images that push the boundaries of what is possible in photography.';
                    break;

                case this.r.filterPeople:
                    this.text = 'Beautiful people, captured. Featuring photos of subjects of all' +
                        ' ages and ethnicities, from candid portraits, to styled lifestyle shoots.';
                    break;

                case this.r.filterHealth:
                    this.text = 'Exploring themes of wellness, health, and an active lifestyle.';
                    break;

                case this.r.filterArtsAndCulture:
                    this.text = 'Discover the best in art, literature, music, and popular culture from around the world.';
                    break;
            }
        }
    }

    onSubmit(filter: string) {
        if (filter) {
            this.router.navigate(['/f/' + filter]);
        } else {
            this.router.navigate(['/' + this.r.index]);
        }
    }
}
