import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';

function ColorPicker(props) {
    const [show, setShow] = useState(false);
    const updateColor = ({ hex }) => props.onChange(hex)
    const styles = {
        color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: props.value,
        },
        swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
        },
        popover: {
            position: 'absolute',
            zIndex: '2',
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        },
    };

    return (
        <Fragment>
            <div style={styles.swatch} onClick={() => setShow(true)}>
                <div style={styles.color} />
            </div>
            {
                show && (
                    <div style={styles.popover}>
                        <div style={styles.cover} onClick={() => setShow(false)} />
                        <ChromePicker color={props.value} onChange={updateColor} />
                    </div>
                )
            }
        </Fragment>
    )
}

ColorPicker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default ColorPicker;