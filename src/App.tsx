import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { change } from './redux/slices/pageSlice';
import Welcome from './components/Welcome/Welcome';
import Instructions from './components/Instructions/Instructions';
import Inventory from './components/Inventory/Inventory';
import Results from './components/Results/Results';

interface Page {
  name: string;
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

export default function App() {
  const page = useSelector((state: RootState) => state.page.current);
  const dispatch = useDispatch();

  const welRef = useRef<HTMLDivElement | null>(null);
  const insRef = useRef<HTMLDivElement | null>(null);
  const invRef = useRef<HTMLDivElement | null>(null);
  const resRef = useRef<HTMLDivElement | null>(null);

  const pages: Page[] = [
    { name: 'Welcome', ref: welRef },
    { name: 'Instructions', ref: insRef },
    { name: 'Inventory', ref: invRef },
    { name: 'Results', ref: resRef },
  ];

  const navigate = () => {
    if (page !== null && page !== undefined) {
      pages[page].ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    navigate();
  }, [page]);

  // snap to current section if window is resized
  window.addEventListener('resize', navigate);

  return (
    <div className='App'>
      <div id='right-header'>
        <select
          id='navigate'
          onChange={(e) => dispatch(change(+e.target.value))}
          value={page}>
          {pages.map((p, index) => (
            <option
              value={index}
              key={index}>
              {p.name}
            </option>
          ))}
        </select>
        <p id='page-number'>
          {(page + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
      </div>

      <Welcome welRef={welRef} />
      <Instructions insRef={insRef} />
      <Inventory invRef={invRef} />
      <Results resRef={resRef} />
    </div>
  );
}
