import './results.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Item, completeGenerate } from '../../redux/slices/inventorySlice';
import { iIngredient, ingredients } from '../../ingredients';
import { change } from '../../redux/slices/pageSlice';
import resImg from '../../assets/results-background.png';
import { TbRosetteNumber1, TbRosetteNumber2 } from 'react-icons/tb';

interface Props {
  resRef: React.MutableRefObject<HTMLDivElement | null>;
}

interface iResult {
  product1: string;
  product2: string;
  ingredient1: string[];
  ingredient2: string[];
}

export default function Results({ resRef }: Props) {
  const { process, list } = useSelector((state: RootState) => state.inventory);
  const [result, setResult] = useState<iResult[] | undefined | null>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list && process === true) {
      setResult(undefined);
      let tempResult: iResult[] = [];

      const findProblemMatchesHelper = (item: Item, ingredient: string) => {
        const index = ingredients.findIndex(
          (element) => element.name === ingredient
        );
        const problemIngredients = ingredients[index].avoid;
        const matches: string[] = [];

        if (item.ingredients) {
          for (let c = 0; c < item.ingredients.length; c++) {
            for (let d = 0; d < problemIngredients.length; d++) {
              if (item.ingredients[c].toLowerCase() === problemIngredients[d]) {
                matches.push(problemIngredients[d]);
              }
            }
          }
        }
        return matches;
      };

      for (let i = 0; i < list.length; i++) {
        const itemOneProblem = findProblemIngredient(list[i], ingredients);

        if (itemOneProblem.length >= 1) {
          for (let k = 0; k < itemOneProblem.length; k++) {
            for (let l = 0; l < list.length; l++) {
              if (l !== i) {
                const problemMatchesOne = findProblemMatchesHelper(
                  list[l],
                  itemOneProblem[k]
                );
                const entry = {
                  product1: list[i].name,
                  product2: list[l].name,
                  ingredient1: itemOneProblem,
                  ingredient2: problemMatchesOne,
                };

                if (
                  problemMatchesOne.length >= 1 &&
                  !tempResult.some((element) => areResultsEqual(element, entry))
                ) {
                  tempResult.push(entry);
                }
              }
            }
          }
        } else {
          const itemTwoProblem = findProblemIngredient(list[i], ingredients);

          if (itemTwoProblem.length >= 1) {
            for (let m = 0; m < itemTwoProblem.length; m++) {
              for (let n = 0; n < list.length; n++) {
                if (n !== i) {
                  const problemMatchesTwo = findProblemMatchesHelper(
                    list[n],
                    itemTwoProblem[m]
                  );
                  const entry = {
                    product1: list[i].name,
                    product2: list[n].name,
                    ingredient1: itemTwoProblem,
                    ingredient2: problemMatchesTwo,
                  };

                  if (
                    problemMatchesTwo.length >= 1 &&
                    !tempResult.some((element) =>
                      areResultsEqual(element, entry)
                    )
                  ) {
                    tempResult.push(entry);
                  }
                }
              }
            }
          }
        }
      }
      if (tempResult.length >= 1) setResult(removeDuplicate(tempResult));
      else if (tempResult.length === 0) setResult(null);
      dispatch(completeGenerate());
    }
  }, [process]);

  function findProblemIngredient(item: Item, array: iIngredient[]) {
    const problem: string[] = [];

    if (item.ingredients) {
      for (let a = 0; a < item.ingredients.length; a++) {
        for (let b = 0; b < array.length; b++) {
          if (item.ingredients[a].toLowerCase().includes(array[b].name)) {
            problem.push(array[b].name);
          }
        }
      }
    }
    return problem;
  }

  function areResultsEqual(result1: iResult, result2: iResult) {
    return (
      result1.product1 === result2.product1 &&
      result1.product2 === result2.product2 &&
      arraysEqual(result1.ingredient1, result2.ingredient1) &&
      arraysEqual(result1.ingredient2, result2.ingredient2)
    );
  }

  function arraysEqual(arr1: string[], arr2: string[]) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  function removeDuplicate(arr: iResult[]) {
    let toRemove: iResult[] = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (j !== i) {
          if (
            arr[i].product1 === arr[j].product2 &&
            arr[i].product2 === arr[j].product1
          ) {
            if (
              arr[i].ingredient1.length > 1 &&
              arr[i].ingredient1.length > arr[j].ingredient1.length
            )
              toRemove.push(arr[j]);
            else if (
              arr[j].ingredient1.length > 1 &&
              arr[j].ingredient1.length > arr[i].ingredient1.length
            )
              toRemove.push(arr[i]);
          }
        }
      }
    }
    const indexSet = Array.from(new Set(toRemove));

    for (let k = 0; k < indexSet.length; k++) {
      let indexRemove = arr.indexOf(indexSet[k]);
      arr.splice(indexRemove, 1);
    }

    return arr;
  }

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
        {result && list && list.length > 1 && (
          <h1>
            {process === true ? 'Generating Your Results...' : 'Your Results'}
          </h1>
        )}

        {list && list.length <= 1 && (
          <div id='result-insufficient'>
            <button
              className='btn'
              onClick={() => dispatch(change(2))}>
              <span>Go back</span>
            </button>
            <h1>and enter more items!</h1>
          </div>
        )}

        {result === undefined && list && list.length >= 2 && (
          <div id='result-insufficient'>
            <button
              className='btn'
              onClick={() => dispatch(change(2))}>
              <span>Go back</span>
            </button>
            <h1>and generate!</h1>
          </div>
        )}

        {result && result.length >= 1 && (
          <div className='result-header'>
            <h2>Products</h2>
            <h2>Ingredients</h2>
          </div>
        )}
        <div id='result-list-container'>
          {result &&
            result.length >= 1 &&
            result.map((res, index) => {
              return (
                <div
                  className='result-item'
                  key={index}>
                  <div className='product-names'>
                    <span>
                      <TbRosetteNumber1 size={22} /> {res.product1}
                    </span>
                    <span>
                      <TbRosetteNumber2 size={22} /> {res.product2}
                    </span>
                  </div>

                  <span className='ingredient-names'>
                    {res.ingredient1.join(', ')} & {res.ingredient2}
                  </span>
                </div>
              );
            })}

          {result === null && list && list.length >= 2 && (
            <h1>All good to go - your products can be used together!</h1>
          )}
        </div>
      </div>
    </div>
  );
}
