import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { createSuperhero } from "../../../redux/slices/superheroSlice";
import styles from "./style.module.scss";

function SuperheroForm() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const initialValues = {
    nickname: "",
    realName: "",
    originDescription: "",
    catchPhrase: "",
    superpower: [""],
    superheroImage: undefined,
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const formData = new FormData();
    formData.append("image", file);

  const res =   dispatch(createSuperhero({ formData, values }));
  console.log("🚀 ~ file: SuperheroForm.jsx:25 ~ handleSubmit ~ res:", res)
if(res){
	alert("Hero created successfully")
}
    resetForm();
    setSubmitting(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create a Superhero</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="nickname">Nickname:</label>
              <Field type="text" id="nickname" name="nickname" className={styles.inputField} />
              <ErrorMessage name="nickname" component="div" className={styles.error} />
            </div>

            <div>
              <label htmlFor="realName">Real Name:</label>
              <Field type="text" id="realName" name="realName" className={styles.inputField} />
              <ErrorMessage name="realName" component="div" className={styles.error} />
            </div>

            <div>
              <label htmlFor="originDescription">Origin Description:</label>
              <Field as="textarea" id="originDescription" name="originDescription" className={styles.inputField} />
              <ErrorMessage name="originDescription" component="div" className={styles.error} />
            </div>

            <div>
              <label htmlFor="catchPhrase">Catch Phrase:</label>
              <Field type="text" id="catchPhrase" name="catchPhrase" className={styles.inputField} />
              <ErrorMessage name="catchPhrase" component="div" className={styles.error} />
            </div>

            <div>
              <label htmlFor="superpower">Superpowers:</label>
              <Field type="text" id="superpower" name="superpower" readOnly className={styles.inputField} />
              <button
                type="button"
                onClick={() => {
                  const superpower = [...values.superpower, ""];
                  setFieldValue("superpower", superpower);
                }}
              >
                Add Superpower
              </button>
              {values.superpower.map((superpower, index) => (
                <div key={index}>
                  <Field
                    type="text"
                    name={`superpower.${index}`}
                    placeholder="Superpower"
                    className={styles.inputField}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const superpower = [...values.superpower];
                      superpower.splice(index, 1);
                      setFieldValue("superpower", superpower);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div>
              <button type="submit">Create Superhero</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SuperheroForm;
