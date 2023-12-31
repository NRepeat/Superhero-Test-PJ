import React, { useEffect, useState } from "react";
import constants from "../../../constants";
import SuperheroDetailsModal from "../SuperheroDetailsModal/SuperheroDetailsModal";
import style from "./style.module.scss";
function SuperheroCard({
  superheroData,
  onDelete,
  onEdit,
  onUpdate,
  onDeleteImage,
  onUploadImage,
  editSuperhero,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [heroesToDisplay, setHeroesToDisplay] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    setHeroesToDisplay(getHeroesForCurrentPage());
  }, [superheroData, currentPage]);

  useEffect(() => {
    if (selectedHero) {
      const updatedSelectedHero = heroesToDisplay.find(
        (hero) => hero.id === selectedHero.id
      );
      setSelectedHero(updatedSelectedHero || null);
    }
  }, [heroesToDisplay,selectedHero]);

  const getHeroesForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return superheroData.slice(startIndex, endIndex);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const openDescription = selectedHero !== null;

  return (
    <div className={style.cardContainer}>
      <div></div>
      <div className={style.cardWrapper}>
        {heroesToDisplay
          ? heroesToDisplay
              .slice()
              .sort((a, b) => a.id - b.id) 
              .map((hero) => (
                <div
                  key={hero.id}
                  onClick={() => setSelectedHero(hero)}
                  className={style.card}
                >
                  <p>Superhero ID: {hero.id}</p>
                  {hero.SuperhroImgs[0] && (
                    <img
                      src={`${constants.publicImgURL}${hero.SuperhroImgs[0].superheroImgPath}`}
                      alt="Описание изображения"
                    />
                  )}
                  <div>
                    <p>Nickname: {hero.nickname}</p>
                    <button onClick={() => setSelectedHero(hero)}>
                      Details
                    </button>
                  </div>
                </div>
              ))
          : null}
      </div>

      {openDescription && selectedHero && (
        <SuperheroDetailsModal
          selectedHero={selectedHero}
          onClose={() => setSelectedHero(null)}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onDeleteImage={onDeleteImage}
          onUploadImage={onUploadImage}
          editSuperhero={editSuperhero}
        />
      )}

      <div className={style.pagination}>
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
