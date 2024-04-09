import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { SignRecognition } from "./SignRecognition";

const meta = {
  title: "SignRecognition",
  component: SignRecognition,
  args: {
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SignRecognition>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
