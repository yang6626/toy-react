import ToyReact from './ToyReact.js'
class MyComponent extends ToyReact.Component {
  render() {
    return (
      <div>
        <p>Hello</p>
        <p>ToyReact</p>
        {false}
        {this.children}
      </div>
    )
  }
}
let a = <MyComponent name="yang"><div>123</div><div>456</div></MyComponent>;
ToyReact.render(a, document.body);
