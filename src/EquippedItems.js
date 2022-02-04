function EquippedItems(props) {
  return (
    <div>
      {props.urlArray.map((imgSrc, index) => (
        <img
          src={imgSrc}
          key={index}
          alt="Make sure to include a alt tag, because react might throw an error at build"
        />
      ))}
    </div>
  );
}

export default EquippedItems;
