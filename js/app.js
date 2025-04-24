const randomID = () => {
  const randomTime = new Date().getTime();
  return `${Math.random() * randomTime}`;
}

const renderTodo = (text, id, checked) => {
  return `
    <input type="checkbox" name="${text}" 
      id="${id}" ${checked ? 'checked' : ''} />
      ${checked ? `<s>${text}</s>` : `${text}`}`;
}

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.checkTodoCallback = (id, done) => {};
    this.rootID = randomID();
  }
  render(items = []) {
    this.innerHTML = this.generateRoot(this.rootID).outerHTML;
    items.forEach((item, index) => {
      const todo = this.newTodo(item.name, item.id, item.done);
      this.getRoot().appendChild(todo);
    });
  }
  connectedCallback() {
    this.render();
  }
  generateRoot(id) {
    const ul = document.createElement("fieldset");
    ul.setAttribute("id", id);
    return ul;
  }
  getRoot() {
    return this.children[this.rootID];
  }
  addTodo(name, id, done) {
    const newTodo = this.newTodo(name, id, done);
    this.getRoot().appendChild(newTodo);
  }
  updateTodo(name, id, done) {
    const currentItem = this.getRoot().children[id];
    const newItem = this.newTodo(name, id, done);
    this.getRoot().replaceChild(newItem, currentItem);
  }
  removeTodo(id) {
    const targetChild = this.getRoot().children[id];

    if (targetChild){
       this.getRoot().removeChild(targetChild); 
    }
  }
  setCheckTodoCallback(fn) {
    this.checkTodoCallback = fn;
  }
  newTodo = (item, id, checked) => {
    const checkboxLabelContainer = document.createElement("label");
    checkboxLabelContainer.id = id;

    let inputId = `${id}-input`;
    checkboxLabelContainer.innerHTML = renderTodo(item, inputId, checked);
    let checkbox = checkboxLabelContainer.children[inputId]; 

    checkbox.addEventListener("change", () => {
      this.checkTodoCallback(id, checkbox.checked);
    });
    return checkboxLabelContainer;
  };
  removeDoneTodos(cb) {
    Array.from(this.getRoot().children).forEach((n) => {
      if (n.control.checked) {
        cb(n.id);
        this.removeTodo(n.id);
      }
    });
  }
  getCheckedItems = () => {
    return Array.from(this.getRoot().getElementsByTagName("input")).map((x) => x.checked)
  }
}

export default TodoList;
