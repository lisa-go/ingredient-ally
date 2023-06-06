import { useDispatch, useSelector } from 'react-redux';
import Welcome from './components/Welcome/Welcome';
import { RootState } from './redux/store';
import { change } from './redux/slices/pageSlice';
import { useEffect } from 'react';

export default function App() {
  const page = useSelector((state: RootState) => state.page.current);
  const dispatch = useDispatch();
  const pages = ['Welcome', 'Instructions'];

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <div className='App'>
      <select
        id='navigate'
        onChange={(e) => dispatch(change(+e.target.value))}
        value={page}>
        {pages.map((p, index) => (
          <option
            value={index}
            key={index}>
            {p}
          </option>
        ))}
      </select>
      <Welcome />
    </div>
  );
}
