const addBtn = document.getElementById("add");
const task = document.getElementById("view");
let tasks = [];

addBtn.addEventListener("click", createTask);

function createTask() {
	const todo = {
		id: new Date().getTime(),
		text: "",
		done: false
	}
	
	tasks.unshift(todo);

	const { list_elm, input_elm } = createTodoElement(todo);

	task.prepend(list_elm);

	input_elm.removeAttribute("disabled");
	input_elm.focus();

	Save();
}

function createTodoElement(todo) {

	const list_elm = document.createElement("div");
	list_elm.classList.add("list-items");
	list_elm.id = "list";

	const checkbox = document.createElement("input");
	checkbox.ariaLabel = "CheckBox"
	checkbox.type = "checkbox";
	checkbox.checked = todo.done;

	if (todo.done) {
		list_elm.classList.add("done");
	}

	const input_elm = document.createElement("input");
	input_elm.ariaLabel = "List";
	input_elm.type = "text";
	input_elm.value = todo.text;
	// input_elm.setAttribute("disabled", "");

	const modify_elm = document.createElement("div");
	modify_elm.classList.add("modify-list");

	const editBtn = document.createElement("button");
	editBtn.classList.add("material-icons");
	editBtn.id = "edits";
	editBtn.innerText = "edit";

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("material-icons");
	deleteBtn.id = "delete";
	deleteBtn.innerText = "delete";

	modify_elm.append(editBtn);
	modify_elm.append(deleteBtn);

	list_elm.append(checkbox);
	list_elm.append(input_elm);
	list_elm.append(modify_elm);

	//----------------------------CheckBox Event
	checkbox.addEventListener("change", () => {
		todo.done = checkbox.checked

		if (todo.done) {
			list_elm.classList.add("done");
		} else {
			list_elm.classList.remove("done");
		}

		Save();
	})

	//----------------------------Input Event
	input_elm.addEventListener("input", () => {
		todo.text = input_elm.value;
	})

	input_elm.addEventListener("blur", () => {
		input_elm.setAttribute("disabled", "");
		Save();
	})

	//----------------------------Modify Buttons Event
	editBtn.addEventListener("click", () => {
		input_elm.removeAttribute("disabled"); 
		input_elm.focus();
	})

	deleteBtn.addEventListener("click", () => {
		tasks = tasks.filter(t => t.id != todo.id);

		list_elm.remove();

		Save();
	})

	return {
		list_elm, input_elm, editBtn, deleteBtn
	}
}

//----------------------------Save & Load
function DisplayTodos() {
	Load();
	console.log(tasks);

	for (let i = 0; i < tasks.length; i++) {
		const todo = tasks[i];
		
		const {list_elm} = createTodoElement(todo);
		task.append(list_elm); 
	}
}
DisplayTodos();
 
function Save() {
	const save = JSON.stringify(tasks);
	localStorage.setItem("my_tasks",save);
}

function Load() {
	const data = localStorage.getItem("my_tasks");
	if(data){
		tasks = JSON.parse(data);
	}
}