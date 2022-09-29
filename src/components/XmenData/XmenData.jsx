import "./XmenData.css";

function XmenData({ ability, origin, image2 }) {
  return (
    <div className="xmenListData__modal">
      <div className="xmenListData__ability">{ability}</div>
      <div className="xmenListaData__origin">{origin}</div>
      <img className="image__modal" src={image2} />
    </div>
  );
}

export { XmenData };
