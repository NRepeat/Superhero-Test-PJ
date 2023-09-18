import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSuperheros,
  deleteSuperhero,
  updateSuperhero,
  deleteSuperheroImg,
  uploadSuperheroImg,
} from "../../../redux/slices/superheroSlice";
import SuperheroCard from "../SuperheroCard.jsx/SuperheroCard";

function SuperheroData(props) {
  const dispatch = useDispatch();
  const superheros = useSelector((state) => state.sphero.allSuperheros);
  const [canFetch, setCanFetch] = useState(true);
  const [editSuperhero, setEditSuperhero] = useState(null);

  useEffect(() => {
    if (canFetch) {
      dispatch(getAllSuperheros());
      dispatch(getAllSuperheros());
      setCanFetch(false);
    }
  }, [canFetch, dispatch]);

  const handleDelete = async (superhero) => {
    try {
      const imgsId = superhero.SuperhroImgs.map((img) => img.id);
      await dispatch(deleteSuperhero({ imgsId, heroId: superhero.id }));
      setCanFetch(true);
    } catch (error) {
      console.error("Ошибка при удалении супергероя:", error);
    }
  };

  const handleEdit = async (hero) => {
    try {
      setEditSuperhero(hero);
      setCanFetch(true);
    } catch (error) {
      console.error("Ошибка при редактировании супергероя:", error);
    }
  };

  const handleUpdate = async (updatedSuperhero) => {
    try {

      await dispatch(updateSuperhero(updatedSuperhero));
      setEditSuperhero(null);

      setCanFetch(true);
    } catch (error) {
      console.error("Ошибка при обновлении супергероя:", error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      dispatch(deleteSuperheroImg(imageId));
      setCanFetch(true);
    } catch (error) {
      console.error("Ошибка при удалении изображения супергероя:", error);
    }
  };

  const handleUploadImage = async ({ formData, superheroId }) => {
    try {
      dispatch(uploadSuperheroImg({ formData, superheroId }));
      setCanFetch(true);
    } catch (error) {
      console.error("Ошибка при загрузке изображения супергероя:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Супергерои</h1>
        {superheros ? (
          superheros.map((hero, id) => {
            return (
              <SuperheroCard
                key={id}
                superheroData={hero}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onUpdate={handleUpdate}
                onDeleteImage={handleDeleteImage}
                onUploadImage={handleUploadImage}
                editSuperhero={editSuperhero}
              />
            );
          })
        ) : (
          <div>Error</div>
        )}
      </div>
    </>
  );
}

export default SuperheroData;
