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
    this.innerHTML = this.generateRoot(this.rootID).outerHTML;
    this.items.forEach((item, index) => {
      const li = this.generateItem(item.name, item.id);
      this.getRoot().appendChild(li);
    });
  }
  generateRoot(id) {
    const ul = document.createElement("fieldset");
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
  generateItem = (item, id, checked) => {
    const checkboxLabelContainer = document.createElement("label");
    checkboxLabelContainer.id = id;

    let inputId = `${id}-input`;
    checkboxLabelContainer.innerHTML = `
      <input type="checkbox" name="${item}" id="${inputId}" />
      ${item}
    `;

    checkboxLabelContainer.children[inputId].addEventListener("click", () => {
      this.removeItem(id);
    });
    return checkboxLabelContainer;
  };

}

export default TodoList;
