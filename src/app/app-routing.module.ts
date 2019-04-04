import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {routes} from '@services/routes/routes.service';
import {IndexPageComponent} from '@pages/index-page/index-page.component';
import {NotFoundPageComponent} from '@pages/not-found-page/not-found-page.component';

const r: Routes = [
    {path: routes.index, component: IndexPageComponent},
    {path: 'f/:filter', component: IndexPageComponent},
    {path: routes.notFound, component: NotFoundPageComponent},
    {path: '**', redirectTo: '/' + routes.notFound},
];

@NgModule({
    imports: [RouterModule.forRoot(r, {
        initialNavigation: 'enabled'
    })],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}

