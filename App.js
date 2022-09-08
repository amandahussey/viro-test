import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroNode,
  ViroImage,
  ViroARImageMarker,
  ViroARPlane,
  ViroBox,
} from '@viro-community/react-viro';

import BoxTexture from './BoxTexture';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  // register target
  ViroARTrackingTargets.createTargets({
    redCircle: {
      source: require('./res/red-circle.png'),
      orientation: "Up",
      physicalWidth: 0.165, // real world width in meters
      type: 'Image',
    }
  })

  const onInitialized = (state, reason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  // once image has been detected
  const anchorFound = () => {
    console.log("Anchor/Image detected")
  }

  return (
    <ViroARScene
      onTrackingUpdated={onInitialized}
      onAnchorFound={() => console.log('onAnchorFound')}
      onAnchorUpdated={() => console.log('onAnchorUpdated')}
      onAnchorRemoved={() => console.log('onAnchorRemoved')}>
      <ViroText
        text={text}
        scale={[0.3, 0.3, 0.3]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />

      {/* <ViroARImageMarker target="redCircle">
        <ViroNode position={[0,0,-1]}>
          <ViroImage height={0.5} width={0.5} source={require('./res/red-circle.png')} rotation={[-45,-45,-45]} />
          <ViroImage height={0.5} width={0.5} source={require('./res/red-circle.png')} rotation={[45,45,45]} />
        </ViroNode>
      </ViroARImageMarker> */}

  
      <ViroARPlane minHeight={0.1} minWidth={0.1} alignment={'Horizontal'}>
        <ViroBox position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />
      </ViroARPlane>
      
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
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
