import './welcome.scss';
import { useDispatch } from 'react-redux';
import { change } from '../../redux/slices/pageSlice';
import logo from '../../assets/logo.png';

interface Props {
  welRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function Welcome({ welRef }: Props) {
  const dispatch = useDispatch();

  return (
    <div
      id='welcome-container'
      className='section-container'
      ref={welRef}>
      <div id='welcome-header-container'>
        <img
          src={logo}
          alt='logo'
        />
        <p>
          Welcome to <span>ingredient ally</span>!
        </p>
      </div>
      <div id='welcome-content-container'>
        <div className='welcome-content-description'>
          Our website analyzes the ingredients of your skincare products to
          determine which combinations may not work well together. Say goodbye
          to skincare mishaps and embrace a personalized routine that harmonizes
          with your skin's needs. Simplify your skincare journey and unlock the
          secrets to radiant, balanced skin with us.
          <div
            className='btn'
            onClick={() => dispatch(change(1))}>
            <span>Find out how</span>
          </div>
        </div>
      </div>
    </div>
  );
}
