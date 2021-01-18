import PropTypes from 'prop-types';
import './modal.scss';

function Modal({ title, description, buttonText, onButtonClick }) {
  return (
    <div className="modal">
      <h1 className="title">{title}</h1>
      {description && <p className="description">{description}</p>}
      <button className="button" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Modal;
