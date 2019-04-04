import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-zfield',
    templateUrl: './zfield.component.html',
    styleUrls: ['./zfield.component.less']
})
export class ZFieldComponent implements OnInit {
    // хранит то, что считает за empty
    emptyWhat: any;
    empty = false;
    errorEmpty = 'Обязательно для заполнения';

    phone: boolean;
    errorPhone = 'Телефон не корректный';

    email = false;
    errorEmail = 'Email не корректный';

    number = false;
    errorNumber = 'Возможны только цифры';

    minLen = 0;
    errorMinLen: string;

    maxLen = 0;
    errorMaxLen: string;

    arr = false;
    bool = false;
    minLenArr = 0;
    errorMinLenArr: string;

    maxLenArr = 0;
    autoDecrementLenArr = true;
    errorMaxLenArr: string;

    afterChangedViewFormatDate = '';
    afterChangedViewFormatDateDelimiter = '';
    afterChangedViewFormatDateMonthArr = [];

    afterChangedReqFormatDate = '';
    afterChangedReqFormatDateDelimiter = '';
    afterChangedReqFormatDateMonthArr = [];

    afterChangedFuncs: any[];

    replaceValues: ReplaceValues[];

    nameReq: string;

    jsonStringifyReq = false;

    notReq = false;
    notRes = false;

    // данные в поле
    valueBase: any;
    valueView: any;
    valueReq: any;
    // ошибка сгенерированная формой
    error = '';

    tmpReadOnly: boolean;

    datepipe: DatePipe;
    //////////////////////////////////////////////////////////////////////////////////

    // принимает значение, которое будет установлено при инициализации поля.
    // Выоплнять самым последним пунктом опций, что бы предыдущие успели вступить в силу
    optStartValueBase(valueBaseStart: any) {
        this.setValue(valueBaseStart);
        return this;
    }

    // если может быть пустым, то true
    optEmpty(flag: boolean) {
        this.empty = flag;
        return this;
    }

    // установить ошибку, которая будет выводится при пустом значении
    optSetErrorEmpty(err: string) {
        this.errorEmpty = err;
        return this;
    }

    // если это телефона, то true
    optPhone(flag = true) {
        this.phone = flag;
        return this;
    }

    // установить ошибку, которая будет выводится при невалидном телефоне
    optSetErrorPhone(err: string) {
        this.errorPhone = err;
        return this;
    }

    // если это email, то true
    optEmail(flag: boolean) {
        this.email = flag;
        return this;
    }

    // установить ошибку, которая будет выводится при невалидном email
    optSetErrorEmail(err: string) {
        this.errorEmail = err;
        return this;
    }

    // если это число, то true
    optNumber(flag: boolean) {
        this.number = flag;
        return this;
    }

    // установить ошибку, которая будет выводится при невалидном числе
    optSetErrorNumber(err: string) {
        this.errorNumber = err;
        return this;
    }

    // минимальное допустимое число символов
    optMinLen(len: number) {
        this.minLen = len;
        return this;
    }

    // установить ошибку, которая будет выводится при недопустимом минимальном значении символов
    optSetErrorMinLen(err: string) {
        this.errorMinLen = err;
        return this;
    }

    // минимальное допустимое число символов (если 0, то бесконечно)
    optMaxLen(len: number) {
        this.maxLen = len;
        return this;
    }

    // установить ошибку, которая будет выводится при недопустимом максимальном значении символов
    optSetErrorMaxLen(err: string) {
        this.errorMaxLen = err;
        return this;
    }

    // если это массив, то true
    // так же принимает значение максимального количества в массиве. Если оно 0, то бесконечно
    // третий параметр, если true и если есть ограничение по количеству элементов в массиве,
    // то будет сам обрезать первый элемент в случае переполнения
    optArr(flag: boolean, minLenArr = 0, maxLenArr = 0, autoDecrementLenArr = true) {
        if (flag) {
            this.arr = flag;
            this.minLenArr = minLenArr;
            this.maxLenArr = maxLenArr;
            this.autoDecrementLenArr = autoDecrementLenArr;

            this.valueBase = [];
            this.valueView = [];
            this.valueReq = [];
        }

        return this;
    }

    // установить ошибку, которая будет выводится при недопустимом минимальном значении элементов в массиве
    optSetErrorMinLenArr(err: string) {
        this.errorMinLenArr = err;
        return this;
    }

    // установить ошибку, которая будет выводится при недопустимом максимальном значении элементов в массиве
    optSetErrorMaxLenArr(err: string) {
        this.errorMaxLenArr = err;
        return this;
    }

    // если это булевое значение (например checkbox или radio), то true
    optBool(flag: boolean) {
        this.bool = flag;
        return this;
    }

