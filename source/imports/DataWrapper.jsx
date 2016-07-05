import React, { Component, PropTypes } from 'react'

export default class DataWrapper extends Component {

    getChildContext () {

        return {
            data: this.props.data
        };
    }

    render () {

        return this.props.children;
    }
}

DataWrapper.childContextTypes = {
    data: PropTypes.object.isRequired
};
