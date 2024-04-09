import React, { useEffect, useRef, useState } from "react";
import { AVPlaybackStatus, Video } from 'expo-av';
import { produceSign } from "../../network/adapter";
import { StyleSheet, Text, View } from "react-native";
import * as FileSystem from 'expo-file-system';

export interface SignProductionProps {
  modelName?: string;
  text: string;
  play?: boolean;
  videoStyle?: object; // Accepting StyleSheet object for video
  videoContainerStyle?: object; // Accepting StyleSheet object for video container
  loadingTextStyle?: object; // Accepting StyleSheet object for loading text
  onLoaded?: () => void;
  onPlaying?: () => void;
  onStopped?: () => void;
}

export const SignProduction = ({
  modelName = "MALE",
  text,
  play = true,
  onLoaded = () => {},
  onPlaying = () => {},
  onStopped = () => {},
  videoStyle = {},
  videoContainerStyle = {},
  loadingTextStyle = {},
  ...props
}: SignProductionProps) => {
  const [videos, setVideos] = useState<string[] | null>(null);
  const [currentVideoPlaying, setCurrentVideoPlaying] = useState(-1)
  const [finishedPlaying, setFinishedPlaying] = useState(-1)
  const [loading, setLoading] = useState(false)
  const videoRef = useRef<Video | null>(null);
  const blobToName = (blob: Blob, idx: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string | null;
        if (base64data == null) {
          console.log("got no b64 data")
          return
        }

        // Assuming you're working with an MP4 video, otherwise, adjust the mime type accordingly.
        const base64Video = base64data.split(',')[1]; // Splitting and taking the base64 content
        const filePath = `${FileSystem.cacheDirectory}${idx}.mp4`;
        FileSystem.writeAsStringAsync(filePath, base64Video, {
          encoding: FileSystem.EncodingType.Base64,
        });
        resolve(filePath)
      };
    })
  }
  useEffect(() => {
    (async () => {
      let textSplit = text.split(/[.!?]/)
      setLoading(true)
      setVideos([])
      setCurrentVideoPlaying(-1)
      setFinishedPlaying(-1)
      let videos: string[] = []
      let textToRender = ""
      let cnt = 0;

      for (let textIdx in textSplit) {
        let text = (textSplit[textIdx] + ".").trim()
        textToRender += (" " + text).trim()
        if (textToRender.split(" ").length < 8 || textToRender.trim().length == 0) {
          continue
        }
        let result = await produceSign(textToRender, modelName)
        let fname = await blobToName(result, cnt);
        videos.push(fname)
        setVideos([...videos])
        textToRender = ""
        cnt++
      }
      if (textToRender.trim().length > 2) {
        let result = await produceSign(textToRender, modelName)
        let fname = await blobToName(result, cnt);
        videos.push(fname)
        setVideos([...videos])
      }
      setLoading(false)
    })()
  }, [text])
  const playVideo = async (idx: number) => {
    if (videos == null) {
      return
    }
    if (videoRef.current == null) {
      return
    }
    onPlaying()
    setCurrentVideoPlaying(idx)
    await videoRef.current.unloadAsync()
    await videoRef.current.loadAsync({ uri: videos[idx] });
    await videoRef.current.playAsync();
    let firedPlaying = false;
    videoRef.current.setOnPlaybackStatusUpdate((x: AVPlaybackStatus) => {
      if ("didJustFinish" in x && x.didJustFinish) {
        onStopped()
        setFinishedPlaying(idx)
      }
      if ("isPlaying" in x && x.isPlaying && !firedPlaying) {
        firedPlaying = true;
        onPlaying()
      }
    })
  }
  useEffect(() => {
    if (play && videos != null && videoRef.current != null) {
      let numVideos = videos.length
      if (currentVideoPlaying == finishedPlaying && numVideos - 1 > currentVideoPlaying) {
        playVideo(currentVideoPlaying + 1)
      }
    }
  }, [videos, play, currentVideoPlaying, finishedPlaying])
  if (videos == null) {
    return null;
  }

  return (
    <View style={[styles.videoContainer, videoContainerStyle]}>
      <View style={[styles.video, videoStyle]}>
        <Video ref={videoRef} isMuted shouldPlay style={styles.videoPlayer} />
      </View>
      {
        loading && currentVideoPlaying == finishedPlaying ? (
          <Text style={[styles.loadingText, loadingTextStyle]}>loading...</Text>
        ) : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  video: {
    // Define default styles for video container if needed
  },
  videoPlayer: {
    height: '100%',
  },
  loadingText: {
    // Define default styles for loading text if needed
  },
});