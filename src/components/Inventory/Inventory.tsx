import { useRef } from 'react';
import Form from './Form';
import Items from './Items';
import './inventory.scss';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
import { BiSprayCan } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { generate } from '../../redux/slices/inventorySlice';
import { change } from '../../redux/slices/pageSlice';

interface Props {
  invRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function Inventory({ invRef }: Props) {
  const proRef = useRef<HTMLDivElement | null>(null);
  const list = useSelector((state: RootState) => state.inventory.list);
  const dispatch = useDispatch();

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
        <button
          id='generate-btn'
          onClick={() => {
            dispatch(generate());
            dispatch(change(3));
          }}>
          <BiSprayCan size={30} />
          <span>Generate Results</span>
        </button>
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
    </div>
  );
}
