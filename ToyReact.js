class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttrubute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(vChild) {
    vChild.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
 
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Component {
  constructor() {
    this.children = [];
  }
  setAttrubute(name, value) {
    this[name] = value;
  }
  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent);
  }
  appendChild(vchild) {
    this.children.push(vchild);
  }
}

const ToyReact = {
  createElement(type, attributes, ...children) {
    console.log(arguments);
    let element;
    if (typeof type === "string") {
      element = new ElementWrapper(type);
    } else {
      element = new type;
    }
    for(let name in attributes) {

      element.setAttrubute(name, attributes[name]);
    }

    let insertChild = (children) => {
      for (let child of children) {
        if (typeof child === "object" && child instanceof Array){
          insertChild(child);
        } else {
          if (!(child instanceof Component) && !(child instanceof ElementWrapper) && !(child instanceof TextWrapper)){
            child = String(child);
          }
          if (typeof child === "string") {
            child = new TextWrapper(child);
          }
          element.appendChild(child);
        }
      }
    }
    insertChild(children)
    return element;
  },
  render(vdom, element) {
    vdom.mountTo(element);
  }
}

ToyReact.Component = Component;
export default ToyReact;