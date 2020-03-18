import React, { PureComponent } from 'react';
import * as antd from 'antd';
import { Field, Form } from 'formik-antd';
import { Formik } from 'formik';


const Validations = {
  isEmail : value =>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
  isDigit : value => /\d/g.test(value)
}




const userFiels = {
  UserName:{
    name:'username',
    type:'text',
    validation :Validations.isDigit,
    errorMessage:'Invalid email address'
  }
}
class User extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Formik
        initialValues={{ email: '', username: '' }}
        onSubmit={values => this.handleSumbit(values)}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <Field  name="email" type="email"></Field>
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <Field as="input" name="username" type="text"></Field>
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    );
  }
  handleSumbit = values => {
    console.log(values);
  };
}
export default User;
