import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import constants from "../../../constants";

function EditSuperheroForm({
  superhero,
  onUpdate,
  onDeleteImage,
  onUploadImage,
}) {
  const [newImage, setNewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleDeleteImage = (imageId, superheroId) => {
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
    <Formik
      initialValues={superhero}
      onSubmit={(values) => {
        onUpdate(values);
      }}
    >
      <Form>
        <div>
          <h2>Edit Superhero</h2>
          <label>
            Nickname:
            <Field type="text" name="nickname" />
          </label>
          <label>
            Real Name:
            <Field type="text" name="realName" />
          </label>
        </div>

        <div>
          <h3>Image</h3>
          {superhero.SuperhroImgs.map((img) => (
            <div key={img.id}>
              <img
                src={`${constants.publicImgURL}${img.superheroImgPath}`}
                alt="Superhero"
              />
              <button onClick={() => handleDeleteImage(img.id, superhero.id)}>
                Delete
              </button>
            </div>
          ))}
          <Field type="file" name="image" accept="image/*" onChange={handleImageChange} />
          <button onClick={(event) => handleUploadImage(superhero.id, event)}>Upload Image</button>
        </div>
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
}

export default EditSuperheroForm;
