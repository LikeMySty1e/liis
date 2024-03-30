import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {useFrame} from '@react-three/fiber';
import {PerspectiveCamera, RenderTexture, Text} from '@react-three/drei';

function CubeModel(props) {
    const { data } = props;
    const mesh = React.useRef(null);

    useFrame((state, delta) => {
        mesh.current.rotation.x += delta * 0.15;
        mesh.current.rotation.y += delta * 0.15;
        mesh.current.rotation.z += delta * 0.15;
    });

    const faces = useMemo(() => {
        return data.week.map((day, index) => <meshStandardMaterial attach={`material-${index}`}>
            <RenderTexture attach={'map'}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]}/>
                <color attach={'background'} args={['#dc9dcd']}/>
                <Text position={[-0.2, 1, 1]} fontSize={0.5} color={'#555'}>
                    {day.date}
                </Text>
                <Text position={[-0.2, -1, -1]} fontSize={1} color={'#555'}>
                    {day.temp} °C
                </Text>
            </RenderTexture>
        </meshStandardMaterial>)
    }, [data.week]);

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
    actions: PropTypes.shape({
        loadWeatherData: PropTypes.func
    })
};

const injection = ({store}) => {
    console.log(store)

    return {
        data: {
            week: store.week
        },
        actions: {
            loadWeatherData: store.loadWeatherData
        }
    };
};

export default inject(injection)(observer(CubeModel));