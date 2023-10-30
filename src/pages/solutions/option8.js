import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';

const initialValues = {
  skillType: '',
  skillId: '',
  skillPlatforms: [
    {
      skillPlatformId: '',
      skillLevel: '',
      experienceInMonths: '',
    },
  ],
};

const option8 = () => {
  const [editIndex, setEditIndex] = useState(-1);

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      console.log(values);
    },
  });

  const handleAddPlatform = () => {
    formik.setFieldValue('skillPlatforms', [
      ...formik.values.skillPlatforms,
      {
        skillPlatformId: '',
        skillLevel: '',
        experienceInMonths: '',
      },
    ]);
  };

  const handleEdit = index => {
    setEditIndex(index);
  };

  const handleDelete = index => {
    const newPlatforms = formik.values.skillPlatforms.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue('skillPlatforms', newPlatforms);
  };

  const handleSave = index => {
    setEditIndex(-1);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="skillType"
        name="skillType"
        label="Skill Type"
        value={formik.values.skillType}
        onChange={formik.handleChange}
      />

      <TextField
        id="skillId"
        name="skillId"
        label="Skill Id"
        value={formik.values.skillId}
        onChange={formik.handleChange}
      />

      {formik.values.skillPlatforms.map((platform, index) => (
        <div key={index}>
          {editIndex !== index ? (
            <>
              <div>{platform.skillPlatformId}</div>
              <div>{platform.skillLevel}</div>
              <div>{platform.experienceInMonths}</div>

              <Button type="button" onClick={() => handleEdit(index)}>
                Edit
              </Button>

              <Button type="button" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <TextField
                id={`skillPlatforms.${index}.skillPlatformId`}
                name={`skillPlatforms.${index}.skillPlatformId`}
                label="Skill Platform Id"
                value={formik.values.skillPlatforms[index].skillPlatformId}
                onChange={formik.handleChange}
              />

              <TextField
                id={`skillPlatforms.${index}.skillLevel`}
                name={`skillPlatforms.${index}.skillLevel`}
                label="Skill Level"
                value={formik.values.skillPlatforms[index].skillLevel}
                onChange={formik.handleChange}
              />

              <TextField
                id={`skillPlatforms.${index}.experienceInMonths`}
                name={`skillPlatforms.${index}.experienceInMonths`}
                label="Experience In Months"
                value={formik.values.skillPlatforms[index].experienceInMonths}
                onChange={formik.handleChange}
              />

              <Button type="button" onClick={() => handleSave(index)}>
                Save
              </Button>
            </>
          )}
        </div>
      ))}

      <Button type="button" onClick={handleAddPlatform}>
        Add Platform
      </Button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default option8;
