import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {useFrame} from '@react-three/fiber';
import {PerspectiveCamera, RenderTexture, Text} from '@react-three/drei';

function CubeModel(props) {
    const { data, flags } = props;
    const mesh = React.useRef(null);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.15;
            mesh.current.rotation.y += delta * 0.15;
            mesh.current.rotation.z += delta * 0.15;
        }
    });

    const faces = React.useMemo(() => {
        return data.week.map((day, index) => <meshStandardMaterial attach={`material-${index}`}>
            <RenderTexture attach={'map'}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]}/>
                <color attach={'background'} args={[day.resource.gradient[0]]}/>
                <Text position={[-0.2, 1, 1]} fontSize={0.5} color={'#555'}>
                    {day.date}
                </Text>
                <Text position={[-0.2, -1, -1]} fontSize={1} color={'#555'}>
                    {day.temp} °C
                </Text>
            </RenderTexture>
        </meshStandardMaterial>);
    }, [data.week]);

    if (flags.isLoading) {
        return null;
    }

    return <mesh ref={mesh}>
        <boxGeometry args={[2.5, 2.5, 2.5]}/>
        {faces}
        <meshStandardMaterial attach={'material-5'}>
            <RenderTexture attach={`map`}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <color attach={"background"} args={["#dc9dcd"]} />
                <Text position={[-0.2, 0, 0]} fontSize={0.5} color={'#555'}>
                    Hello, world
                </Text>
            </RenderTexture>
        </meshStandardMaterial>
    </mesh>;
}

CubeModel.propTypes = {
    data: PropTypes.shape({
        week: PropTypes.arrayOf(PropTypes.shape({}))
    }),
    flags: PropTypes.shape({
        isLoading: PropTypes.bool
    })
};

const injection = ({store}) => {
    return {
        data: {
            week: store.week
        },
        flags: {
            isLoading: store.isLoading
        }
    };
};

export default inject(injection)(observer(CubeModel));