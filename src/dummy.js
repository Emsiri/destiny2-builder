import {getEquppedImages} from './request.js'

const characterId = '2305843009300358704';
// const equippedItems = await getEquppedImages(characterId);
// console.log(equippedItems)
(async function(){
  const equippedItems = await getEquppedImages(characterId);
  console.log(equippedItems)
})()