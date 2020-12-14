import React from 'react'
import { connect } from 'react-redux'
import * as courseActions from '../redux/actions/courseActions'
import * as authorActions from '../redux/actions/authorActions'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import CourseList from '../components/common/CourseList/index.jsx'
import { Redirect } from 'react-router-dom'

class CoursesPage extends React.Component {
  state = {
    redirect: false,
  }

  componentDidMount() {
    const { courses, authors, actions } = this.props

    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch((error) => console.error('Loading Courses Failed: ', error))
    }

    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch((error) => console.error('Loading Authors Failed: ', error))
    }
  }

  render() {
    console.log(this.props.authors, 'data')
    return (
      <>
        {this.state.redirect && <Redirect to="/course" />}
        <h3>Courses</h3>
        <button
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirect: true })}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses} authors={this.props.authors} />
      </>
    )
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  console.log(state, 'from redux')
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => ({
            ...course,
            authorName: state.authors.find((a) => a.id === course.authorId)
              .name,
          })),
    authors: state.authors,
  }
}

// benefit of not rewriting for specific action
const mapDispatchToProps = (dispatch) => ({
  actions: {
    loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
