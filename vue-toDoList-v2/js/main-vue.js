new Vue({
    el: '#app',
    data: {
        list: [],
        task: '',
    },
    methods: {
        addTask() {
            if (this.task !== '') {
                this.list.push({
                    id: this.list.length,
                    task: this.task,
                    checked: false,
                    done: false,
                });
                this.task = '';
            }
        },
        selectAll() {
            this.list.forEach(item => {
                item.checked = true;
            });
        },
        doneAndRestoreAll(value) {
            this.list.forEach(item => {
                if (item.checked) {
                    item.done = Boolean(value);
                }
                item.checked = false;
            });
        },
        removeAll() {
            const notCheckedlist = [];
            this.list.forEach(item => {
                if (!item.checked) {
                    notCheckedlist.push(item);
                }
            });
            this.list = notCheckedlist;
        }
    },
    computed: {
        countCheckedTasks() {
            let k = 0;
            this.list.forEach(item => {
                if (item.checked) {
                    k++;
                }
            });
            return k >= 1;
        }
    }
})