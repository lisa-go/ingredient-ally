import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {
  proRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function Items({ proRef }: Props) {
  const list = useSelector((state: RootState) => state.inventory.list);

  return (
    <div
      id='inventory-list-container'
      ref={proRef}>
      {list &&
        list.map((item, index) => (
          <div
            id='inventory-product-container'
            key={index}>
            <h1>item {index + 1}</h1>
            <h2>{item.name}</h2>
            <p>{item.ingredients.join(',')}</p>
          </div>
        ))}
    </div>
  );
}
