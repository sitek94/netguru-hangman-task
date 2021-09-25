import './Modal.scss';

interface CommonModalProps {
  title: string;
  description?: string;
}

type ButtonModalProps =
  | {
      noButton?: never;
      buttonText: string;
      onButtonClick: () => void;
    }
  | {
      noButton: true;
      buttonText?: never;
      onButtonClick?: never;
    };

type ModalProps = CommonModalProps & ButtonModalProps;

function Modal({
  title,
  description,
  buttonText,
  onButtonClick,
  noButton,
}: ModalProps) {
  return (
    <div className="modal">
      <h1 className="title">{title}</h1>
      {description && <p className="description">{description}</p>}
      {!noButton && (
        <button className="button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default Modal;
