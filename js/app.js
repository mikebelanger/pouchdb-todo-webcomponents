class TodoList extends HTMLElement {
  static observedAttributes = ["message"];
  constructor() {
    super();
    this.message = "";
    this.items = [];
    this.removeCallback = (id) => {};
  }
  render() {
    this.innerHTML = "";
    this.items.forEach((item, index) => {
      const li = this.generateItem(item.name, item.id);
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
    const newItem = this.generateItem(name, id);
    this.appendChild(newItem);
  }
  removeItem(id) {
    const index = this.items.findIndex((x) => x.id === id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.removeChild(this.children[id]);
      this.removeCallback(id);
    }
  }
  setRemoveCallback(fn) {
    this.removeCallback = fn;
  }
  generateItem = (item, id) => {
    const el = document.createElement("li");
    el.textContent = item;
    el.id = id;
    el.addEventListener("click", () => {
      this.removeItem(id);
    });
    return el;
  };

}

export default TodoList;
