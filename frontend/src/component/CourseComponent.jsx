import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import CourseDataService from '../service/CourseDataService';

const INSTRUCTOR = 'in28minutes';

class CourseComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        console.log(this.state.id);

        if (this.state.id === -1) {
            return;
        }

        CourseDataService.retrieveCourse(INSTRUCTOR, this.state.id)
                        .then(response => {
                            console.log(response.data);
                            this.setState({
                            description: response.data.description
                            })
                        })
    }

    onSubmit(values) {
        console.log(values);
    }

    validate(values) {
        let errors = {};
        if (!values.description) {
            errors.description = 'Enter a Description';
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters in description';
        }
        return errors
    }

    render() {
        let { description, id } = this.state;

        return(
            <div>
                <h3>Course</h3>
                <div className="container">
                    <Formik 
                        initialValues={{id, description}}
                        onSubmit = {this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                        >
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Id</label>
                                <Field className="form-control" type="text" name="id" disabled />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description" />
                            </fieldset>
                            <button className="btn btn-success" type="submit">Save</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        );
    }
}

export default CourseComponent;