import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroNode,
  ViroImage,
  ViroARImageMarker,
  ViroARPlane,
  ViroSpinner,
  ViroSkyBox,
  ViroBox,
} from '@viro-community/react-viro';

import BoxTexture from './BoxTexture';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  // register target
  const IRIS_TARGET_METERS = 0.025;
  const IRIS_TARGET_METERS_SMALL = IRIS_TARGET_METERS/2;
  ViroARTrackingTargets.createTargets({
    irisGreenBg: {
      source: require('./res/iris-green-bg.png'),
      orientation: "Up",
      physicalWidth: IRIS_TARGET_METERS, // real world width in meters
      type: 'Image',
    },
    irisGreen: {
      source: require('./res/iris-green.png'),
      orientation: "Up",
      physicalWidth: IRIS_TARGET_METERS, // real world width in meters
      type: 'Image',
    },
    irisPurpleBg: {
      source: require('./res/iris-purple-bg.png'),
      orientation: "Up",
      physicalWidth: IRIS_TARGET_METERS, // real world width in meters
      type: 'Image',
    },
    irisPurple: {
      source: require('./res/iris-purple.png'),
      orientation: "Up",
      physicalWidth: IRIS_TARGET_METERS, // real world width in meters
      type: 'Image',
    },
    irisGrid: {
      source: require('./res/iris-grid-colors.png'),
      orientation: "Up",
      physicalWidth: 0.02, // real world width in meters
      type: 'Image',
    },
    colorGrid: {
      source: require('./res/iris-grid-colors-only.png'),
      orientation: "Up",
      physicalWidth: 0.02, // real world width in meters
      type: 'Image',
    },
    irisGreenBgSmall: {
      source: require('./res/iris-green-bg.png'),
      orientation: "Up",
      physicalWidth: IRIS_TARGET_METERS_SMALL, // real world width in meters
      type: 'Image',
    },
    irisGreenSmall: {
      source: require('./res/iris-green.png'),
      orientation: "Up",
      physicalWidth: IRIS_TARGET_METERS_SMALL, // real world width in meters
      type: 'Image',
    },
    irisPurpleBgSmall: {
      source: require('./res/iris-purple-bg.png'),
      orientation: "Up",
      physicalWidth: IRIS_TARGET_METERS_SMALL, // real world width in meters
      type: 'Image',
    },
    irisPurpleSmall: {
      source: require('./res/iris-purple.png'),
      orientation: "Up",
      physicalWidth: IRIS_TARGET_METERS_SMALL, // real world width in meters
      type: 'Image',
    },
  });

  ViroMaterials.createMaterials({
    spinner: {
      diffuseColor: '#9CAF88'
    }
  });

  const onTrackingUpdated = (state, reason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Welcome to Iris. Place your pills here.');
      console.log('trackingUpdated: TRACKING_NORMAL', reason);
    } else if (state === ViroTrackingStateConstants.TRACKING_NONE) {
      // Handle loss of tracking
      console.log('trackingUpdated: TRACKING_NONE', reason);
    }
  }

  // once image has been detected
  const anchorFound = () => {
    console.log("Anchor/Image detected")
  }

  return (
    <ViroARScene
      onTrackingUpdated={onTrackingUpdated}
      onAnchorFound={() => console.log('onAnchorFound scene')}
      //displayPointCloud={true}
      /*onAnchorUpdated={() => console.log('onAnchorUpdated')}
      onAnchorRemoved={() => console.log('onAnchorRemoved')}*/>

      {/* <ViroSkyBox color={'blue'}></ViroSkyBox> */}

      <ViroARImageMarker target="irisPurple" onAnchorFound={(anchor) => console.log('onAnchorFound marker', anchor.trackingMethod)}>
        <ViroSpinner
            type='light'
            scale={[0.1, 0.1, 1]}
            rotation={[-90, 0, 0]}
            opacity={0.5}
            position={[-0.06, -0.01, -0.06]}
            materials={['spinner']}
        />
        {/* <ViroBox position={[0, 0, 0]}
          height={0.005}
          length={0.005}
          width={0.005}  /> */}
          <ViroText
            text={text}
            width={2}
            height={2}
            scale={[0.02, 0.02, 0.02]}
            position={[-0.06, 0.05, -0.06]}
            style={styles.helloWorldTextStyle}
          />
        {/*<ViroNode position={[0,0,-1]}>
          <ViroImage height={0.5} width={0.5} source={require('./res/red-circle.png')} rotation={[-45,-45,-45]} />
          <ViroImage height={0.5} width={0.5} source={require('./res/red-circle.png')} rotation={[45,45,45]} />
        </ViroNode>*/}
      </ViroARImageMarker>

  
      {/*<ViroARPlane minHeight={0.1} minWidth={0.1} alignment={'Horizontal'}>
        <ViroBox position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />
      </ViroARPlane>*/}
      
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 36,
    color: '#8ABD91',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
