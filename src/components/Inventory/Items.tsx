import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { RxCross1 } from 'react-icons/rx';
import { change } from '../../redux/slices/inventorySlice';

interface Props {
  proRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function Items({ proRef }: Props) {
  const list = useSelector((state: RootState) => state.inventory.list);
  const dispatch = useDispatch();

  function deleteItem(index: number) {
    if (list) {
      let temp = [...list];
      temp.splice(index, 1);
      dispatch(change(temp));
    }
  }

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
            <RxCross1
              onClick={() => {
                deleteItem(index);
              }}
            />
          </div>
        ))}
    </div>
  );
}
