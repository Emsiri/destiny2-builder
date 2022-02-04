import React from "react";
import "./App.css";
import EquippedItems from "./EquippedItems";
import { getEquppedImages } from "./request.js";

const characterId = "2305843009300358704";
// (async function(){
//   const equippedItems = await getEquppedImages(characterId);
//   console.log(equippedItems)
// })()

const imageUrls = [
  "https://www.bungie.net//common/destiny2_content/icons/67634d7a01d7dca3aef90b4612d58489.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/e2184277170b7a5f507f817c2b02fdff.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/cf904cc81fd091ca5ea4db8af0a8f0db.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/557f643ce480e69a800d3dbb52998511.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/51dac9557cd6c46c6f427a26f46392e3.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/d27964261c0c8865e40c45df9a957fa0.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/c3538f44763f6d1e6a25461faaa2abfc.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/41df4704f24ab53f181cc34bbe712872.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/cddda28495dabcbeeb2e823cd7ac7f73.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/ca5cd8e0e66711352c655f38814711a3.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/45e5d26a836ba81cb4ec97789ad7cf28.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/fedcb91b7ab0584c12f0e9fec730702b.png",
  "https://www.bungie.net//common/destiny2_content/icons/dae1683dc61a7cf657963c68d47316d8.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/d9f3e3fecc1a5b6a0ed259edcc17d630.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/618647e637fceceda9bb5034db87a595.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/14aa589109bbd9e95df0757b23511b73.jpg",
  "https://www.bungie.net//common/destiny2_content/icons/33889853c541385911162e4ad8c88ad3.jpg",
];

// function App() {
//   return (
//     <div className="App">
//       <EquippedItems urlArray={equipmentUrlArray} />
//     </div>
//   );
// }
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { equipmentUrlArray: null };
  }

  // async componentDidMount() {
  //   const res = await getEquppedImages(characterId);
  //   let imageUrls = [];
  //   for (let el of res) {
  //     const fullUrl = `https://www.bungie.net/${el.imageUrl}`;
  //     imageUrls.push(fullUrl);
  //   }
  //   this.setState(imageUrls);
  // }
  render() {
    // getEquppedImages(characterId).then((res) => {
    // let imageUrls = [];
    // for (let el of res) {
    //   const fullUrl = `https://www.bungie.net/${el.imageUrl}`;
    //   imageUrls.push(fullUrl);
    // }
    // this.setState(imageUrls);
    // });
    // const equipmentUrlArray = imageUrls;
    // this.setState(equipmentUrlArray);
    return (
      <div className="App">
        <EquippedItems urlArray={imageUrls} />
      </div>
    );
  }
}

export default App;
