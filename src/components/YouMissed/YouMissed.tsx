import './YouMissed.scss';

interface YouMissedProps {
  missedLetters: string[];
}

function YouMissed({ missedLetters }: YouMissedProps) {
  return (
    <div className="you-missed">
      <div className="title">You missed:</div>
      <div className="missed-letters">{missedLetters.join(' ')}</div>
    </div>
  );
}

export default YouMissed;
