"use strict";

class Calculator {
    constructor(_domElements) {
        this.dom = _domElements;
        // this.arr = [];
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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

    // Отрисовываем массив объектов arr
    render() {
        var i;
        var summ = 0;

        list.innerHTML = '';

        // Печатаем массив
        for (i = this.arr.length - 1; i >= 0; i--) {
            var h = '';

            summ += this.calc(this.arr[i].summ, this.arr[i].date).s;

            h += '<li>';
            h += '<a class="del" href="#" onClick="calc.remove(' + i + ')">×</a>';
            h += '<div class="cells">';
            h += '<p class="cellLabel">Deposit amaunt</p><p class="value">';
            h += this.arr[i].summ;
            h += '</p>';
            h += '<p class="cellLabel">Deposit date</p><p class="value">';
            h += this.arr[i].date.getDate();
            h += ' ';
            h += this.monthNames[this.arr[i].date.getMonth()];
            h += ' ';
            h += this.arr[i].date.getFullYear();
            h += '</p></div>';

            h += '<div class="cells">';
            h += '<p class="cellLabel">The maturity amount today</p>';
            h += '<p class="cellLabel">The maturity amount in ';
            h += this.calc(this.arr[i].summ, this.arr[i].date).d;
            h += ' days';
            h += '<p class="cellLabel">Amount of payouts</p>';
            h += '</div>';

            h += '<div class="cells">';
            h += '<p class="value"><b>';
            h += this.calc(this.arr[i].summ, this.arr[i].date).s;
            h += '</b></p>';
            h += '<p class="value">';
            h += this.calc(this.arr[i].summ, this.arr[i].date).sn;
            h += '</p><p class="value">';
            h += this.calc(this.arr[i].summ, this.arr[i].date).m;
            h += '</p>';
            h += '</div>';
            h += '</li>';

            list.innerHTML += h;
        }

        if (this.arr.length > 1) {
            summValue.innerHTML = summ.toFixed(2);
            summLabel.style.display = 'inherit';
            summValue.style.display = 'inherit';
        } else {
            summLabel.style.display = 'none';
            summValue.style.display = 'none';
        }
    }

    notify(msg) {
        if (msg) {
            this.dom.summ.style.borderColor = 'red';
        } else {
            this.dom.summ.style.borderColor = '';
        }
    }
    */
}
