import React, { useState } from "react";
import constants from "../../../../constants";

function SuperheroCard({ superheroData, onDelete, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
const  itemsPerPage = 1
  // Функция, которая вырезает часть массива для текущей страницы
  const getHeroesForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return superheroData.slice(startIndex,endIndex );
  };

  // Обработчик для переключения на следующую страницу
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Обработчик для переключения на предыдущую страницу
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const heroesToDisplay = getHeroesForCurrentPage();

  return (
    <div>
      {heroesToDisplay.map((hero) => (
        <div key={hero.id}>
          {hero.id}
          {hero.SuperhroImgs.map((img) => (
            <div key={img.id}>
              <img
                style={{ width: 300, height: 500 }}
                src={`${constants.publicImgURL}${img.superheroImgPath}`}
                alt="Описание изображения"
              />
            </div>
          ))}
          {hero.nickname}
          {hero.realName}
          {hero.originDescription}
          {hero.catchPhrase}
          {hero.superpowers.map((ss, i) => (
            <div key={i}>{ss.superpower.join(", ")}</div>
          ))}
          <button onClick={() => onDelete(hero)}>Delete</button>
          <button onClick={() => onEdit(hero)}>Edit</button>
        </div>
      ))}
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage * itemsPerPage >= superheroData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SuperheroCard;
