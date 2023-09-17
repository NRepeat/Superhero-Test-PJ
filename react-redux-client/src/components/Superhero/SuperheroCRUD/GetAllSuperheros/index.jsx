import React, { useState } from "react";
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

function GetAllSuperheros(props) {
  const dispatch = useDispatch();
  const sp = useSelector((state) => state.sphero.allSuperheros);

  const [editSuperhero, setEditSuperhero] = useState(null);

  const submitHandler = (values) => {
    dispatch(getAllSuperheros());
  };

  const handleDelete = (data, heroId) => {
    const imgsId = data.map((img) => img.id);
    dispatch(deleteSuperhero({ imgsId, heroId }));
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
  };

  const handleUploadImage = ({ formData, superheroId }) => {
    dispatch(uploadSuperheroImg({ formData, superheroId }));
  };
  const MapedSp = (data) => {
    if (data) {
      return (
        <div>
          <h1>Супергерои</h1>
          <ul>
            {data.map((heroes) => (
              <li key={heroes.id}>
                {heroes.map((hero) => (
                  <div key={hero.id}>
                    {hero.id}
                    {hero.SuperhroImgs.map((img) => (
                      <img
                        style={{ width: 300 }}
                        src={`${constants.publicImgURL}${img.superheroImgPath}`}
                        alt="Описание изображения"
                      />
                    ))}
                    {hero.nickname}
                    {hero.realName}
                    {hero.originDescription}
                    {hero.catchPhrase}
                    {hero.superpowers.map((ss) =>
                      ss.superpower.map((s, i) => <div key={i}>{s}</div>)
                    )}
                    <button
                      onClick={() => handleDelete(hero.SuperhroImgs, hero.id)}
                    >
                      Delete
                    </button>
                    <button onClick={() => handleEdit(hero)}>Edit</button>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <>Error</>;
  };

  return (
    <>
      {MapedSp(sp)}
      {editSuperhero && (
        <EditSuperheroForm
          superhero={editSuperhero}
          onUpdate={handleUpdate}
          onDeleteImage={handleDeleteImage}
          onUploadImage={handleUploadImage}
        />
      )}
      <button onClick={submitHandler}>Get Superheros</button>
    </>
  );
}

export default GetAllSuperheros;
