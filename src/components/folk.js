import head from 'images/head.png';
import './folk.scss';

function Folk() {
  return (
    <div className="folk">
      <div className="neck" />
      <img className="head" alt="Folk's head" src={head} />
      <div className="corpus">
        <div className="corpus--top" />
        <div className="corpus--bottom" />
      </div>
      <div className="hand hand--left" />
      <div className="hand hand--right" />
      <div className="arm arm--left" />
      <div className="arm arm--right" />
      <div className="foot foot--left" />
      <div className="foot foot--right" />
      <div className="leg leg--left" />
      <div className="leg leg--right" />
    </div>
  )
}

export default Folk;