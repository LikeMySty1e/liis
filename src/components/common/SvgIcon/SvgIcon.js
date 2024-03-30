import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './style.module.scss';

const SvgIcon = props => {
    const {
        classname,
        width,
        height,
        Icon,
        color
    } = props;

    if (!Icon) {
        return null;
    }

    return <Icon width={width} height={height} className={cn(style.svg, classname)} fill={color} />;
};

SvgIcon.defaultProps = {
    color: `white`,
    width: `32px`,
    height: `32px`
}

SvgIcon.propTypes = {
    classname: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    Icon: PropTypes.object
};

export default SvgIcon;