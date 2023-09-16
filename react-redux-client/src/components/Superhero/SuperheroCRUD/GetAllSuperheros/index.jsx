import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { getAllSuperheros } from "../../../../redux/slices/superheroSlice";
import constants from "../../../../constants";

function GetAllSuperheros(props) {
  const dispatch = useDispatch();
  const sp = useSelector((state) => state.sphero.allSuperheros);
  console.log("🚀 ~ file: index.jsx:9 ~ GetAllSuperheros ~ sp:", sp);

  const submitHandler = (values) => {
    dispatch(getAllSuperheros());
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

  // const SpForm = () => {
  //     <Formik>
  //         <Form>
  //             <Field name="Nickname" />
  //             <Field />
  //             <Field />
  //             <Field />
  //         </Form>
  //     </Formik>
  // }

  return (
    <>
      {MapedSp(sp)}
      <button onClick={submitHandler}>Get Superheros</button>
    </>
  );
}

export default GetAllSuperheros;
