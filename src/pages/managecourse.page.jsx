import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadCourses, saveCourse } from "../redux/actions/courseActions"
import { loadAuthors } from "../redux/actions/authorActions"
import PropTypes from 'prop-types'
import CourseForm from '../components/common/CourseForm/index.jsx'
import { newCourse } from "../../tools/mockData"

function ManageCourse({ 
    courses, 
    authors, 
    loadAuthors, 
    loadCourses,
    saveCourse,
     ...props
}) {
    const [course, setCourse] = useState({...props.course})
    const [errors, setErrors] = useState({})

    
    useEffect(() => {
        if (courses.length === 0) {
            loadCourses()
            .catch(error => console.error('Loading Courses Failed: ', error))   
        }

        if (authors.length === 0) {
            loadAuthors()
            .catch(error => console.error('Loading Authors Failed: ', error))
        }
    },[])

    function handleChange(event) {
        const { name, value } = event.target
        console.log(`name: ${name} | value: ${value}`)
        setCourse(prevState => ({
            ...prevState,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
    }

    function handleSave(event) {
        event.preventDefault()
        saveCourse(course)
    }

    return <CourseForm 
        course={course} 
        errors={errors} 
        authors={authors} 
        onChange={handleChange} 
        onSave={handleSave}
    />

}

ManageCourse.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
})

// benefit of not rewriting for specific action
const mapDispatchToProps = ({
    loadCourses,
    loadAuthors,
    saveCourse,
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse)