import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import ImmutablePropTypes from 'react-immutable-proptypes'

import { reduxForm } from 'redux-form';
export const fields = ['title', 'place', 'content'];

import TextInput from 'components/Reusable/Input/TextInput'

export default class Form extends Component {
    render() {
        const {
            fields: { title, place, content },
            handleSubmit,
            resetForm
        } = this.props;

        console.log(title);
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <div>
                        <TextInput type="text" placeholder="Title" {...title}/>
                    </div>
                </div>
                <div>
                    <label>Place</label>
                    <div>
                        <TextInput type="text" placeholder="Where was this asshole?" {...place}/>
                    </div>
                </div>
                <div>
                    <label>Title</label>
                    <div>
                        <TextInput type="text" placeholder="What happened?" {...content}/>
                    </div>
                </div>
            </form>
        );
    }
}

const STYLES = {};

export default reduxForm({form: 'simple', fields, getFormState: (state) => state.get('form')})(Form)