    // если нужно выводить отформатированную дату, то сюда пишем формат обычного типа 'yyyy/mm/dd'
    // или костомного типа ('yyyy<delimiter>mon | month | month+ | month[]<delimiter>dd') в любом порядке
    // в этом случае передаем делимитер, который должен совпадать
    // пример opt('yyyy/month/dd', '/')
    // 'mon' - "янв".
    // 'month' - "январь".
    // 'month+' - "январЯ"
    // третим параметром можно передать массив названий месяцев при этом второй определение месяцев должено быть 'month[]'.
    // пример opt('yyyy/month[]/dd', '/', ['a', 'b', 'c',...])
    // В это случае для месяца буду браться названия из переданного массива (массив обязательно length == 12).
    // yyyy и dd обязательные не изменяющиемя параметры
    optAfterChangedViewFormatDate(format: string, delimiter = '', monthArr: string[] = []) {
        this.afterChangedViewFormatDate = format;
        this.afterChangedViewFormatDateDelimiter = delimiter;
        this.afterChangedViewFormatDateMonthArr = monthArr;
        return this;
    }

    // тоже самое, что и optAfterChangedViewFormatDate, но для выведения в модель
    optAfterChangedReqFormatDate(format: string, delimiter = '', monthArr: string[] = []) {
        this.afterChangedReqFormatDate = format;
        this.afterChangedReqFormatDateDelimiter = delimiter;
        this.afterChangedReqFormatDateMonthArr = monthArr;
        return this;
    }

    // принимает массив функций, которые надо выполнить после изменения value
    // выполняется раньше всех after
    // у функции есть три callback - значения полей (base, view, req).
    // все три значения обязательны для возвращения в массиве или не возвращать ни чего
    // --====--
    // пример использования
    // field: this.zform.initFiled('')
    //  .optChangedFuncs([
    //      (valBase, valView, valReq) => {
    //          valReq = valBase + ' test';
    //          console.log(valBase, valView, valReq);
    //          return [valBase, valView, valReq];
    //      }
    //  ]),
    optAfterChangedFuncs(functions: any[]) {
        this.afterChangedFuncs = functions;
        return this;
    }

    // если нужно изменить имя, которое будет попадать в модель, то сюда указываем это имя
    optNameReq(nameReq: string) {
        this.nameReq = nameReq;
        return this;
    }

    // если при выведении в модель нужно из JSON перевести в строку
    optJsonStringifyReq(flag: boolean) {
        this.jsonStringifyReq = flag;
        return this;
    }

    // если поле не должно попадать в модель, то true
    optNotReq(flag: boolean) {
        this.notReq = flag;
        return this;
    }

    // если поле не должно попадать в форму из модели, то true
    optNotRes(flag: boolean) {
        this.notRes = flag;
        return this;
    }

    // если нужно заменять определенные значения на свои, то сюда передаем массив данного класса,
    // где valueNow - ожидаемое значение, которое нужно заменять на valueNeed
    optReplaceValues(values: ReplaceValues[]) {
        this.replaceValues = values;
        return this;
    }

    // если true, то поле будет с параметром readonly (только для чтения)
    optTmpReadOnly(flag = true) {
        this.tmpReadOnly = flag;
        return this;
    }

