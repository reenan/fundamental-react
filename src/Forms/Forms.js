import classnames from 'classnames';
import { FORM_MESSAGE_TYPES } from '../utils/constants';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// ------------------------------------------------- Form Set -----------------------------------------------
export const FormSet = ({ children, className, ...props }) => {
    const formSetClasses = classnames(
        'fd-form__set',
        className
    );

    return (
        <div {...props} className={formSetClasses}>
            {children}
        </div>
    );
};
FormSet.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

// ------------------------------------------------- Form Item -----------------------------------------------
export const FormItem = ({ isCheck, isInline, children, className, ...props }) => {
    const formItemClasses = classnames(
        'fd-form__item',
        {
            'fd-form__item--inline': isInline,
            'fd-form__item--check': isCheck
        },
        className
    );

    return (
        <div
            {...props}
            className={formItemClasses}>
            {children}
        </div>
    );
};

FormItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isCheck: PropTypes.bool,
    isInline: PropTypes.bool
};

FormItem.propDescriptions = {
    isCheck: 'Set to **true** to render an `<input>` with `type` of **checkbox**.',
    isInline: 'Set to **true** to display radio buttons and checkboxes in a row.'
};

// ------------------------------------------------- Form Label ----------------------------------------------
export const FormLabel = ({ required, children, className, ...props }) => {
    const formLabelClasses = classnames(
        'fd-form__label',
        className
    );
    return (
        <label
            {...props}
            aria-required={required}
            className={formLabelClasses}>
            {children}
            {required ? '*' : ''}
        </label>
    );
};
FormLabel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    required: PropTypes.bool
};

FormLabel.propDescriptions = {
    required: 'Set to **true** for required input fields.'
};

// ------------------------------------------------- Form Message ----------------------------------------------
export const FormMessage = ({ type, children, className, ...props }) => {
    const formMessageClasses = classnames(
        'fd-form__message',
        {
            [`fd-form__message--${type}`]: !!type
        },
        className
    );
    return (
        <span
            {...props}
            className={formMessageClasses}>
            {children}
        </span>
    );
};
FormMessage.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.oneOf(FORM_MESSAGE_TYPES)
};

// ------------------------------------------------- Form Input ----------------------------------------------
export const FormInput = ({ state, className, ...props }) => {
    const formInputClasses = classnames(
        'fd-form__control',
        {
            [`is-${state}`]: !!state
        },
        className
    );

    return (
        <input
            {...props}
            className={formInputClasses} />
    );
};
FormInput.propTypes = {
    className: PropTypes.string,
    state: PropTypes.string
};

FormInput.propDescriptions = {
    state: 'Sets the state of the input. Options include \'normal\', \'valid\', \'invalid\', \'warning\', \'help\', \'disabled\', and \'readonly\'. Leave empty for normal.'
};

// ------------------------------------------------- Form Textarea ----------------------------------------------
export const FormTextarea = ({ children, className, ...props }) => {
    const formTextAreaClasses = classnames(
        'fd-form__control',
        className
    );

    return (
        <textarea
            {...props}
            className={formTextAreaClasses}>
            {children}
        </textarea>
    );
};
FormTextarea.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

// ------------------------------------------------- Form Fieldset ----------------------------------------------
export const FormFieldset = ({ children, className, ...props }) => {
    const formFieldsetClasses = classnames(
        'fd-form__set',
        className
    );

    return (
        <fieldset
            {...props}
            className={formFieldsetClasses}>
            {children}
        </fieldset>
    );
};
FormFieldset.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

// ------------------------------------------------- Form Legend ----------------------------------------------
export const FormLegend = ({ children, className, ...props }) => {
    const formLegendClasses = classnames(
        'fd-form__legend',
        className
    );

    return (
        <legend
            {...props}
            className={formLegendClasses}>
            {children}
        </legend>
    );
};
FormLegend.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

// ------------------------------------------------- Form Select ----------------------------------------------
export const FormSelect = ({ disabled, children, className, ...props }) => {
    const formSelectClasses = classnames(
        'fd-form__control',
        className
    );

    return (
        <select
            {...props}
            className={formSelectClasses}
            disabled={disabled}>
            {children}
        </select>
    );
};
FormSelect.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool
};

// ------------------------------------------------- Form Radio ----------------------------------------------
export class FormRadio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: this.props.defaultChecked
        };
    }

    handleChange = e => {
        this.setState({
            selectedItem: e.currentTarget.value
        });
    };

    render() {
        const { inputs, disabled, isInline } = this.props;
        let result;

        if (isInline) {
            result = inputs.map(inputItem => (
                <div
                    className='fd-form__item fd-form__item--inline fd-form__item--check'
                    key={inputItem.id}>
                    <label className='fd-form__label' htmlFor={inputItem.id}>
                        <input
                            checked={this.state.selectedItem === inputItem.id}
                            className='fd-form__control'
                            disabled={disabled}
                            id={inputItem.id}
                            name={inputItem.name}
                            onChange={this.handleChange}
                            type='radio'
                            value={inputItem.value} />
                        {inputItem.label}
                    </label>
                </div>
            ));
        } else {
            result = inputs.map(inputItem => (
                <div className='fd-form__item fd-form__item--check' key={inputItem.id}>
                    <input
                        checked={this.state.selectedItem === inputItem.id}
                        className='fd-form__control'
                        disabled={disabled}
                        id={inputItem.id}
                        name={inputItem.name}
                        onChange={this.handleChange}
                        type='radio'
                        value={inputItem.value} />
                    <label className='fd-form__label' htmlFor={inputItem.id}>
                        {inputItem.label}
                    </label>
                </div>
            ));
        }
        return <div>{result}</div>;
    }
}
FormRadio.propTypes = {
    inputs: PropTypes.array.isRequired,
    defaultChecked: PropTypes.string,
    disabled: PropTypes.bool,
    isInline: PropTypes.bool
};

FormRadio.propDescriptions = {
    defaultChecked: 'The `id` of the element selected by default.',
    inputs: 'Configuration settings for each radio button in the group.',
    isInline: 'Set to **true** to display radio buttons in a row.'
};
