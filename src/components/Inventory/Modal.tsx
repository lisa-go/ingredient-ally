import { useDispatch } from 'react-redux';
import { change } from '../../redux/slices/inventorySlice';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ setModal }: Props) {
  const dispatch = useDispatch();

  return (
    <div
      id='modal-container'
      onClick={() => setModal(false)}>
      <div
        id='modal'
        onClick={(e) => e.stopPropagation()}>
        <p>Delete everything in your inventory?</p>
        <div id='modal-btn-container'>
          <button
            onClick={() => {
              dispatch(change(null));
              localStorage.setItem('local-list', JSON.stringify(''));
              setModal(false);
            }}>
            OK
          </button>
          <button onClick={() => setModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
