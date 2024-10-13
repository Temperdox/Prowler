import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Modal = ({ children = null, show = false }) => {
    const [isShown, setIsShown] = useState(show);

    // To update the modal visibility when show prop changes
    useEffect(() => {
        setIsShown(show);
    }, [show]);

    return (
        isShown && (
            <div className="modal">
                {children}
            </div>
        )
    );
};

// Define propTypes for better type checking
Modal.propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool.isRequired, // Required to control the modal
};

export default Modal;
