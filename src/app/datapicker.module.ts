import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FileDropModule} from 'ngx-file-drop';

@NgModule({
    imports: [CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        FileDropModule
    ],
    exports: [CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        FileDropModule
    ],
})
export class DatapickerModule {
}
