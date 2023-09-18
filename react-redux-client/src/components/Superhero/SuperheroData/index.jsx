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
      await dispatch(deleteSuperhero({ imgsId, heroId: superhero.id }));

      setCanFetch(true);
    } catch (error) {
      console.error("Error deleting superhero:", error);
    }
  };

  const handleEdit = async (hero) => {
    try {
      setEditSuperhero(hero);
      setCanFetch(true);
    } catch (error) {
      console.error("Error editing superhero:", error);
    }
  };

  const handleUpdate = async (updatedSuperhero) => {
    try {
      await dispatch(updateSuperhero(updatedSuperhero));

      setEditSuperhero(null);

      setCanFetch(true);
    } catch (error) {
      console.error("Error updating superhero:", error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      dispatch(deleteSuperheroImg(imageId));

      setCanFetch(true);
    } catch (error) {
      console.error("Error deleting superhero image:", error);
    }
  };

  const handleUploadImage = async ({ formData, superheroId }) => {
    try {
      dispatch(uploadSuperheroImg({ formData, superheroId }));

      setCanFetch(true);
    } catch (error) {
      console.error("Error loading superhero image:", error);
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
