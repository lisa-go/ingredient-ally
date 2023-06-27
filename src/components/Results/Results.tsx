import './results.scss';
import resImg from '../../assets/results-background.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { iIngredient, ingredients } from '../../ingredients';
import { BiSprayCan } from 'react-icons/bi';
import {
  Item,
  completeGenerate,
  generate,
} from '../../redux/slices/inventorySlice';

interface Props {
  resRef: React.MutableRefObject<HTMLDivElement | null>;
}

interface iResult {
  product1: String;
  product2: String;
  ingredient1: String[];
  ingredient2: String[];
}

export default function Results({ resRef }: Props) {
  const { process, list } = useSelector((state: RootState) => state.inventory);
  const [result, setResult] = useState<iResult[] | undefined>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(result);
  }, [result]);

  useEffect(() => {
    if (list && process === true) {
      /* reset results */
      setResult(undefined);
      let tempResult: iResult[] = [];
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          /* checking if item 1 has any problem ingredients, then checking other items against that problem ingredient */
          let itemOneProblem = findProblemIngredient(list[i], ingredients);
          if (itemOneProblem.length >= 1) {
            for (let k = 0; k < itemOneProblem.length; k++) {
              for (let l = 0; l < list.length; l++) {
                if (l !== i) {
                  let problemMatchesOne = findProblemMatches(
                    itemOneProblem[k],
                    list[l],
                    ingredients
                  );
                  if (problemMatchesOne.length >= 1) {
                    tempResult.push({
                      product1: list[i].name,
                      product2: list[l].name,
                      ingredient1: itemOneProblem,
                      ingredient2: problemMatchesOne,
                    });
                  }
                }
              }
            }
          } else {
            /* checking item 2 */
            let itemTwoProblem = findProblemIngredient(list[j], ingredients);
            if (itemTwoProblem.length >= 1) {
              for (let m = 0; m < itemTwoProblem.length; m++) {
                for (let n = 0; n < list.length; n++) {
                  if (n !== j) {
                    let problemMatchesTwo = findProblemMatches(
                      itemTwoProblem[m],
                      list[n],
                      ingredients
                    );
                    if (problemMatchesTwo.length >= 1) {
                      tempResult.push({
                        product1: list[j].name,
                        product2: list[n].name,
                        ingredient1: itemTwoProblem,
                        ingredient2: problemMatchesTwo,
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
      let removeDuplicate = Array.from(new Set(tempResult));
      setResult(removeDuplicate);
      dispatch(completeGenerate());
    }
  }, [process]);

  function findProblemIngredient(item: Item, array: iIngredient[]) {
    let problem: string[] = [];
    for (let a = 0; a < item.ingredients.length; a++) {
      for (let b = 0; b < array.length; b++) {
        if (item.ingredients[a].toLowerCase() === array[b].name) {
          problem.push(array[b].name);
        }
      }
    }
    return problem;
  }

  function findProblemMatches(
    ingredient: string,
    item: Item,
    array: iIngredient[]
  ) {
    let matches: string[] = [];

    let index: number = array.findIndex(
      (element) => element.name === ingredient
    );
    let problemIngredients: string[] = array[index].avoid;

    for (let c = 0; c < item.ingredients.length; c++) {
      for (let d = 0; d < problemIngredients.length; d++) {
        if (item.ingredients[c].toLowerCase() === problemIngredients[d]) {
          matches.push(problemIngredients[d]);
        }
      }
    }
    return matches;
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
        <button
          id='generate-btn'
          onClick={() => dispatch(generate())}>
          <BiSprayCan size={30} />
          <h1>Generate your results</h1>
        </button>
        {list && list.length > 1 ? (
          result ? (
            <h1>
              {process === true ? 'Generating Your Results...' : 'Your Results'}
            </h1>
          ) : (
            <button
              id='generate-btn'
              onClick={() => dispatch(generate())}>
              <BiSprayCan size={30} />
              <h1>Generate your results</h1>
            </button>
          )
        ) : (
          <h1>Go back and enter in more items!</h1>
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
                    <span>{res.product1}</span>
                    <span>{res.product2}</span>
                  </div>

                  <span>
                    {res.ingredient1} & {res.ingredient2}
                  </span>
                </div>
              );
            })}

          {/*           {result && result.length === 0 && (
            <h1>All good to go - your products can be used together!</h1>
          )} */}
        </div>
      </div>
    </div>
  );
}
