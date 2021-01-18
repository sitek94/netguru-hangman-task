import PropTypes from 'prop-types';
import './folk.scss';

const folkParts = [
  'head',
  'neck',
  'corpus',
  'arm arm--right',
  'arm arm--left',
  'hand hand--right',
  'hand hand--left',
  'leg leg--right',
  'leg leg--left',
  'foot foot--right',
  'foot foot--left',
];

function Folk({ visiblePartsCount = 0 }) {
  const visibleParts = folkParts.slice(0, visiblePartsCount);

  return (
    <FolkContainer>
      <div className="folk">
        {visibleParts.map((part) => (
          <div key={part} className={part} />
        ))}
      </div>
    </FolkContainer>
  );
}

Folk.propTypes = {
  visiblePartsCount: PropTypes.number,
};

function FolkContainer({ children }) {
  return (
    <div className="folk-container">
      <div className="bar bar--horizontal" />
      <div className="bar bar--vertical" />
      {children}
    </div>
  );
}

export default Folk;
