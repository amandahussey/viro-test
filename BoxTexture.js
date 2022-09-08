import React from 'react';  
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroAnimations,
  ViroBox,
} from '@viro-community/react-viro';

const InitialScene = () => {
    <ViroARScene>
        <ViroText 
            text={"Hello world"}
            position={[0,0,0]}
        />
    </ViroARScene>
}

export default () => {

  // All AR scene will reside in ViroARSceneNavigator:
  return (
    <ViroARSceneNavigator
        initialScene={{
            scene: InitialScene,
        }}
        style={{
            flex: 1
        }}
    />
  );
};

const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
});