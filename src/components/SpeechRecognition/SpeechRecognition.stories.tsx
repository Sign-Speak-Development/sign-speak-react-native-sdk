import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { SpeechRecognition } from "./SpeechRecognition";

const meta = {
  title: "SpeechRecognition",
  component: SpeechRecognition,
  args: {
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SpeechRecognition>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
