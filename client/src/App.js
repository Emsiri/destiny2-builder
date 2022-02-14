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
    const equipmentUrlArray = this.state.equipmentUrlArray;
    return (
      <div className="App">
        {equipmentUrlArray ? (
          <EquippedItems urlArray={this.state.equipmentUrlArray} />
        ) : (
          <h1 style={{ color: "white" }}>Loading...</h1>
        )}
      </div>
    );
  }
}

export default App;