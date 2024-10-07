import { useEffect, useState } from "react";

const cardStyle = {
  display: "inline-block",
  padding: "10px",
  margin: "10px",
  border: "1px solid black",
  borderRadius: "5px",
  backgroundColor: "lightgrey",
  width: "100px",
  textAlign: "center",
  cursor: "pointer",
};

export const Game = () => {
  const data = {
    Russia: "Moscow",
    France: "Paris",
    Germany: "Berlin",
    Israel: "Jerusalaem",
    Ukraine: "Kyiv",
  };

//   const keys = ['Russia', 'France'];
//   const values = ['Moscow', 'Paris']

//   const newData = keys.reduce((obj, key, index) => {
//     obj[key] = values[index];
//     return obj;
//   },{})

  const countries = Object.keys(data);
  const capitals = Object.values(data);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);
  const [shuffledCapitals, setShuffledCapitals] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardColor, setCardColor] = useState({});
  const [message, setMessage] = useState("");
  const [removedCards, setRemovedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const resetGame = () => {
    setShuffledCapitals(shuffleArray(capitals));
    setMessage("");
    setSelectedCard(null);
    setCardColor({});
    setRemovedCards([]);
    setGameOver(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const onClick = (el) => {
    if (removedCards.includes(el) || gameOver) return;

    if (countries.includes(el)) {
      setSelectedCard(el);
      setCardColor((prev) => ({ [el]: "green" }));
    } else if (selectedCard !== null && capitals.includes(el)) {
      const isMatch = data[selectedCard] === el;

      if (isMatch) {
        setMessage("Correct");
        setRemovedCards((prev) => {
          const newRemovedCards = [...prev, selectedCard, el];
          if (newRemovedCards.length === countries.length + capitals.length) {
            setMessage("U win!");
            setGameOver(true);
          }
          return newRemovedCards;
        });
      } else {
        setMessage("Try again");
        setCardColor((prev) => ({ ...prev, [el]: "red" }));
      }

      setTimeout(() => {
        setCardColor({});
        setSelectedCard(null);
      }, 500);
    }
  };

  const countryCards = countries.map((el, index) =>
    !removedCards.includes(el) ? (
      <div
        onClick={() => onClick(el)}
        key={index}
        style={{
          ...cardStyle,
          backgroundColor: cardColor[el] || "lightgrey",
        }}
      >
        {el}
      </div>
    ) : null
  );

  const capitalCards = shuffledCapitals.map((el, index) =>
    !removedCards.includes(el) ? (
      <div
        onClick={() => onClick(el)}
        key={index}
        style={{
          ...cardStyle,
          backgroundColor: cardColor[el] || "lightgrey",
        }}
      >
        {el}
      </div>
    ) : null
  );

  return (
    <div>
      <h1>Mathcing game</h1>
      {!gameOver ? <h2>Choose country</h2> : null}
      <div>{countryCards}</div>
      {!gameOver ? <h2>Choose capital</h2> : null}
      <div>{capitalCards}</div>
      <h3>{message}</h3>
      {gameOver && <button onClick={resetGame}>New Game</button>}
    </div>
  );
};
