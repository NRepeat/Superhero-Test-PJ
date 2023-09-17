import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSuperheros,
  deleteSuperhero,
} from "../../../../redux/slices/superheroSlice";
import constants from "../../../../constants";

function GetAllSuperheros(props) {
  const dispatch = useDispatch();
  const sp = useSelector((state) => state.sphero.allSuperheros);

  const submitHandler = (values) => {
    dispatch(getAllSuperheros());
  };
  const handleDelete = (data,heroId) => {
    console.log(data);
    const imgsId = data.map((img) => img.id);
    dispatch(deleteSuperhero({imgsId,heroId}));
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
                    <button onClick={() => handleDelete(hero.SuperhroImgs,hero.id)}>
                      Deltete
                    </button>
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
      <button onClick={submitHandler}>Get Superheros</button>
    </>
  );
}

export default GetAllSuperheros;
