(function (window, Vue) {


	var arr = [
		{
			id: 1,
			content: '123',
			isFinish: false
		},
		{
			id: 2,
			content: '123',
			isFinish: true
		},
		{
			id: 3,
			content: '123',
			isFinish: false
		}

	]
	new Vue({
		el: '#app',
		data: {
			dataList: JSON.parse(window.localStorage.getItem('dataList')) ||[],
			newTodo: ''
		},
		watch: {
			dataList: {
				handler (newVal) {
					window.localStorage.setItem('dataList',JSON.stringify(newVal));
					// console.log(newVal);
				},
				deep: true
			}

		},
		computed: {
			activeNum() {
				return this.dataList.filter(item => !item.isFinish).length;
			},
			toggleAll:  {
				get (){
					return this.dataList.every(item => item.isFinish);
				},
				set(val) {
					this.dataList.forEach(item => item.isFinish = val)
				}
			}
		},
		methods: {
			addTodo() {
				if (!this.newTodo.trim()) return;
				this.dataList.push({
					content: this.newTodo,
					isFinish: false,
					id: this.dataList.length ? this.dataList.sort((a, b) => a.id - b.id)[this.dataList.length - 1]['id'] + 1 : 1
				});
				this.newTodo = '';
			},
			deleTodo(index) {
				this.dataList.splice(index, 1);
			},
			deleAll() {
				this.dataList = this.dataList.filter(item => !item.isFinish);
			}
		},
		directives: {
			focus: {
				inserted(el) {
					el.focus();
				}
			}
		}
	})

})(window, Vue);
