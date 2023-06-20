import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../../redux/slices/inventorySlice';

export default function Form() {
  const dispatch = useDispatch();

  const [itemName, setItemName] = useState<string>();
  const [ingredients, setIngredients] = useState<string[]>();

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (itemName && ingredients)
      dispatch(add({ name: itemName, ingredients: ingredients }));
  }

  return (
    <form onSubmit={(e) => submitForm(e)}>
      <label htmlFor='item-name'>Item Name</label>
      <input
        id='item-name'
        name='item-name'
        type='text'
        onChange={(e) => setItemName(e.target.value)}
        required
      />

      <label htmlFor='item-ingredients'>Ingredients</label>
      <textarea
        name='item-ingredients'
        id='item-ingredients'
        onChange={(e) => setIngredients(e.target.value.split(','))}
        required></textarea>

      <button
        type='submit'
        className='btn'>
        <span>add</span>
      </button>
    </form>
  );
}
