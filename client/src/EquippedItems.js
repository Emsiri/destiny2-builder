function EquippedItems(props) {
  return (
    <div>
      {props.urlArray.map((imgSrc, index) => (
        <img src={imgSrc} key={index} alt="Equipped items" />
      ))}
    </div>
  );
}

export default EquippedItems;
