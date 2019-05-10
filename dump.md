$(document).ready(function(){
	$("ul").on('click', 'li', function(){
	//Mark as completed	
	$(this).toggleClass("finished");
});
	//Delete todo
	$("ul").on('click', 'span', function(event){
		$(this).parent().fadeOut(500, function(){
			$(this).remove();
		});
		event.stopPropagation();
	});	

	$("input[type='text']").keypress(function(event){
		if(event.which === 13){
			//getting value from input
			var todoText = $(this).val();
			//create a new li and add to ul
			if(todoText !== ''){
				$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
				$(this).val("");
			}
		}
	});

	$(".fa-plus").on('click', function(){
		$("input[type='text']").fadeToggle();	
	});
});

, e => {
			const item = e.target.closest(DOM.todoItem);
			if (e.target.matches(`${DOM.todoItem}`)) item.classList.add('finished');
			cntrlAddFinishedTodo(item.textContent);
		}

        //const item = e.target.closest(DOM.todoItem);

		// if (e.target.matches(`${DOM.todoItem}`)) {
		// 	item.classList.add('finished');
		// }


        // const deleteTodoItem = (e) => {
	// 	let itemId;

	// 	//Find item id
	// 	itemId = e.target.matches(`${DOM.deleteBtn}`).id;

	// 	if (itemId) {
	// 		[type, id] = itemId.split('-');

	// 		//Remove Todo
	// 		TodoCtrl.removeTodo(id, 'todo');

	// 		UiCtrl.removeTodoItem(itemId);
	// 	}
	// }

	if(todo.finished){
				todo.finished = false;
				document.querySelector(`#todo-${id}`).classList.remove('finished');
			} else {
				todo.finished = true;
				document.querySelector(`#todo-${id}`).classList.add('finished');
			}