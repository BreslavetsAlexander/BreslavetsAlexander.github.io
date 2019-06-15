new Vue({
    el: '#app',
    data: {
        options: ['+', '-'],
        defaultOption: '+',
        desc: '',
        sum: '',
        incomes: [],
        expenses: [],
    },
    methods: {
        addTitle() {
            if (this.desc !== '' && this.sum !== '') {
                if (this.defaultOption === '+') {
                    this.incomes.push({
                        desc: this.desc,
                        sum: this.sum
                    });
                } else if (this.defaultOption === '-') {
                    this.expenses.push({
                        desc: this.desc,
                        sum: this.sum
                    });
                }
                this.desc = '';
                this.sum = '';
            }
        }
    },
    computed: {
        sumIncomes() {
            let s = 0;
            this.incomes.forEach(item => {
                s += item.sum;
            });
            return s;
        },
        sumExpenses() {
            let s = 0;
            this.expenses.forEach(item => {
                s += item.sum;
            });
            return s;
        }
    }
})