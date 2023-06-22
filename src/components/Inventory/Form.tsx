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
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={(e) => submitForm(e)}>
      <h1>add your skincare products</h1>
      <label htmlFor='item-name'>Item Name</label>
      <input
        id='item-name'
        name='item-name'
        type='text'
        onChange={(e) => setItemName(e.target.value)}
        required
        placeholder='eg. COSRX - The Retinol 0.5 Oil'
      />

      <label htmlFor='item-ingredients'>Ingredients</label>
      <textarea
        name='item-ingredients'
        id='item-ingredients'
        onChange={(e) => setIngredients(e.target.value.split(','))}
        required
        placeholder='separate ingredients with commas, eg. Squalane, Glycine Soja (Soybean) Oil, Di-C12-13 Alkyl Malate, Retinol, Caprylic/Capric Triglyceride, BHT, Tocotrienols, Tocopherol, Elaeis Guineensis (Palm) Oil, Hydroxymethoxyphenyl Decanone'
      />

      <button
        type='submit'
        className='btn'>
        <span>add</span>
      </button>
    </form>
  );
}
