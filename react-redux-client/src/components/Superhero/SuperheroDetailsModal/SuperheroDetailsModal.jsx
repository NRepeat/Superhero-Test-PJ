import React from "react";
import style from "./style.module.scss";
import constants from "../../../constants";
import EditSuperheroForm from "../EditSuperheroForm/EditSuperheroForm";

function SuperheroDetailsModal({
  selectedHero,
  onClose,
  onDelete,
  onEdit,
  onUpdate,
  onDeleteImage,
  onUploadImage,
  editSuperhero,
}) {
  if (!selectedHero) {
    return null;
  }

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <div className={style.imgWrapper}>
          {" "}
          {selectedHero.SuperhroImgs.map((img) => (
            <div key={img.id}>
              <img
                style={{ width: 300, height: 500 }}
                src={`${constants.publicImgURL}${img.superheroImgPath}`}
                alt="Описание изображения"
              />
            </div>
          ))}
        </div>

        <div>
          <div className={style.bioWrapper}>
            <div>
              {" "}
              <p>Superhero ID: {selectedHero.id}</p>
              <p>Nickname: {selectedHero.nickname}</p>
              <p>Real name: {selectedHero.realName}</p>
              <p>Description: {selectedHero.originDescription}</p>
              <p>Slogan: {selectedHero.catchPhrase}</p>
              <div>
                Superpower:
                {selectedHero.superpowers.map((ss, i) => (
                  <div key={i}>{ss.superpower.join(", ")}</div>
                ))}
              </div>
            </div>
          </div>

          <div className={style.button}>
            {!editSuperhero && (
              <button onClick={() => onEdit(selectedHero)}>Edit</button>
            )}
            {!editSuperhero && (
              <button onClick={() => onDelete(selectedHero)}>Delete</button>
            )}
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
      {editSuperhero && (
        <EditSuperheroForm
          superhero={selectedHero}
          onUpdate={onUpdate}
          onDeleteImage={onDeleteImage}
          onUploadImage={onUploadImage}
        />
      )}
    </div>
  );
}

export default SuperheroDetailsModal;
