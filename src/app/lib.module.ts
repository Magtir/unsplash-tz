import {ModuleWithProviders, NgModule} from '@angular/core';

import {TransferHttpModule} from '@gorniv/ngx-universal';

@NgModule({
    exports: [TransferHttpModule]
})
export class LibModule {
    static forRoot(): ModuleWithProviders {
        return {ngModule: LibModule};
    }
}
