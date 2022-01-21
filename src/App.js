import logo from './logo.svg';
import './App.css';
// import {getEquppedImages} from './request.js'
// import EquippedItems from './EquippedItems.js';

// const characterId = '2305843009300358704'
// (async function(){
//   const equippedItems = await getEquppedImages(characterId);
// })()

const urlArray = [
'https://www.bungie.net//common/destiny2_content/icons/67634d7a01d7dca3aef90b4612d58489.jpg',
'https://www.bungie.net//common/destiny2_content/icons/e2184277170b7a5f507f817c2b02fdff.jpg',
'https://www.bungie.net//common/destiny2_content/icons/cf904cc81fd091ca5ea4db8af0a8f0db.jpg',
'https://www.bungie.net//common/destiny2_content/icons/557f643ce480e69a800d3dbb52998511.jpg',
'https://www.bungie.net//common/destiny2_content/icons/51dac9557cd6c46c6f427a26f46392e3.jpg',
'https://www.bungie.net//common/destiny2_content/icons/d27964261c0c8865e40c45df9a957fa0.jpg',
'https://www.bungie.net//common/destiny2_content/icons/c3538f44763f6d1e6a25461faaa2abfc.jpg',
'https://www.bungie.net//common/destiny2_content/icons/41df4704f24ab53f181cc34bbe712872.jpg',
'https://www.bungie.net//common/destiny2_content/icons/cddda28495dabcbeeb2e823cd7ac7f73.jpg',
'https://www.bungie.net//common/destiny2_content/icons/ca5cd8e0e66711352c655f38814711a3.jpg',
'https://www.bungie.net//common/destiny2_content/icons/45e5d26a836ba81cb4ec97789ad7cf28.jpg',
'https://www.bungie.net//common/destiny2_content/icons/fedcb91b7ab0584c12f0e9fec730702b.png',
'https://www.bungie.net//common/destiny2_content/icons/dae1683dc61a7cf657963c68d47316d8.jpg',
'https://www.bungie.net//common/destiny2_content/icons/d9f3e3fecc1a5b6a0ed259edcc17d630.jpg',
'https://www.bungie.net//common/destiny2_content/icons/618647e637fceceda9bb5034db87a595.jpg',
'https://www.bungie.net//common/destiny2_content/icons/14aa589109bbd9e95df0757b23511b73.jpg',
'https://www.bungie.net//common/destiny2_content/icons/33889853c541385911162e4ad8c88ad3.jpg'
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <ul>${images}</ul> */}
        {/* <img src={images} alt="Equipped Item"></img>; */}
        {urlArray.map((imgSrc, index) => (<img src={imgSrc} key={index} alt="Make sure to include a alt tag, because react might throw an error at build"/>))}
        {/* <EquippedItems imageUrl={urlArray[0]}/>
        <EquippedItems imageUrl={urlArray[1]}/>
        <EquippedItems imageUrl={urlArray[2]}/>
        <EquippedItems imageUrl={urlArray[3]}/>
        <EquippedItems imageUrl={urlArray[4]}/> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
