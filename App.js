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
    iris: {
      source: require('./res/iris.jpeg'),
      orientation: "Up",
      physicalWidth: 0.0508, // real world width in meters
      type: 'Image',
    }
  })

  const onTrackingUpdated = (state, reason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!!');
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

      <ViroARImageMarker target="iris" onAnchorFound={(anchor) => console.log('onAnchorFound marker', anchor.trackingMethod)}>
        <ViroBox position={[0, 0, 0]}
          height={0.005}
          length={0.005}
          width={0.005}  />
          <ViroText
            text={text}
            scale={[0.1, 0.1, 0.1]}
            position={[0, 0, 0]}
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
    fontSize: 12,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
