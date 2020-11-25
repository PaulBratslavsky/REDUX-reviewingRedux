import React from 'react'
import { connect } from 'react-redux'
import * as courseActions from "../redux/actions/courseActions"
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

class CoursesPage extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            course: {
                title: '',
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const course = {...this.state.course, title: e.target.value}
        this.setState({course})
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.actions.createCourse(this.state.course)
        console.log('Submitted', this.state.course.title)
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <h2>Courses Page</h2>
                <h3>Add Course</h3>
                <input type="text" onChange={this.handleChange} value={this.state.course.title} />
                <input type="submit" value="Save" />
            </form>
            <div>
                {this.props.courses && this.props.courses.map((item,index) => <h1 key={index}>{item.title}</h1>)}
            </div>
        </div>
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    console.log(state, "from redux")
    return {courses: state.courses}
}

// benefit of not rewriting for specific action
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(courseActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)