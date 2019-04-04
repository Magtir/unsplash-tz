import {Component, OnInit} from '@angular/core';
import {ZFieldComponent} from './zfield/zfield.component';

@Component({
    selector: 'app-zform',
    templateUrl: './zform.component.html',
    styleUrls: ['./zform.component.less']
})
export class ZFormComponent implements OnInit {
    loNotEmpty: any;
    duplicate = [];
    notDuplicate = [];

    errors: any = [];
    error: string;

    f: any;
    model = {};

    // Принимает строковое значение имени полей, из которых должно быть хотя бы одно заполнено
    optLoNotEmpty(arr: string[]) {
        this.loNotEmpty = arr;
        return this;
    }

    // Принимает строковое значение имени полей, которые должны совпадать
    optDuplicate(arr: string[]) {
        console.log('НЕ РЕАЛИЗОВАНО');
        this.duplicate = arr;
        return this;
    }

    // Принимает строковое значение имени полей, которые НЕ должны совпадать
    optNotDuplicate(arr: string[]) {
        console.log('НЕ РЕАЛИЗОВАНО');
        this.notDuplicate = arr;
        return this;
    }

    // получить ошибку формы
    setError(err: string) {
        this.error = err;
    }

    // установить ошибку для формы
    getError() {
        return this.error;
    }

    // что будет считаться за empty
    // задается при инициализации поля
    // пример
    // zform = new ZFormComponent()
    // zform.f = {
    //  name: zform.initField(''),
    // }
    initFiled(emptyWhat: any) {
        const f = new ZFieldComponent();
        f.emptyWhat = emptyWhat;
        return f;
    }

    // валидирует все подключеные поля в форме
    valid() {
        this.errors = [];
        let valid = true;

        if (!this.validProperty(this.f)) {
            valid = false;
        }

        if (!valid) {
            // console.log(this.errors);
        }

        return valid;
    }

    // валидирует объект с формами
    // можно передать в массиве имена полей, которые нужно проверять в отрезке объекта
    validProperty(prop: any, namesFiled: string[] = []) {
        let valid = true;
        for (const name in prop) {
            if (namesFiled.length === 0 || namesFiled.indexOf(name) !== -1) {
                const field = prop[name];

                if (field instanceof ZFieldComponent) {
                    if (!this.validField(field, name)) {
                        valid = false;
                    }
                } else {
                    if (field instanceof Array) {
                        field.forEach((f) => {
                            if (field instanceof ZFieldComponent) {
                                if (!this.validField(f, name)) {
                                    valid = false;
                                }
                            }
                        });
                    }
                    if (field instanceof Object) {
                        if (!this.validProperty(field)) {
                            valid = false;
                        }
                    }
                }
            }
        }

        return valid;
    }

    // валидирует одно поле в форме. Принимает строкой название поля
    validField(field: ZFieldComponent, nameField: string) {
        let valid = true;

        field.clearError();

        if (field.arr && field.error === '') {
            if (field.minLenArr > 0 && field.error === '') {
                if (!field.validMinLenArr()) {
                    field.setError(field.errorMinLenArr || field.initErrorMinLenArr());
                }
            }

            if (field.maxLenArr > 0 && !field.autoDecrementLenArr && field.error === '') {
                if (!field.validMaxLenArr()) {
                    field.setError(field.errorMaxLenArr || field.initErrorMaxLenArr());
                }
            }
        }

        if (!field.empty && field.error === '') {
            if (!field.validEmpty() && !field.bool) {
                let empty = true;

                if (this.loNotEmpty && this.loNotEmpty.indexOf(nameField) !== -1) {
                    this.loNotEmpty.forEach((n) => {
                        if (this.f[n].validEmpty()) {
                            empty = false;

                            this.loNotEmpty.forEach((n2) => {
                                this.f[n2].clearError();
                            });

                            return;
                        }
                    });
                }

                if (empty) {
                    field.setError(field.errorEmpty);
                }
            }
        }

        if (field.phone && field.error === '') {
            if (!field.validPhone()) {
                field.setError(field.errorPhone);
            }
        }

        if (field.email && field.error === '') {
            if (!field.validEmail()) {
                field.setError(field.errorEmail);
            }
        }

        if (field.number && field.error === '') {
            if (!field.validNumber()) {
                field.setError(field.errorNumber);
            }
        }

        if (field.minLen > 0 && field.error === '') {
            if (!field.validMinLen()) {
                field.setError(field.errorMinLen || field.initErrorMinLen());
            }
        }

        if (field.maxLen > 0 && field.error === '') {
            if (!field.validMaxLen()) {
                field.setError(field.errorMaxLen || field.initErrorMaxLen());
            }
        }

        if (field.error !== '') {
            this.errors.push({
                name: nameField,
                value: field.valueBase,
                error: field.error
            });
            valid = false;
        }

        return valid;
    }

    validFields(fieldsArr: ValidFieldsArr[]) {
        let valid = true;
        fieldsArr.forEach((item) => {
            if (!this.validField(item.field, item.name)) {
                valid = false;
            }
        });

        return valid;
    }

