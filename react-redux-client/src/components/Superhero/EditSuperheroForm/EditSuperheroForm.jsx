import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import constants from "../../../constants";
import styles from "./index.module.scss"; // Импорт модульного SASS

function EditSuperheroForm({
  superhero,
  onUpdate,
  onDeleteImage,
  onUploadImage,
}) {
  const superpowerArray = superhero.superpowers.map((superpower) => ({
    superpowerid: superpower.id,
    superpower: superpower.superpower,
  }));

  let updatedSuperhero = { ...superhero };
  delete updatedSuperhero.superpowers;
  updatedSuperhero.superpower = superpowerArray[0].superpower;
  updatedSuperhero.superpowerid = superpowerArray[0].superpowerid;

  const [newImage, setNewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleDeleteImage = (imageId, superheroId, event) => {
    event.preventDefault();
    onDeleteImage({ imageId, superheroId });
  };

  const handleUploadImage = (superheroId, event) => {
    event.preventDefault();
    if (newImage) {
      const formData = new FormData();
      formData.append("image", newImage);
      onUploadImage({ formData, superheroId });
    }
  };

  return (
    <div className={styles["form-container"]}>
      <Formik
        initialValues={updatedSuperhero}
        onSubmit={(values) => {
          onUpdate(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={styles["form-wrapper"]}>
              <h2>Edit Superhero</h2>
              <label>
                Nickname:
                <Field type="text" name="nickname" />
              </label>
              <label>
                Real Name:
                <Field type="text" name="realName" />
              </label>
              <label>
                Origin description:
                <Field
                  className={styles["originDescription"]}
                  as="textarea"
                  type="text"
                  name="originDescription"
                />
              </label>
              <div className={styles["superpowers"]}>
                <label htmlFor="superpowers">Superpowers:</label>
                {values.superpower.map((superpower, index) => (
                  <div key={index}>
                    <Field
                      type="text"
                      name={`superpower[${index}]`}
                      placeholder={`Суперспособность[${index + 1}]`}
                    />

                    <button
                      className={styles["delete"]}
                      type="button"
                      onClick={() => {
                        const updatedSuperpowers = [...values.superpower];
                        updatedSuperpowers.splice(index, 1);
                        setFieldValue("superpower", updatedSuperpowers);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  className={`${styles["button-submit"]} ${styles["add-superpower"]}`}
                  type="button"
                  onClick={() => {
                    const newSuperpowers = [...values.superpower, ""];
                    setFieldValue("superpower", newSuperpowers);
                  }}
                >
                  Add superpower
                </button>
              </div>
            </div>

            <div>
              <h3>Image</h3>
              <div className={styles["img-wrapper"]}>
                {values.SuperhroImgs.map((img) => (
                  <div key={img.id} className={styles["image-container"]}>
                    <img
                      src={`${constants.publicImgURL}${img.superheroImgPath}`}
                      alt="Superhero"
                    />
                    <button
                      className={styles["delete"]}
                      onClick={(event) =>
                        handleDeleteImage(img.id, values.id, event)
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <Field
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button
                className={styles["upload-button"]}
                onClick={(event) => handleUploadImage(values.id, event)}
              >
                Upload Image
              </button>
            </div>
            <button type="submit" className={styles["button-submit"]}>
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditSuperheroForm;
