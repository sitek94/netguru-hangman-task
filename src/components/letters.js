import './letters.scss';

function Letters() {

  const disabledButtons = Array(4).fill(null);
  
  return (
    <div className="letters">
      {disabledButtons.map((_, i) => (
        <button key={i} disabled />
      ))}
      <button>h</button>
      <button>a</button>
      <button />
      <button />
      <button />
      <button>a</button>
      <button />
    </div>
  );
}

export default Letters;
