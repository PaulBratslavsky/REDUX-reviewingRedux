import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../TextInput/index.jsx'
import SelectInput from '../SelectInput/index.jsx'

export default function CourseForm({
  course,
  authors,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) {
  console.log(course.id, 'SHOW ME')
  return (
    <form onSubmit={onSave}>
      <h2>{course.id ? 'Edit' : 'Add'} Course</h2>

      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <TextInput
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        error={errors.title || ''}
        placeholder="Enter title"
      />

      <SelectInput
        name="authorId"
        label="Author"
        value={course.authorId || ''}
        defaultOption="Select Author"
        options={authors.map((author) => ({
          value: author.id,
          text: author.name,
        }))}
        onChange={onChange}
      />

      <TextInput
        name="category"
        label="Category"
        value={course.category}
        onChange={onChange}
        error={errors.category || ''}
        placeholder="Enter Category"
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

CourseForm.propTypes = {
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
}
