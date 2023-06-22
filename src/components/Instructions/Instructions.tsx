import { useDispatch } from 'react-redux';
import './instructions.scss';
import { change } from '../../redux/slices/pageSlice';

interface Props {
  insRef: React.MutableRefObject<HTMLDivElement | null>;
}
export default function Instructions({ insRef }: Props) {
  const dispatch = useDispatch();

  return (
    <div
      id='instructions-container'
      className='section-container'
      ref={insRef}>
      Instructions
      <div
        className='btn'
        onClick={() => dispatch(change(2))}>
        <span>Get Started</span>
      </div>
    </div>
  );
}
