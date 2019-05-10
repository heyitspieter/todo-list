var TodoController = (() => {
	class Todo {
		constructor(id, name, finished = false) {
			this.id = id;
			this.name = name;
			this.finished = finished;
		}
	}

	let data = {
		allTodos: {
			todo: []
		}
	}

	let persistData = (type) => {
		localStorage.setItem('todos', JSON.stringify(data.allTodos[type]))
	}

	return {
		addTodo: (type, todo) => {
			let newTodoItem, id;

			//Create a new id;
			if (data.allTodos[type].length > 0) {
				id = data.allTodos[type][data.allTodos[type].length - 1].id + 1;
			} else {
				id = 0;
			}

			if (type === 'todo') {
				newTodoItem = new Todo(id, todo);
			}

			//Push it into our data structure
			data.allTodos[type].push(newTodoItem);

			persistData(type);

			//return Todo
			return newTodoItem;
		},

		deleteTodoListItem: (id, type) => {
			const items = data.allTodos[type];
			const itemIndex = items.findIndex(el => el.id == id);

			items.splice(itemIndex, 1);

			persistData(type);

		},

		readStorage: (type) => {
			const storage = JSON.parse(localStorage.getItem('todos'));

			if (storage) data.allTodos[type] = storage;
		},

		finishTodo: (id, type) => {
			todo = data.allTodos[type][id];

			if (todo.finished) {
				todo.finished = false;
				document.querySelector(`#todo-${todo.id}`).classList.remove('finished');

			} else {
				todo.finished = true;
				document.querySelector(`#todo-${todo.id}`).classList.add('finished');

			}

			persistData(type);
		},

		getTodo: () => {
			return data;
		}
	}

})();

let UiController = (() => {
	const DOMstrings = {
		todoContainer: 'ul',
		todoInput: '.todo-text',
		todoItem: '.todo-item',
		deleteBtn: '.del-btn'
	}


	return {
		readInputData: () => {
			return {
				todoText: document.querySelector(DOMstrings.todoInput).value
			}
		},

		renderTodoListItem: (obj) => {
			let newHtml;
			id = obj.id;
			isFinished = obj.finished;
			text = obj.name;

			newHtml = `<li id="todo-${id}" class="todo-item ${isFinished ? 'finished' : ''}"><span class="del-btn"><i class="fa fa-trash"></i></span>${text}</li>`;

			//Insert into todoContainer
			document.querySelector('ul').insertAdjacentHTML('beforeend', newHtml);

		},

		removeTodoListItem: (selectorId) => {
			let el;

			el = document.getElementById(selectorId);
			el.parentNode.removeChild(el);

		},


		clearInput: () => {
			let inputField, inputFieldArr;

			inputField = document.querySelector(DOMstrings.todoInput);

			inputField.value = '';

			inputField.focus();
		},

		getDOMstrings: () => {
			return DOMstrings;
		}
	};

})();

let AppController = ((TodoCtrl, UiCtrl) => {
	let DOM = UiCtrl.getDOMstrings();

	const setupEventListeners = () => {


		document.addEventListener('keypress', e => {
			if (e.keyCode == 13 || e.which == 13) {
				cntrlAddTodo();
			}
		});

		document.querySelector(DOM.todoContainer).addEventListener('click', deleteTodoItem);

	};

	const cntrlAddTodo = () => {
		let input, newTodo;

		//Get input data 
		input = UiCtrl.readInputData();

		if (input.todoText !== '') {
			//Add Todo to Unfinished Todos
			newTodo = TodoCtrl.addTodo('todo', input.todoText);

			// Add Todo to Ui
			UiCtrl.renderTodoListItem(newTodo);

			//Clear Input field
			UiCtrl.clearInput();
		}

	};

	const deleteTodoItem = (e) => {
		let itemId;

		//Find item id
		itemId = e.target.closest(`${DOM.todoItem}`).id;
		[type, id] = itemId.split('-');

		if (e.target.closest(DOM.deleteBtn)) {


			//Remove Todo
			TodoCtrl.deleteTodoListItem(id, 'todo');

			//Remove Todo from UI
			UiCtrl.removeTodoListItem(itemId);

		} else if (e.target.closest(DOM.todoItem)) {

			// Update Todo to a finished Todo 
			let todo = TodoCtrl.getTodo();
			todoId = todo.allTodos['todo'].findIndex(todo => todo.id == id);

			TodoCtrl.finishTodo(todoId, 'todo');

		}

	};

	return {
		init: () => {
			setupEventListeners();
			TodoCtrl.readStorage('todo');
			let todos = TodoCtrl.getTodo();
			todos.allTodos['todo'].forEach(todo => UiCtrl.renderTodoListItem(todo));
		}
	};

})(TodoController, UiController);

AppController.init();