    // установить значение
    setValue(valBase: any, valReq: any = null) {

        valBase = this.replaceViews(valBase);

        let valView = valBase;
        valReq = valReq || valBase;

        if (this.afterChangedFuncs) {
            for (const f of this.afterChangedFuncs) {
                const vals = f(valBase, valView, valReq);
                if (vals) {
                    valView = vals[1];
                    valReq = vals[2];
                }
            }
        }

        // запускаем два цикла. Функционал полностью одинаковый, первый раз для view второй для req
        for (let i = 0; i < 2; i++) {
            let format;
            let delimiter;
            let monthArr;

            switch (i) {
                case 0:
                    format = this.afterChangedViewFormatDate;
                    delimiter = this.afterChangedViewFormatDateDelimiter;
                    monthArr = this.afterChangedViewFormatDateMonthArr;
                    break;

                case 1:
                    format = this.afterChangedReqFormatDate;
                    delimiter = this.afterChangedReqFormatDateDelimiter;
                    monthArr = this.afterChangedReqFormatDateMonthArr;
                    break;
            }

            if (format) {
                let dateFormat = '';

                if (delimiter === '') {
                    dateFormat = this.datepipe.transform(valBase, format);
                    i === 0 ? valView = dateFormat : valReq = dateFormat;
                } else {
                    const date = new Date(valBase);
                    const day = date.getDate();
                    const monthIndex = date.getMonth();
                    const yearFull = date.getFullYear();

                    const parts = format.split(delimiter);
                    parts.forEach((part, p) => {
                        switch (part) {
                            case 'yyyy':
                                dateFormat += yearFull;
                                break;

                            case 'mon':
                                dateFormat += [
                                    'янв', 'февр', 'март',
                                    'апр', 'май', 'июнь', 'июль',
                                    'авг', 'сент', 'окт',
                                    'нояб', 'дек'
                                ][monthIndex];
                                break;

                            case 'month':
                                dateFormat += [
                                    'январь', 'февраль', 'март',
                                    'апрель', 'май', 'июнь', 'июль',
                                    'август', 'сентябрь', 'октябрь',
                                    'ноябрь', 'декабрь'
                                ][monthIndex];
                                break;

                            case 'month+':
                                dateFormat += [
                                    'января', 'февраля', 'марта',
                                    'апреля', 'мая', 'июня', 'июля',
                                    'августа', 'сентября', 'октября',
                                    'ноября', 'декабря'
                                ][monthIndex];
                                break;

                            case 'month[]':
                                let arrMonth: string[];
                                if (monthArr.length === 12) {
                                    arrMonth = monthArr;
                                } else {
                                    arrMonth = [
                                        'января', 'февраля', 'марта',
                                        'апреля', 'мая', 'июня', 'июля',
                                        'августа', 'сентября', 'октября',
                                        'ноября', 'декабря'
                                    ];
                                }
                                dateFormat += arrMonth[monthIndex];
                                break;

                            case 'dd': {
                                dateFormat += day;
                            }
                        }

                        if (+p < parts.length - 1) {
                            dateFormat += delimiter;
                        }
                    });

                    i === 0 ? valView = dateFormat : valReq = dateFormat;
                }
            }
        }

        if (!this.arr) {
            this.valueBase = valBase;
            this.valueView = valView;
            this.valueReq = valReq;
        } else {
            this.valueBase.push(valBase);
            this.valueView.push(valView);
            this.valueReq.push(valReq);

            if (this.autoDecrementLenArr && this.maxLenArr > 0 && this.valueView.length > this.maxLenArr) {
                this.valueBase.shift();
                this.valueView.shift();
                this.valueReq.shift();
            }
        }

        // console.log('base: ', this.valueBase + '\nview: ', this.valueView + '\nreq: ', this.valueReq);

        return this;
    }

    // удалить элемент из массива
    deleteItemArr(i: number) {
        if (this.arr) {
            this.valueBase.splice(i, 1);
            this.valueView.splice(i, 1);
            this.valueReq.splice(i, 1);
        } else {
            console.error('Поле не является массивом. Для удаления элемента из массива, у поле надо установить optArr(true)');
        }
    }

    // обнулить значения
    clearValues() {
        this.setValue(this.replaceViews(this.emptyWhat));
    }

    // установить ошибку
    setError(err: string) {
        this.error = err;
    }

    // получить ошибку
    getError() {
        return this.error;
    }

    // очистить ошибку
    clearError() {
        this.error = '';
    }

    // ===============================================================================
    // дальше не для использования
    // ===============================================================================

    constructor() {
        this.datepipe = new DatePipe('en-US');
    }

    ngOnInit() {
    }

    replaceViews(valBase: any) {
        if (this.replaceValues) {
            for (const v of this.replaceValues) {
                if (v.valueNow === valBase) {
                    valBase = v.valueNeed;
                }
            }
        }

        return valBase;
    }

    // ----====validations====---- \\

    initErrorMinLen() {
        return 'Количество символов должно быть не меньше ' + this.minLen;
    }

    initErrorMaxLen() {
        return 'Количество символов должно быть не больше ' + this.maxLen;
    }

    initErrorMinLenArr() {
        return 'Количество элементов должно быть не меньше ' + this.minLenArr;
    }

    initErrorMaxLenArr() {
        return 'Количество элементов должно быть не больше ' + this.maxLenArr;
    }

    validEmptyReq() {
        return !(
            this.valueReq === null ||
            this.valueReq === undefined ||
            this.valueReq === this.emptyWhat ||
            (this.valueReq.replace && this.valueReq.replace(/\s/g, '') === '')
        );
    }

    validEmpty() {
        return !(
            this.valueBase === null ||
            this.valueBase === undefined ||
            this.valueBase === this.emptyWhat ||
            (this.valueBase.replace && this.valueBase.replace(/\s/g, '') === '')
        );
    }

    validPhone() {
        if (this.validEmpty()) {
            const reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/;
            return reg.test(this.valueBase);
        }

        return true;
    }

    validEmail() {
        if (this.validEmpty()) {
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            return reg.test(this.valueBase);
        }

        return true;
    }

    validNumber() {
        if (this.valueBase === 0 || this.valueBase === '0') {
            return true;
        }
        return !!+this.valueBase;
    }

    validMinLen() {
        return ('' + this.valueBase).length >= this.minLen;
    }

    validMaxLen() {
        return ('' + this.valueBase).length <= this.maxLen;
    }

    validMinLenArr() {
        return this.valueBase.length >= this.minLenArr;
    }

    validMaxLenArr() {
        return this.valueBase.length <= this.maxLenArr;
    }
}

class ReplaceValues {
    valueNow: any;
    valueNeed: any;
}
