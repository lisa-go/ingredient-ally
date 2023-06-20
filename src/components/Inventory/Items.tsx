import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function Items() {
  const list = useSelector((state: RootState) => state.inventory.list);

  return (
    <div id='inventory-list-container'>
      {list &&
        list.map((item, index) => (
          <div key={index}>
            item {index + 1}
            <div className='list-item-name'>{item.name}</div>
            <div className='list-item-ingredients'>
              {item.ingredients.join(',')}
            </div>
          </div>
        ))}
    </div>
  );
}
