import React from 'react';

export const useStore = (StoreConstructor, props) => {
    const storeRef = React.useRef();

    if (!storeRef.current) {
        storeRef.current = new StoreConstructor(props);
    }

    return storeRef.current;
};

export default {};
