import React from "react";
import CharacterButton from "./CharacterButton";
const membershipId = "4611686018468712969";

class CharacterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.setState({ characterIds: null });
  }

  async componentDidMount() {
    const res = await fetch(`http://localhost:3001/v1/profile/${membershipId}`);
    console.log(`res of characterId is `, res);
    const response = await res.json();
    const characterIds = response.Data;
    console.log(response);
    this.setState({ characterIds });
  }

  render() {
    const characterIds = this.state.characterIds;
    return (
      <div className="App">
        {characterIds ? (
          <CharacterButton
            characterId={this.state.characterIds[0]}
          ></CharacterButton>
        ) : (
          <h1 style={{ color: "white" }}>Loading Characters...</h1>
        )}
      </div>
    );
  }
}

export default CharacterContainer;
