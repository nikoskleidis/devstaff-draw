import useHasMounted from '@/src/hooks/useHasMounted';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

const MAX_CARD_ANGLE = 15;
const CARD_WIDTH = 200;
const CARD_HEIGHT = 280;

const getViewportSize = () => ({
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
});

const selectRandomPointInViewport = () => {
  const { width, height } = getViewportSize();

  return {
    x: (Math.random() - 0.5) * (width - CARD_WIDTH),
    y: (Math.random() - 0.5) * (height - CARD_HEIGHT)
  };
};

const selectRandomPointOutsideViewport = () => {
  const { width, height } = getViewportSize();

  return {
    x: (Math.random() > 0.5 ? 1 : -1) * (width + CARD_WIDTH),
    y: (Math.random() > 0.5 ? 1 : -1) * (height + CARD_HEIGHT)
  };
};

const selectCards = (cards: number[], count: number) => {
  const selected: number[] = [];

  while (selected.length < count) {
    const num = Math.floor(Math.random() * cards.length);

    if (!selected.includes(num)) {
      selected.push(num);
    }
  }

  return selected;
};

const Cards = () => {
  const [cards, setCards] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prevCards => (prevCards.length + 1 < 20 ? [...prevCards, prevCards.length + 2] : prevCards));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const controls = useAnimationControls();

  const handleCardEnter = (index: number) => {
    controls.start(i => (i === index ? { scale: 1, opacity: 1, transition: { duration: 0.3 } } : {}));
  };

  const handleDraw = async () => {
    const selectedCards = selectCards(cards, 5);

    await controls.start(i => {
      if (selectedCards.includes(cards[i])) {
        return {};
      }

      return {
        ...selectRandomPointOutsideViewport(),
        // Calculate delay so it takes 3 seconds to move all cards
        transition: { delay: (i / cards.length) * 3, duration: 0.3 }
      };
    });

    await controls.start(i => {
      if (!selectedCards.includes(cards[i])) {
        return {};
      }

      return {
        x: 0,
        y: 0
      };
    });

    await controls.start(i => {
      if (!selectedCards.includes(cards[i])) {
        return {};
      }

      const selectedCardIndex = selectedCards.indexOf(cards[i]);

      // Spread the selected cards out with a gap of 32px, so that they form an arc
      return {
        x: (selectedCardIndex - (selectedCards.length - 1) / 2) * (CARD_WIDTH + 32)
      };
    });
  };

  if (!useHasMounted()) {
    return null;
  }

  return (
    <>
      <div
        style={{
          padding: 0,
          backgroundColor: '#111',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {cards.map((num, index) => (
          <motion.div
            key={num}
            custom={index}
            initial={{
              ...selectRandomPointInViewport(),
              rotate: Math.random() * MAX_CARD_ANGLE * (Math.random() > 0.5 ? 1 : -1),
              scale: 3,
              opacity: 0
            }}
            animate={controls}
            onViewportEnter={() => handleCardEnter(index)}
            style={{
              backgroundColor: '#ddd',
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              fontWeight: 'bold',
              fontSize: '4rem',
              borderRadius: '16px',
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}
          >
            {num}
          </motion.div>
        ))}
      </div>

      <button
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px'
        }}
        type="button"
        onClick={handleDraw}
      >
        Draw
      </button>
    </>
  );
};

export default Cards;
