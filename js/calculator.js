"use strict";

class Calculator {
    constructor(domElements, plans) {
        this.dom = domElements;
        this.plans = plans;
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.current = {};

        this.event('init');
    }

    setCurrentPlan(planIndex) {
        this.current.plan = this.plans[planIndex];
    }


    setCurrentDeposit(deposit) {
        const minDeposit = this.current.plan.interestRates[0].minDeposit;
        const maxDeposit = this.current.plan.maxDeposit;

        let newDeposit = deposit || this.current.deposit || 0;
        newDeposit = this.clamp(newDeposit, minDeposit, maxDeposit);

        this.current.deposit = newDeposit;
    }

    clamp(value, min, max) {
        return Math.min(Math.max(min, value), max);
    }

    setCurrentPeriod(period) {
        this.current.period = parseInt(period);
    }

    setCurrentInterest(interest) {
        this.current.interest = interest;
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
            
            this.init();
        } else {
            this.notify(1);
        }
    }
     
    // Удаляем элемент из массива
    remove(n) {
        this.arr.splice(n, 1);
        this.init();
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
    getInterestIndex() {
        const deposit = this.current.deposit;
        const ranges = this.current.depositRanges;
        const index = ranges.findIndex((range) => range.min <= deposit && deposit <= range.max);
        return index;
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

    sanitizeNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    initDepositRanges() {
        // Refresh interest ranges
        this.current.depositRanges = {};
        const currentRates = this.current.plan.interestRates;
        const ratesDepositsArray = currentRates.map(rate => rate.minDeposit);
        const cap = this.current.plan.maxDeposit;
        let depositRanges = [];

        for (let i = 0; i < currentRates.length; i++) {
            const min = currentRates[i].minDeposit;
            let max;

            if (typeof currentRates[i + 1] !== 'undefined') {
                max = currentRates[i + 1].minDeposit - 1;
            }
            const range = {
                min: min,
                max: max
            };
            depositRanges.push(range);
        }

        depositRanges[depositRanges.length - 1].max = cap;
        this.current.depositRanges = depositRanges;

    }

    initPlans() {
        const numberOfPlans = this.plans.length;

        for (let i = 0; i < numberOfPlans; i++) {
            const planName = this.plans[i].name;
            const category = this.plans[i].category;

            //Radiogroup template and values
            const newPlanGroupElement = this.getTemplate('planGroupElement');
            switch (category) {
                case 1:
                    newPlanGroupElement.id = 'planPro';
                    break;

                case 2:
                    newPlanGroupElement.id = 'planPremium';
                    break;

                default:
                    newPlanGroupElement.id = 'planBasic';
            }

            newPlanGroupElement.htmlFor = planName;

            const newPlanGroupElementText = newPlanGroupElement.childNodes[0];
            newPlanGroupElementText.textContent = planName;

            const newPlanGroupElementInput = newPlanGroupElement.childNodes[1];
            newPlanGroupElementInput.id = planName;
            newPlanGroupElementInput.value = i;

            if (i === 0) {
                newPlanGroupElementInput.checked = true;
            }

            //Event listener
            newPlanGroupElementInput.addEventListener('change', (e) => {
                const value = e.target.value;
                this.event('plans', value);
            });

            this.dom.planGroup.appendChild(newPlanGroupElement);
        }
    }

    initDeposit() {
        const formDeposit = this.dom.formDeposit;
        formDeposit.addEventListener('change', (e) => {
            const value = e.target.value;
            this.event('deposit input', value);
        });

        const formDepositRange = this.dom.formDepositRange;
        formDepositRange.addEventListener('input', (e) => {
            const value = e.target.value;
            this.event('deposit range', value);
        });
    }

    initPeriods() {
        this.sanitizeNodes(this.dom.periodGroup);

        const numberOfRates = this.current.plan.interestRates.length;

        for (let i = 0; i < numberOfRates; i++) {
            const rate = this.current.plan.interestRates[i];

            if (Object.hasOwn(rate, 'period')) {
                const period = rate.period;
                const id = i;

                //Radiogroup template and values
                const newPeriod = this.getTemplate('periodGroupElement');
                newPeriod.htmlFor = id;

                const newPeriodText = newPeriod.childNodes[0];
                newPeriodText.textContent = period + 'mo';

                const newPeriodInput = newPeriod.childNodes[1];
                newPeriodInput.id = id;
                newPeriodInput.value = id;
                if (i === 0) {
                    newPeriodInput.checked = true;
                }

                //Event listener
                newPeriodInput.addEventListener('change', (e) => {
                    const value = e.target.value;
                    this.event('period', value);
                });

                this.dom.periodGroup.appendChild(newPeriod);
            }
        }
    }

    initSave() {
        const form = this.dom.form;
        form.addEventListener('submit', (e) => {
            this.event('save');
            e.preventDefault();
        });
    }

    event(event, value) {
        switch (event) {
            case 'init':
                this.initPlans();
                this.initDeposit();
                this.initSave();
                this.event('plans', 0);
                break;
            case 'plans':
                this.setCurrentPlan(value);
                this.setCurrentDeposit();
                this.initDepositRanges();
                this.setCurrentPeriod(0);
                this.updateDepositInput();
                this.updateDepositRange();
                this.updateDepositMinMax();
                this.initPeriods();
                this.updateInterest();
                break;
            case 'deposit input':
                this.setCurrentDeposit(value);
                this.updateDepositRange();
                this.updateInterest();
                break;
            case 'deposit range':
                this.setCurrentDeposit(value);
                this.updateDepositInput();
                this.updateInterest();
                break;
            case 'period':
                this.setCurrentPeriod(value);
                this.updateInterest();
                break;
            case 'save':
                console.log('save');
                break;
        }
        this.updateResults();
    }

    updateDepositInput() {
        const formDeposit = this.dom.formDeposit;
        formDeposit.value = this.current.deposit;
    }

    updateDepositRange() {
        const minDeposit = this.current.plan.interestRates[0].minDeposit;
        const maxDeposit = this.current.plan.maxDeposit;

        const formDepositRange = this.dom.formDepositRange;
        formDepositRange.min = minDeposit;
        formDepositRange.max = maxDeposit;
        formDepositRange.value = this.current.deposit;
    }

    updateDepositMinMax() {
        const minDeposit = this.current.plan.interestRates[0].minDeposit;
        const maxDeposit = this.current.plan.maxDeposit;

        const formDepositMin = this.dom.formDepositMin;
        formDepositMin.textContent = minDeposit;

        const formDepositMax = this.dom.formDepositMax;
        formDepositMax.textContent = maxDeposit;
    }

    updateInterest() {
        const planIndex = this.getInterestIndex();
        const periodIndex = this.current.period;

        // get bigger index
        const index = Math.max(planIndex, periodIndex);
        const rates = this.current.plan.interestRates;
        this.current.interest = rates[index].rate;

        // Assigning rate
        const formPercent = this.dom.formPercent;
        const interestValue = this.current.interest + '%';
        formPercent.textContent = interestValue;
    }

    updateResults() {
        // Result form
        const resultFromDate = this.dom.resultFromDate;
        resultFromDate.textContent = this.getDate();

        const resultToDate = this.dom.resultToDate;
        resultToDate.textContent = this.getDate();

        const resultSavings = this.dom.resultSavings;
        resultSavings.textContent = '1000';

        const resultInterest = this.dom.resultInterest;
        resultInterest.textContent = '2000';

        console.log('results');
    }

    save() {
        console.log('save');
    }
}
