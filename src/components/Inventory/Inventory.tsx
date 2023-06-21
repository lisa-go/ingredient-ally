import { useEffect, useRef } from 'react';
import Form from './Form';
import Items from './Items';
import './inventory.scss';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {
  invRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function Inventory({ invRef }: Props) {
  const proRef = useRef<HTMLDivElement | null>(null);
  const inventory = useSelector((state: RootState) => state.inventory.list);

  function scroll(direction: string) {
    if (proRef.current) {
      if (direction === 'left') {
        proRef.current.scrollLeft -= proRef.current.clientWidth - 125;
      } else if (direction === 'right') {
        proRef.current.scrollLeft += proRef.current.clientWidth - 125;
      }
    }
  }
  useEffect(() => {
    console.log(proRef.current?.clientWidth);
    console.log(proRef.current?.scrollWidth);
    console.log(inventory);
  }, [proRef.current]);

  return (
    <div
      id='inventory-container'
      ref={invRef}>
      <Form />
      <div id='product-scroll-container'>
        {inventory &&
        proRef.current?.clientWidth &&
        inventory.length * 300 >= proRef.current?.clientWidth ? (
          <button onClick={() => scroll('left')}>
            <AiOutlineCaretLeft size={40} />
          </button>
        ) : (
          <button disabled>
            <AiOutlineCaretLeft size={40} />
          </button>
        )}
        <Items proRef={proRef} />
        {inventory &&
        proRef.current?.clientWidth &&
        inventory.length * 300 >= proRef.current?.clientWidth ? (
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
