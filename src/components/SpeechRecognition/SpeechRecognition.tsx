import React, { useEffect, useRef, useState } from "react";
import { Audio } from 'expo-av';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { recognizeSpeech } from "../../network/adapter";
import * as FileSystem from 'expo-file-system';
import { RecordingObject } from "expo-av/build/Audio";

export interface SpeechRecognitionProps {
    modelName?: string;

    containerStyle?: object;
    buttonStyle?: object;
    buttonTextStyle?: object;
    transcriptionStyle?: object;
    loadingStyle?: object;

    gotResult: (_: string) => void;
}

export const SpeechRecognition = ({
    modelName = "LATEST",
    containerStyle = {},
    buttonStyle = {},
    transcriptionStyle = {},
    loadingStyle = {},
    buttonTextStyle = {},
    gotResult = () => {},
    ...props
}: SpeechRecognitionProps) => {
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const recorder = useRef<RecordingObject | null>(null);
    const [transcription, setTranscription] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [recording, setRecording] = useState(false);

    const startRecording = async () => {
      try {
        if (permissionResponse == null) {
          return
        }
        if (permissionResponse.status !== 'granted') {
          await requestPermission()
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
        recorder.current = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.LOW_QUALITY)
        setRecording(true)
      } catch (e) {
        console.error(JSON.stringify(e))
      }
    };
    const stopRecording = async () => {
      setRecording(false)
      if (recorder.current == null) {
        return null;
      }
      await recorder.current?.recording.stopAndUnloadAsync()
      await Audio.setAudioModeAsync({allowsRecordingIOS: false})
      const uri = recorder.current.recording.getURI();
      if (uri == null) {
        return
      }
      let blob = await (await fetch(uri)).blob()
      const reader = new FileReader();
        
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string | null;
        if (base64data == null) {
          console.log("got no b64 data")
          return
        }
        setProcessing(true);
        recognizeSpeech(base64data.split(",")[1]).then((result: string) => {
            setProcessing(false);
            setTranscription(result);
            gotResult(result);
        });
      }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {
                transcription != null && transcription.trim().length > 0 ? (
                    <Text style={[styles.transcription, transcriptionStyle]}>{transcription}</Text>
                ) : null
            }
            {processing ? (
                <ActivityIndicator color={'#00AA9D'} style={[styles.loading, loadingStyle]} />
            ) : recording ? (
                <TouchableOpacity
                    style={[styles.button, styles.stopButton, buttonStyle]}
                    onPress={stopRecording}
                >
                    <Text style={[styles.buttonText, buttonTextStyle]}>Stop Listening</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={[styles.button, styles.startButton, buttonStyle]}
                    onPress={startRecording}
                >
                    <Text style={[styles.buttonText, buttonTextStyle]}>Start Listening</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        marginTop: 8,
        padding: 12,
        alignSelf: 'center',
        backgroundColor: 'slategray',
        borderRadius: 8,
    },
    startButton: {
        backgroundColor: 'slategray', // Customize as needed
    },
    stopButton: {
        backgroundColor: 'darkred', // Customize as needed
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    transcription: {
        marginTop: 8,
        padding: 12,
        alignSelf: 'center',
    },
    loading: {
        marginTop: 8,
        padding: 12,
        alignSelf: 'center',
    },
});