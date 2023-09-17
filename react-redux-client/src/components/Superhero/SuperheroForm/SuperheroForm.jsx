import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { createSuperhero } from "../../../redux/slices/superheroSlice";
function SuperheroForm() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const init = {
    nickname: "",
    realName: "",
    originDescription: "",
    catchPhrase: "",
    superpower: [""],
    superheroImage: undefined,
  };

  const hsubmit = (values, { resetForm, setSubmitting }) => {
    const formData = new FormData();
    formData.append("image", file);

    dispatch(createSuperhero({ formData, values }));
    console.log("Отправка данных:", { formData, values });

    resetForm();
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Создать супергероя</h2>
      <Formik initialValues={init} onSubmit={hsubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="nickname">Никнейм:</label>
              <Field type="text" id="nickname" name="nickname" />
              <ErrorMessage name="nickname" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="realName">Реальное имя:</label>
              <Field type="text" id="realName" name="realName" />
              <ErrorMessage name="realName" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="originDescription">Описание происхождения:</label>
              <Field
                as="textarea"
                id="originDescription"
                name="originDescription"
              />
              <ErrorMessage
                name="originDescription"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label htmlFor="catchPhrase">Девиз:</label>
              <Field type="text" id="catchPhrase" name="catchPhrase" />
              <ErrorMessage
                name="catchPhrase"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label htmlFor="superpower">Суперспособности:</label>
              <Field type="text" id="superpower" name="superpower" readOnly />
              <button
                type="button"
                onClick={() => {
                  const superpower = [...values.superpower, ""];
                  setFieldValue("superpower", superpower);
                }}
              >
                Добавить суперспособность
              </button>
              {values.superpower.map((superpower, index) => (
                <div key={index}>
                  <Field
                    type="text"
                    name={`superpower.${index}`}
                    placeholder="Суперспособность"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const superpower = [...values.superpower];
                      superpower.splice(index, 1);
                      setFieldValue("superpower", superpower);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
            <div>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div>
              <button type="submit">Создать супергероя</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SuperheroForm;
