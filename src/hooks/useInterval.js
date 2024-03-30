import React from 'react';

const maxDepth = 3;

export const useInterval = ({
    callback,
    onResponse,
    onError,
    delay
}) => {
    let depth = 0;

    const asyncRequestHandler = () => {
        callback()
            .then(response => onResponse(response))
            .catch(e => {
                depth += 1;

                onError(e);
            });
    };

    // Использовать первый раз без задержки
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => asyncRequestHandler(), []);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (depth >= maxDepth) {
                clearInterval(intervalId);

                return;
            }

            asyncRequestHandler();
        }, delay);

        return () => intervalId && clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default { useInterval };
