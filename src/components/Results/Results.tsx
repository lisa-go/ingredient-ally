import './results.scss';
import resImg from '../../assets/results-background.png';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ingredients } from '../../ingredients';

interface Props {
  resRef: React.MutableRefObject<HTMLDivElement | null>;
}

interface iResult {
  product1: String;
  product2: String;
  ingredient1: String;
  ingredient2: String;
}

export default function Results({ resRef }: Props) {
  const [loading, setLoading] = useState(false);
  const inventory = useSelector((state: RootState) => state.inventory);
  const [result, setResult] = useState<iResult[]>();

  useEffect(() => {
    if (inventory.process === true) {
      setLoading(true);
      let tempResult: iResult[] = [];

      if (inventory.list) {
        inventory.list.forEach((item) => {
          item.ingredients.forEach((ingredient) => {
            const matchingIngredient = ingredients.find(
              (ing) => ing.name.toLowerCase() === ingredient.toLowerCase()
            );

            if (matchingIngredient) {
              inventory.list?.forEach((otherItem) => {
                if (otherItem !== item) {
                  otherItem.ingredients.forEach((otherIngredient) => {
                    if (
                      matchingIngredient.avoid.includes(
                        otherIngredient.toLowerCase()
                      )
                    ) {
                      tempResult.push({
                        product1: item.name,
                        product2: otherItem.name,
                        ingredient1: ingredient,
                        ingredient2: otherIngredient,
                      });
                    }
                  });
                }
              });
            }
          });
        });
      }
      setResult(tempResult);
      setLoading(false);
    }
  }, [inventory.process]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div
      id='results-container'
      className='section-container'
      ref={resRef}>
      <img
        src={resImg}
        alt='image of a woman applying skincare'
      />

      <div id='results'>
        <h1>{loading ? 'Generating Your Results...' : 'Your Results'}</h1>
      </div>
    </div>
  );
}
