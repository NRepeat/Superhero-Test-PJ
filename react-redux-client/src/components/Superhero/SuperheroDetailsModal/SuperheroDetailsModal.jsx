import React from "react";
import "./style.css";
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
  const close = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  if (!selectedHero) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal">
        <button onClick={onClose}>Close</button>
        <div>
          {selectedHero.id}
          {selectedHero.SuperhroImgs.map((img) => (
            <div key={img.id}>
              <img
                style={{ width: 300, height: 500 }}
                src={`${constants.publicImgURL}${img.superheroImgPath}`}
                alt="Описание изображения"
              />
            </div>
          ))}
          {selectedHero.nickname}
          {selectedHero.realName}
          {selectedHero.originDescription}
          {selectedHero.catchPhrase}
          {selectedHero.superpowers.map((ss, i) => (
            <div key={i}>{ss.superpower.join(", ")}</div>
          ))}
          <button onClick={() => onDelete(selectedHero)}>Delete</button>
          <button onClick={() => onEdit(selectedHero)}>Edit</button>
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
