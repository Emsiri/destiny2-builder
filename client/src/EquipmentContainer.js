import React from "react";
import EquippedItems from "./EquippedItems";

class EquipmentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      equipmentUrlArray: null,
      characterId: "2305843009300358704",
    };
  }

  async componentDidMount() {
    const res = await fetch(
      `http://localhost:3001/v1/equipped/${this.state.characterId}`
    );
    // console.log(`res is `, res);
    // const { data } = await res.json();
    const response = await res.json();
    console.log(response);
    let equipmentUrlArray = [];
    for (let el of response.data) {
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

export default EquipmentContainer;
