import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSuperheros,
  deleteSuperhero,
  updateSuperhero,
  deleteSuperheroImg,
  uploadSuperheroImg,
} from "../../../../redux/slices/superheroSlice";
import constants from "../../../../constants";
import EditSuperheroForm from "../EditSuperheroForm";
import SuperheroCard from "./SuperheroCard";

function GetAllSuperheros(props) {
  const dispatch = useDispatch();
  const superheros = useSelector((state) => state.sphero.allSuperheros);


  const [editSuperhero, setEditSuperhero] = useState(null);

  useEffect(() => {
    dispatch(getAllSuperheros());
  }, [dispatch]);

  const handleDelete = async (superhero) => {
    const imgsId = superhero.SuperhroImgs.map((img) => img.id);
    try {
      await dispatch(deleteSuperhero({ imgsId, heroId: superhero.id }));
      dispatch(getAllSuperheros());
    } catch (error) {
      console.error("Ошибка при удалении супергероя:", error);
    }
  };

  const handleEdit = (hero) => {
    setEditSuperhero(hero);
  };

  const handleUpdate = (updatedSuperhero) => {
    dispatch(updateSuperhero(updatedSuperhero));
    dispatch(getAllSuperheros());
    setEditSuperhero(null);
  };

  const handleDeleteImage = (imageId) => {
    dispatch(deleteSuperheroImg(imageId));
    dispatch(getAllSuperheros());
  };

  const handleUploadImage = ({ formData, superheroId }) => {
    dispatch(uploadSuperheroImg({ formData, superheroId }));
    dispatch(getAllSuperheros());
  };

  return (
    <>
      <div>
        <h1>Супергерои</h1>
        {superheros ? (
          superheros.map((hero) => {
            return (
              <SuperheroCard
                superheroData={hero}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            );
          })
        ) : (
          <div>Error</div>
        )}
      </div>
      {editSuperhero && (
        <EditSuperheroForm
          superhero={editSuperhero}
          onUpdate={handleUpdate}
          onDeleteImage={handleDeleteImage}
          onUploadImage={handleUploadImage}
        />
      )}
      <button onClick={() => dispatch(getAllSuperheros())}>
        Get Superheros
      </button>
    </>
  );
}

export default GetAllSuperheros;
