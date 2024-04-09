import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { SpeechProduction } from "./SpeechProduction";

const meta = {
  title: "SpeechProduction",
  component: SpeechProduction,
  args: {
    text: "hello",
    play: true,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SpeechProduction>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
