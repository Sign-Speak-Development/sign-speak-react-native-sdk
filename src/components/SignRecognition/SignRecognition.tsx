import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { recognizeSign, submitFeedback } from '../../network/adapter';
import * as FileSystem from 'expo-file-system';

export interface SignRecognitionProps {
  modelName?: string;

  containerStyle?: object;
  cameraStyle?: object;
  buttonStyle?: object;
  loaderTextStyle?: object;
  interpretationTextStyle?: object;
  cameraWidth?: number;
  cameraHeight?: number;

  gotResult?: (_: string) => void;
}

enum State {
  WAITING,
  RECORDING,
  PROCESSING,
}

export const SignRecognition = ({
  modelName = "LATEST",

  containerStyle = {},
  cameraStyle = {},
  interpretationTextStyle = {},
  loaderTextStyle = {},
  buttonStyle = {},
  cameraWidth = 600,
  cameraHeight = 600,

  gotResult = (_) => {},
}: SignRecognitionProps) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [state, setState] = useState(State.WAITING);
  const [feedbackID, setFeedbackID] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const startRecording = async () => {
    if (!cameraRef.current) {
      return;
    }
    setState(State.RECORDING);
    const video = await cameraRef.current.recordAsync();

    setState(State.PROCESSING);
    const base64 = await FileSystem.readAsStringAsync(video.uri, { encoding: FileSystem.EncodingType.Base64 });
    recognizeSign(base64, modelName).then(([v, fb]) => {
      setFeedbackID(fb);
      setInterpretation(v);
      setState(State.WAITING);
      gotResult(v);
    });
  };

  const stopRecording = () => {
    if (!cameraRef.current) {
      return;
    }
    cameraRef.current.stopRecording();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[{ alignSelf: 'center', width: cameraWidth, height: cameraHeight }, cameraStyle]}>
        <Camera
          style={{ width: '100%', height: '100%' }}
          type={CameraType.front}
          ref={cameraRef}
        >
        {state === State.RECORDING && (
          <TouchableOpacity
            style={[styles.button, styles.stopButton, buttonStyle]}
            onPress={stopRecording}
          >
            <Text style={styles.buttonText}>Stop Recording</Text>
          </TouchableOpacity>
        )}
        {state === State.WAITING && (
          <TouchableOpacity
            style={[styles.button, styles.startButton, buttonStyle]}
            onPress={startRecording}
          >
            <Text style={styles.buttonText}>Start Recording</Text>

          </TouchableOpacity>
        )}
        </Camera>
      </View>

      {
        state === State.PROCESSING ?
          <Text style={[styles.loaderText, loaderTextStyle]}>
            Processing...
          </Text> : 
          <Text style={[styles.interpretationText, interpretationTextStyle]}>
            {interpretation}
          </Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection: 'column',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  startButton: {
    backgroundColor: 'green',
  },
  stopButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loaderText: {
    alignSelf: 'center',
  },
  interpretationText: {
    alignSelf: 'center',
  },
});