import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './instructions.scss';
import { change } from '../../redux/slices/pageSlice';
import img1 from '../../assets/instructions-1.png';
import img2 from '../../assets/instructions-2.png';
import img3 from '../../assets/instructions-3.png';
import img4 from '../../assets/instructions-4.png';
import img5 from '../../assets/instructions-5.png';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';

interface Props {
  insRef: React.MutableRefObject<HTMLDivElement | null>;
}

interface iSlides {
  img: string;
  text: string;
}

export default function Instructions({ insRef }: Props) {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: iSlides[] = [
    {
      img: img1,
      text: 'Navigate to the Inventory page using the page navigator on the top right corner of the page OR the Get Started button on the bottom of the current page',
    },
    {
      img: img2,
      text: 'Type or paste in your product name & its ingredients, then click on the add button',
    },
    {
      img: img3,
      text: 'Use the left and right chevrons on the sides of the page to navigate your products, click on the X on the top right of the product if you wish to remove it',
    },
    {
      img: img4,
      text: "Once you've entered in all your products, click of the Generate Results button",
    },
    {
      img: img5,
      text: 'Your results will be generated! On the left side of each card is the conflicting products, and the right side shows the specific ingredients which are conflicting with each other.',
    },
  ];

  return (
    <div
      id='instructions-container'
      className='section-container'
      ref={insRef}>
      <div id='instructions-slide-container'>
        {currentSlide > 0 ? (
          <button onClick={() => setCurrentSlide(currentSlide - 1)}>
            <AiOutlineCaretLeft size={40} />
          </button>
        ) : (
          <button disabled>
            <AiOutlineCaretLeft size={40} />
          </button>
        )}

        <div id='instructions-content-container'>
          <h2>Step {currentSlide + 1}</h2>
          <div id='instructions-image-container'>
            <img
              src={slides[currentSlide].img}
              alt={`screenshot ${currentSlide + 1}`}
            />
          </div>

          <p>{slides[currentSlide].text}</p>
        </div>

        {currentSlide < 4 ? (
          <button onClick={() => setCurrentSlide(currentSlide + 1)}>
            <AiOutlineCaretRight size={40} />
          </button>
        ) : (
          <button disabled>
            <AiOutlineCaretRight size={40} />
          </button>
        )}
      </div>

      <div
        className='btn'
        onClick={() => dispatch(change(2))}>
        <span>Get Started</span>
      </div>
    </div>
  );
}
