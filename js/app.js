const ListItem = (item, id) => {
  const el = document.createElement("li");
  el.textContent = item;
  el.id = id;
  return el;
};

class TodoList extends HTMLElement {
  static observedAttributes = ["message"];
  constructor() {
    super();
    this.message = "";
    this.items = [];
    this.removeCallback = (name, id) => {};
  }
  render() {
    this.innerHTML = "";
    this.items.forEach((item, index) => {
      const li = ListItem(item.name, item.id);
      li.addEventListener("click", () => {
        this.items.splice(index, 1);
        this.removeCallback(item.id);
        this.render();
      });
      this.appendChild(li);
    });
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "message") {
      this.message = newValue;
    }
  }
  addItem(name, id) {
    this.items.push({ name, id });
  }
  setRemoveCallback(fn) {
    this.removeCallback = fn;
  }
}

export default TodoList;