    // заполняет объект из формы
    fillModel(defaultFields: any = {}) {
        this.model = {};

        for (const name in defaultFields) {
            const df = defaultFields[name];
            this.model[name] = df;
        }

        this.fillModelByPropertyForm(this.f, this.model);

        return this.model;
    }

    ////////////////////////////////////////////////////////////

    // заполнить форму от модели (при этом форма в конструкторе должна полностью повторять структуру объета)
    fillForm(model: any) {
        this.fillFormProperty(this.f, model);
    }

    constructor() {
    }

    ngOnInit() {
    }

    // заполнить модель отдельным объектом из формы
    fillModelByPropertyForm(prop: any, model: any) {
        for (const name in prop) {
            const field = prop[name];
            this.fillModelDetected(field, model, name);
        }
    }

    // заполнить поле модели от одного поля формы
    fillModelByFieldForm(field: ZFieldComponent, model: any, fieldName: any) {
        if (!field.notReq) {
            if (field.bool || field.validEmptyReq()) {
                let val = field.valueReq;

                if (field.bool) {
                    val = !!val;
                }

                if (field.jsonStringifyReq) {
                    val = JSON.stringify(val);
                }

                model[fieldName] = val;
            }
        }
    }

    fillModelDetected(field: any, model: any, propName: any) {
        switch (true) {
            case field instanceof ZFieldComponent:
                if (!model[propName]) {
                    model[propName] = '';
                }
                this.fillModelByFieldForm(field, model, propName);
                break;

            case field instanceof Array:
                if (!model[propName]) {
                    model[propName] = [];
                }

                field.forEach((f, i) => {
                    this.fillModelDetected(f, model[propName], i);
                });
                break;

            case field instanceof Object:
                if (!model[propName]) {
                    model[propName] = {};
                }

                this.fillModelByPropertyForm(field, model[propName]);
        }
    }

    /////////////////////////////////////////////////////

    fillFormDetected(field: any, model: any, nameField: any = null) {
        if (model[nameField]) {
            let val = model[nameField];
            switch (true) {
                case field instanceof ZFieldComponent:
                    if (!field.notRes) {
                        this.fillFormField(field, val);
                    }
                    break;

                case field instanceof Array:
                    if (!(val instanceof Array) && !(val instanceof Object)) {
                        val = JSON.parse(val);
                    }
                    this.fillFormArr(field, val, nameField);
                    break;

                case field instanceof Object:
                    if (!(val instanceof Array) && !(val instanceof Object)) {
                        val = JSON.parse(val);
                    }
                    this.fillFormProperty(field, val);
                    break;
            }
        }
    }

    fillFormArr(fieldsArr: any, valArr: any, propName = null) {
        for (let i = 0; i < valArr.length; i++) {

            switch (true) {
                case fieldsArr[0] instanceof ZFieldComponent:
                    if (!fieldsArr[i + 1] && i + 1 < valArr.length) {
                        fieldsArr[i + 1] = this.cloneField(fieldsArr[0]);
                    }
                    break;

                case fieldsArr[0] instanceof Array:
                    if (!fieldsArr[i + 1] && i + 1 < valArr.length) {
                        fieldsArr[i + 1] = [];

                        fieldsArr[0].forEach((f) => {
                            fieldsArr[i].push(f);
                        });
                    }
                    break;

                case fieldsArr[0] instanceof Object:
                    if (!fieldsArr[i + 1] && i + 1 < valArr.length) {
                        fieldsArr[i + 1] = {};
                        for (const n in fieldsArr[0]) {
                            switch (true) {
                                case fieldsArr[0][n] instanceof ZFieldComponent:
                                    fieldsArr[i + 1][n] = this.cloneField(fieldsArr[0][n]);
                                    break;

                                case fieldsArr[0][n] instanceof Array:
                                    console.error('Функционал в этом месте не продуман для массивов');
                                    break;

                                case fieldsArr[0][n] instanceof Object:
                                    console.error('Функционал в этом месте не продуман для объектов');
                                    break;
                            }
                        }
                    }
                    break;
            }

            switch (true) {

                case fieldsArr[0] instanceof ZFieldComponent:
                    this.fillFormField(fieldsArr[i], valArr[i]);
                    break;

                case fieldsArr[0] instanceof Array:
                    this.fillFormArr(fieldsArr[i], valArr[i]);
                    break;

                case fieldsArr[0] instanceof Object:
                    this.fillFormProperty(fieldsArr[i], valArr[i]);
                    break;
            }
        }
    }

    formFieldCloneDetected() {

    }

    // заполнить свойство формы, которое выступает в качестве объектас формами
    fillFormProperty(prop: any, model: any) {
        for (const name in prop) {
            const field = prop[name];

            this.fillFormDetected(field, model, name);
        }
    }

    // присвоить значение форме
    fillFormField(field: ZFieldComponent, val: any) {
        if (field.arr) {
            if (val) {
                val = JSON.parse(val);

                for (const v of val) {
                    field.setValue(v);
                }
            }
        } else {
            field.setValue(val);
        }
    }

    cloneField(field: ZFieldComponent) {
        const cloneField = new ZFieldComponent();

        for (const prop in field) {
            cloneField[prop] = field[prop];
        }

        return cloneField;
    }
}

class ValidFieldsArr {
    field: ZFieldComponent;
    name: string;
}
