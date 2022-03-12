function characterButton(props) {
  return (
    <div>
      <button data-id="characterButton">
        <p>{props.lightLevel}</p>
        <p>{props.class}</p>
      </button>
    </div>
  );
}

export default characterButton;
