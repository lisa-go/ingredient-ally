import './inventory.scss';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { generate } from '../../redux/slices/inventorySlice';
import { change } from '../../redux/slices/pageSlice';
import Form from './Form';
import Items from './Items';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
import { BiSprayCan } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Modal from './Modal';

interface Props {
  invRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function Inventory({ invRef }: Props) {
  const proRef = useRef<HTMLDivElement | null>(null);
  const list = useSelector((state: RootState) => state.inventory.list);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  function scroll(direction: string) {
    if (proRef.current) {
      if (direction === 'left') {
        proRef.current.scrollLeft -= proRef.current.clientWidth - 125;
      } else if (direction === 'right') {
        proRef.current.scrollLeft += proRef.current.clientWidth - 125;
      }
    }
  }

  return (
    <div
      id='inventory-container'
      className='section-container'
      ref={invRef}>
      <Form />

      {list && list.length > 1 ? (
        <div id='inventory-btn-container'>
          <button
            id='inventory-dlt-btn'
            onClick={() => setModal(true)}>
            <RiDeleteBin6Line size={30} />
            <span>Delete Inventory</span>
          </button>
          <button
            id='generate-btn'
            onClick={() => {
              dispatch(generate());
              dispatch(change(3));
            }}>
            <BiSprayCan size={30} />
            <span>Generate Results</span>
          </button>
        </div>
      ) : (
        <button
          id='generate-btn'
          disabled>
          <BiSprayCan size={30} />
          <span>Generate Results</span>
        </button>
      )}

      <div id='product-scroll-container'>
        {list &&
        proRef.current?.clientWidth &&
        list.length * 300 >= proRef.current?.clientWidth ? (
          <button onClick={() => scroll('left')}>
            <AiOutlineCaretLeft size={40} />
          </button>
        ) : (
          <button disabled>
            <AiOutlineCaretLeft size={40} />
          </button>
        )}
        <Items proRef={proRef} />
        {list &&
        proRef.current?.clientWidth &&
        list.length * 300 >= proRef.current?.clientWidth ? (
          <button onClick={() => scroll('right')}>
            <AiOutlineCaretRight size={40} />
          </button>
        ) : (
          <button disabled>
            <AiOutlineCaretRight size={40} />
          </button>
        )}
      </div>
      {modal && <Modal setModal={setModal} />}
    </div>
  );
}
