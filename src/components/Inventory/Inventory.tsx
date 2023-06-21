import { useRef } from 'react';
import Form from './Form';
import Items from './Items';
import './inventory.scss';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';

interface Props {
  invRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function Inventory({ invRef }: Props) {
  const proRef = useRef<HTMLDivElement | null>(null);

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
      ref={invRef}>
      <Form />
      <div id='product-scroll-container'>
        <button onClick={() => scroll('left')}>
          <AiOutlineCaretLeft size={40} />
        </button>

        <Items proRef={proRef} />
        <button onClick={() => scroll('right')}>
          <AiOutlineCaretRight size={40} />
        </button>
      </div>
    </div>
  );
}
