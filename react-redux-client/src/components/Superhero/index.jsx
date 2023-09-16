import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { createSuperhero } from "../../redux/slices/superheroSlice";

function Superhero(props) {
  const dispatch = useDispatch();
  const sp = useSelector((state) => state.sphero);

  const submitHandler = (values) => {
    dispatch(createSuperhero());
  };

  const MapedSp = (data) => {
    if (data.allSuperheros) {
      
      return (
        <div>
          <h1>Супергерои</h1>
          <ul>
            {data.allSuperheros.map((heroes) => (
              <li key={heroes.id}>
                {heroes.map((hero) => (
                  <div key={hero.id}>
                    {hero.id}
										{hero.nickname}
                    {hero.realName}
                    {hero.originDescription}
                    {hero.catchPhrase}
                    {hero.superpowers.map((ss) =>
                      ss.superpower.map((s,i) => <div key={i}>{s}</div>)
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

export default Superhero;
