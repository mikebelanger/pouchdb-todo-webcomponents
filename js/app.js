const randomID = () => {
  const randomTime = new Date().getTime();
  return `${Math.floor(Math.random() * randomTime)}`;
};

const setAttributes = (element, attributes) => {
  for (var name in attributes) {
    element.setAttribute(name, attributes[name]);
  }
  return element;
};

const renderTodo = (text, id, checked) => {
  const inputTag = document.createElement("input");
  if (checked) {
    inputTag.setAttribute("checked", true);
  }
  const attributes = {
    id,
    type: "checkbox",
    name: text,
  };
  setAttributes(inputTag, attributes);
  return inputTag;
};

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.checkTodoCallback = (id, done) => {};
  }
  render(items = []) {
    items.forEach((item, index) => {
      const todo = this.newTodo(item.name, item.id, item.done);
      this.appendChild(todo);
    });
  }
  connectedCallback() {
    this.render();
  }
  addTodo(name, id, done) {
    const newTodo = this.newTodo(name, id, done);
    this.appendChild(newTodo);
  }
  updateTodo(name, id, done) {
    const currentItem = this.children[id];
    const newItem = this.newTodo(name, id, done);
    this.replaceChild(newItem, currentItem);
  }
  removeTodo(id) {
    const targetChild = this.children[id];

    if (targetChild) {
      this.removeChild(targetChild);
    }
  }
  setCheckTodoCallback(fn) {
    this.checkTodoCallback = fn;
  }
  newTodo = (item, id, checked) => {
    const checkboxLabelContainer = document.createElement("label");
    checkboxLabelContainer.id = id;

    let inputId = `${id}-input`;
    checkboxLabelContainer.appendChild(renderTodo(item, inputId, checked));
    checkboxLabelContainer.appendChild(document.createTextNode(item));
    let checkbox = checkboxLabelContainer.children[inputId];

    checkbox.addEventListener("change", () => {
      this.checkTodoCallback(id, checkbox.checked);
    });
    return checkboxLabelContainer;
  };
  removeDoneTodos(cb) {
    Array.from(this.children).forEach((n) => {
      if (n.control.checked) {
        cb(n.id);
        this.removeTodo(n.id);
      }
    });
  }
  getCheckedItems = () => {
    return Array.from(this.getElementsByTagName("input")).map((x) => x.checked);
  };
}

export default TodoList;
