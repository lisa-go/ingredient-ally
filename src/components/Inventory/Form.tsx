import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../../redux/slices/inventorySlice';

export default function Form() {
  const dispatch = useDispatch();

  const [itemName, setItemName] = useState<string>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [processedIngredients, setProcessedIngredients] = useState<string[]>();

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (itemName && ingredients)
      dispatch(add({ name: itemName, ingredients: processedIngredients }));
    (e.target as HTMLFormElement).reset();
  }

  function removeFrontSpace(str: string) {
    let temp = str.split('');
    while (temp[0] === ' ') temp.shift();
    return temp.join('');
  }

  useEffect(() => {
    if (ingredients) {
      let temp: string[] = [];
      for (let i = 0; i < ingredients.length; i++) {
        temp.push(removeFrontSpace(ingredients[i]));
      }
      setProcessedIngredients(temp);
    }
  }, [ingredients]);

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
        placeholder='eg. SK-II - Facial Treatment Essence'
      />

      <label htmlFor='item-ingredients'>Ingredients</label>
      <textarea
        name='item-ingredients'
        id='item-ingredients'
        onChange={(e) => setIngredients(e.target.value.split(','))}
        required
        placeholder='separate ingredients with commas, eg. Galactomyces Ferment Filtrate, Butylene Glycol, Pentylene Glycol, Water, Sodium Benzoate, Methylparaben, Sorbic Acid'
      />

      <button
        type='submit'
        className='btn'>
        <span>add</span>
      </button>
    </form>
  );
}
