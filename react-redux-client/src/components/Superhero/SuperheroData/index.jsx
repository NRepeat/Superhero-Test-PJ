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
import style from "./style.module.scss";
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
      const res = await dispatch(
        deleteSuperhero({ imgsId, heroId: superhero.id })
      );
      if (res) {
        alert("Superhero deleted successfully");
      }
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
      const res = await dispatch(updateSuperhero(updatedSuperhero));
      if (res) {
        alert("Superhero updated successfully");
      }
      setEditSuperhero(null);

      setCanFetch(true);
    } catch (error) {
      console.error("Ошибка при обновлении супергероя:", error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
       const res =dispatch(deleteSuperheroImg(imageId));
			if (res) {
        alert("Superhero image deleted successfully");
      }
      setCanFetch(true);
    } catch (error) {
      console.error("Ошибка при удалении изображения супергероя:", error);
    }
  };

  const handleUploadImage = async ({ formData, superheroId }) => {
    try {
     const res = dispatch(uploadSuperheroImg({ formData, superheroId }));
		 if (res) {
			alert("Superhero image uploaded successfully");
		}
      setCanFetch(true);
    } catch (error) {
      console.error("Ошибка при загрузке изображения супергероя:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Superheroes</h1>

        <div className={style.superherosContainer}>
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
      </div>
    </>
  );
}

export default SuperheroData;
