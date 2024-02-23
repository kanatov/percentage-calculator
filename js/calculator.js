"use strict";

class Calculator {
    constructor(domElements, plans) {
        this.dom = domElements;
        this.plans = plans;
        // this.arr = [];
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.render();
    }


    /*
    // Добавляем элемент в массив
    add() {
        if (+this.dom.summ.value > 0) {
            var newDate = new Date(this.dom.date.datepicker('getDate'));
            this.arr.push({ 'summ': +this.dom.summ.value, 'date': newDate });

            this.arr.sort(function (a, b) {
                return b.date - a.date;
            });

            this.dom.summ.value = '1500';

            this.render();
        } else {
            this.notify(1);
        }
    }

    // Удаляем элемент из массива
    remove(n) {
        this.arr.splice(n, 1);
        this.render();
    }

    // Калькулятор процентов, дней, месяцев
    calc(s, d) {
        var calc = {},
            c = new Date(d),
            t = new Date(),
            todayD = t.getDate(),
            todayM = t.getMonth(),
            todayY = t.getFullYear(),
            todayDays = md(todayY, todayM),
            nextDays = md(todayY, todayM + 1),
            contD = c.getDate(),
            contM = c.getMonth(),
            contY = c.getFullYear(),
            m,
            d = 0;

        // Дней в месяце
        function md(y, m) {
            var d = new Date(y, m + 1, 0)
            return d.getDate();
        }

        // Разница в месяцах
        m = (todayY - contY) * 12;
        m -= contM;
        m += todayM;

        // Разница в днях
        if (m) {
            //месяц случился, была ли выплата?
            if (contD > todayD) {
                // дата контракта больше чем дата сегодня
                if (todayD < todayDays) {
                    // сегодня не последний день месяца
                    m--;
                    d = (todayDays - todayD);
                    d += contD > nextDays ? nextDays : contD;
                } else {
                    // сегодня последний день месяца
                    d = contD > nextDays ? nextDays : contD;
                }
            } else {
                // дата контракта меньше или равна сегодняшней дате
                // значит выплата была
                d = (todayDays - todayD);
                d += contD > nextDays ? nextDays : contD;
            }
        } else {
            if (contD > todayD) {
                d = contD - todayD;
            } else {
                d = (todayDays - todayD);
                d += contD > nextDays ? nextDays : contD;
            }
        }

        // Считаем проценты
        function p(s, m) {
            var i;
            for (i = 0; i < m; i++) {
                s += (s * parseFloat(percent.value)) / 100;
            }
            return +s.toFixed(2);
        }

        calc.m = m;
        calc.s = p(s, m);
        calc.sn = p(s, m + 1);
        calc.d = d;

        return calc;
    }
*/
    // Отрисовываем массив объектов arr
    render() {

    }
    /*
        notify(msg) {
            if (msg) {
                this.dom.summ.style.borderColor = 'red';
            } else {
                this.dom.summ.style.borderColor = '';
            }
        }
        */
}
