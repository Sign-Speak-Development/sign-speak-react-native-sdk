import React, { useEffect, useRef, useState } from "react";
import { AVPlaybackStatus, Audio, Video } from 'expo-av';
import { produceSign, produceSpeech } from "../../network/adapter";
import { StyleSheet, Text, View } from "react-native";
import * as FileSystem from 'expo-file-system';

export interface SpeechProductionProps {
  modelName?: string
  text: string
  play?: boolean
  onLoaded?: () => void
  onPlaying?: () => void
  onStopped?: () => void
}

export const SpeechProduction = ({
  modelName = "FEMALE",
  text,
  play = true,
  onLoaded = () => { },
  onPlaying = () => { },
  onStopped = () => { },
  ...props
}: SpeechProductionProps) => {
  const [audio, setAudio] = useState<Blob | null>()
  useEffect(() => {
    produceSpeech(text, modelName).then(async (blob) => {
      setAudio(blob)
    })
  }, [text])
  useEffect(() => {
    if (play && audio != null) {
      const reader = new FileReader();
      reader.readAsDataURL(audio);
      reader.onloadend = async () => {
        onLoaded();
        const base64data = reader.result as string | null;
        if (base64data == null) {
          console.log("got no b64 data")
          return
        }

        // Assuming you're working with an MP4 video, otherwise, adjust the mime type accordingly.
        const mimeType = 'audio/mp3';
        const base64Video = base64data.split(',')[1]; // Splitting and taking the base64 content
        const videoDataUrl = `data:${mimeType};base64,${base64Video}`;
        const { sound } = await Audio.Sound.createAsync({ uri: videoDataUrl })
        await sound.playAsync();
        let firedPlaying = false;
        sound.setOnPlaybackStatusUpdate((x: AVPlaybackStatus) => {
          if ("didJustFinish" in x && x.didJustFinish) {
            onStopped()
          }
          if ("isPlaying" in x && x.isPlaying && !firedPlaying) {
            firedPlaying = true;
            onPlaying()
          }
        });
      };
    }
  }, [audio, play])
  return null;
};