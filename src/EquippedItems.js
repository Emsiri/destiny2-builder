function EquippedItems(props) {
  if (props.urlArray === null) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        {props.urlArray.map((imgSrc, index) => (
          <img src={imgSrc} key={index} alt="Equipped items" />
        ))}
      </div>
    );
  }
}

export default EquippedItems;
