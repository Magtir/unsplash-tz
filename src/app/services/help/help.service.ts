import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class HelpService {
    timerScrollToElem: any;
    timerDoIfExistElem: any;

    constructor() {
    }

    formatStrDataToNormalStr(str: string) {
        const date = new Date(str);

        const monthNames = [
            'января', 'февраля', 'марта',
            'апреля', 'мая', 'июня', 'июля',
            'августа', 'сентября', 'октября',
            'ноября', 'декабря'
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    calcRandomMinMax(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    doIfExistElem(id: string, func: any) {
        let i = 0;
        clearInterval(this.timerDoIfExistElem);

        this.timerDoIfExistElem = setInterval(() => {
            const el = document.getElementById(id);
            if (el) {
                func();
                clearInterval(this.timerDoIfExistElem);
            }
            i++;
            if (i <= 10) {
                clearInterval(this.timerDoIfExistElem);
            }
        }, 200);
    }

    calcRandomArr(arr) {
        function compareRandom(a, b) {
            return Math.random() - 0.5;
        }

        return arr.sort(compareRandom);
    }

    definePercentScrollHeight() {
        const body = document.body, html = document.documentElement;
        const fullHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        ) - window.innerHeight;
        return (window.pageYOffset / fullHeight * 100);
    }

    declOfNum(num, titles) {
        return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
}
