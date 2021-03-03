import React, {Component} from 'react';
import CourseDataService from '../service/CourseDataService';

const INSTRUCTOR = 'in28minutes';

class ListCoursesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: null
        }
        this.refreshCourses = this.refreshCourses.bind(this);
        this.deleteCoursesClicked = this.deleteCoursesClicked.bind(this);
        this.updateCoursesClicked = this.updateCoursesClicked.bind(this);
        this.addCourseClicked = this.addCourseClicked.bind(this);
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        CourseDataService.retrieveAllCourses(INSTRUCTOR)
                    .then(
                        response => {
                            console.log(response);
                            this.setState({ courses: response.data });
                        }
                    )
    }

    updateCoursesClicked(id) {
        console.log('update' + id);
        this.props.history.push(`/courses/${id}`);
    }

    deleteCoursesClicked(id) {
        CourseDataService.deleteCourse(INSTRUCTOR, id)
                        .then(
                            response => {
                                this.setState({ message: `Delete of course ${id} successful` });
                                this.refreshCourses();
                            }
                        )
    }

    addCourseClicked() {
        this.props.history.push(`/courses/-1`);
    }

    render() {
        return (
            <div className="container">
                <h3>All Courses</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.courses.map(
                                    course => 
                                        <tr key={course.id}>
                                            <td>{course.id}</td>
                                            <td>{course.description}</td>
                                            <td>
                                                <button className="btn btn-success" onClick= {() => {this.updateCoursesClicked(course.id)}}>
                                                    Update
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-warning" onClick={() => this.deleteCoursesClicked(course.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addCourseClicked}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListCoursesComponent