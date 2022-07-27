import "./EquippedItems.css";

function EquippedItems(props) {
  return (
    <div className="image-grid" data-testid="image-grid">
      {props.urlArray.map((imgSrc, index) => (
        <img
          src={imgSrc}
          key={index}
          alt="Equipped items"
          className={`equipped-image`}
          data-testid={`equipped-image-${index}`}
        />
      ))}
    </div>
  );
}

export default EquippedItems;
