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
    getTemplate(templateName) {
        const template = this.dom[templateName].content.cloneNode(true);
        const node = template.childNodes[1];
        return node;
    }
    getDate(months = 0) {
        // upcoming month calculation here

        const date = new Date();
        let dateValue = '';
        dateValue += date.getDate();
        dateValue += ' ';
        dateValue += this.monthNames[date.getMonth()];
        dateValue += ' ';
        dateValue += date.getFullYear();

        return dateValue;
    }
    // Отрисовываем массив объектов arr
    render() {
        // Plans
        const newPlanGroupElement = this.getTemplate('planGroupElement');
        newPlanGroupElement.id = 'planBasic'; // fix
        newPlanGroupElement.htmlFor = 'basic';

        const newPlanGroupElementText = newPlanGroupElement.childNodes[0];
        newPlanGroupElementText.textContent = 'basic';

        const newPlanGroupElementInput = newPlanGroupElement.childNodes[1];
        newPlanGroupElementInput.id = 'basic';
        newPlanGroupElementInput.value = 'basic';
        newPlanGroupElementInput.checked = true;

        this.dom.planGroup.appendChild(newPlanGroupElement);

        // Initial deposit
        const formDeposit = this.dom.formDeposit;
        formDeposit.value = '1000';

        const formDepositRange = this.dom.formDepositRange;
        formDepositRange.min = '50000';
        formDepositRange.max = '200000';

        const formDepositMin = this.dom.formDepositMin;
        formDepositMin.textContent = '50000';

        const formDepositMax = this.dom.formDepositMax;
        formDepositMax.textContent = '200000';

        // Periods

        const newPeriodGroupElement = this.getTemplate('periodGroupElement');
        newPeriodGroupElement.htmlFor = 'preiod3';

        const newPeriodGroupElementText = newPeriodGroupElement.childNodes[0];
        newPeriodGroupElementText.textContent = '4mo';

        const newPeriodGroupElementInput = newPeriodGroupElement.childNodes[1];
        newPeriodGroupElementInput.id = 'preiod3';
        newPeriodGroupElementInput.value = 'preiod3';
        newPeriodGroupElementInput.checked = true;

        this.dom.periodGroup.appendChild(newPeriodGroupElement);

        // Interest

        const formPercent = this.dom.formPercent;
        formPercent.textContent = '2%';

        // Result form
        const resultFromDate = this.dom.resultFromDate;
        resultFromDate.textContent = this.getDate();

        const resultToDate = this.dom.resultToDate;
        resultToDate.textContent = this.getDate();

        const resultSavings = this.dom.resultSavings;
        resultSavings.textContent = '1000';

        const resultInterest = this.dom.resultInterest;
        resultInterest.textContent = '2000';
    }
}
