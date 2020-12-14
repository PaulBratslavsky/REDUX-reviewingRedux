import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadCourses, saveCourse } from '../redux/actions/courseActions'
import { loadAuthors } from '../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from '../components/common/CourseForm/index.jsx'
import { newCourse } from '../../tools/mockData'

function ManageCourse({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) =>
        console.error('Loading Courses Failed: ', error)
      )
    } else {
        setCourse({ ...props.course })
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) =>
        console.error('Loading Authors Failed: ', error)
      )
    }
  }, [props.course])

  function handleChange(event) {
    const { name, value } = event.target
    setCourse((prevState) => ({
      ...prevState,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }))
  }

  function handleSave(event) {
    event.preventDefault()
    saveCourse(course).then(() => history.push('/courses'))
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  )
}

ManageCourse.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug
  const course = slug ? getCourseBySlug(state.courses, slug) : newCourse

  console.log(slug, 'slug')
  return {
    course: course,
    courses: state.courses,
    authors: state.authors,
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse)
