import React from "react";
import "./App.css";
import EquippedItems from "./EquippedItems";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { equipmentUrlArray: null };
  }

  async componentDidMount() {
    const res = await fetch("http://localhost:3001/equipped");
    const data = await res.json();
    let equipmentUrlArray = [];
    for (let el of data) {
      const fullUrl = `https://www.bungie.net${el.imageUrl}`;
      equipmentUrlArray.push(fullUrl);
    }
    this.setState({ equipmentUrlArray });
  }
  render() {
    return (
      <div className="App">
        <EquippedItems urlArray={this.state.equipmentUrlArray} />
      </div>
    );
  }
}

export default App;
