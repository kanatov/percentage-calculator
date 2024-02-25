"use strict";

class Calculator {
    constructor(domElements, plans) {
        this.dom = domElements;
        this.plans = plans;
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.current = {
            plan: this.plans[0],
            deposit: 0,
            preiod: 0,
            interest: 0
        };

        // init form
        this.initPlans();
        this.initDeposit();
        this.initPeriods();
        this.initInterest();
        this.initSave();
        this.initResults();
    }

    setCurrentPlan(planIndex) {
        this.current.plan = this.plans[planIndex];
    }

    setCurrentDeposit(deposit) {
        this.current.deposit = deposit;
    }

    setCurrentPeriod(preiod) {
        this.current.preiod = preiod;
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

    initPlans() {
        const numberOfPlans = this.plans.length;

        for (let i = 0; i < numberOfPlans; i++) {
            const planName = this.plans[i].name;
            const category = this.plans[i].category;

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

            if (planName === this.current.plan.name) {
                newPlanGroupElementInput.checked = true;
            }

            newPlanGroupElementInput.addEventListener('change', (e) => {
                const target = e.target;
                this.setCurrentPlan(target.value);
                this.initDeposit();
                this.initPeriods();
                this.initInterest();
                this.initResults();
            });

            this.dom.planGroup.appendChild(newPlanGroupElement);
        }
    }

    initDeposit() {
        const minDeposit = this.current.plan.interestRates[0].minDeposit;
        const maxDeposit = this.current.plan.maxDeposit;

        let newDeposit = this.current.deposit || minDeposit;
        if (newDeposit > maxDeposit) {
            newDeposit = maxDeposit;
        }
        this.current.deposit = newDeposit;

        const formDeposit = this.dom.formDeposit;
        formDeposit.value = this.current.deposit;
        formDeposit.addEventListener('change', () => console.log(1));

        const formDepositRange = this.dom.formDepositRange;
        formDepositRange.min = minDeposit;
        formDepositRange.max = maxDeposit;
        formDepositRange.value = this.current.deposit;
        formDepositRange.addEventListener('input', () => console.log(1));

        const formDepositMin = this.dom.formDepositMin;
        formDepositMin.textContent = minDeposit;

        const formDepositMax = this.dom.formDepositMax;
        formDepositMax.textContent = maxDeposit;
    }

    initPeriods() {
        this.sanitizeNodes(this.dom.periodGroup);

        const numberOfRates = this.current.plan.interestRates.length;

        for (let i = 0; i < numberOfRates; i++) {
            const rate = this.current.plan.interestRates[i];

            if (Object.hasOwn(rate, 'period')) {
                const period = rate.period;
                const id = 'preiod' + period;
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
                newPeriodInput.addEventListener('change', () => console.log(1));

                this.dom.periodGroup.appendChild(newPeriod);
            }
        }
    }

    initInterest() {
        const currentRates = this.current.plan.interestRates;
        const ratesArray = currentRates.map(rate => rate.minDeposit);
        ratesArray.push(this.current.plan.maxDeposit);

        const rateDepositMatch = ratesArray.findIndex(rate => rate > this.current.deposit) - 1;
        const rateDepositIndex = rateDepositMatch !== -1 ? rateDepositMatch : ratesArray.length;

        const ratePeriodIndex = ratesArray.findIndex(rate => {
            Object.hasOwn(rate, 'period') ? rate.period === this.current.preiod : false;
        });

        const planIndex = rateDepositIndex > ratePeriodIndex ? rateDepositIndex : ratePeriodIndex;
        this.current.interest = currentRates[planIndex].rate;
        const formPercent = this.dom.formPercent;
        formPercent.textContent = this.current.interest;
    }

    initSave() {
        const saveResult = this.dom.saveResult;
    }

    initResults() {
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

    save() {
        console.log('save');
    }



}
