const randomID = () => {
  const randomTime = new Date().getTime();
  return `${Math.random() * randomTime}`;
}

class TodoList extends HTMLElement {
  static observedAttributes = ["message"];
  constructor() {
    super();
    this.message = "";
    this.items = [];
    this.removeCallback = (id) => {};
    this.rootID = randomID();
  }
  render() {
    this.innerHTML = this.generateUL(this.rootID).outerHTML;
    this.items.forEach((item, index) => {
      const li = this.generateItem(item.name, item.id);
      this.getRoot().appendChild(li);
    });
  }
  generateUL(id) {
    const ul = document.createElement("ul");
    ul.setAttribute("id", id);
    return ul;
  }
  getRoot() {
    return this.children[this.rootID];
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
    this.getRoot().appendChild(newItem);
  }
  removeItem(id) {
    const index = this.items.findIndex((x) => x.id === id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.getRoot().removeChild(this.getRoot().children[id]);
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
