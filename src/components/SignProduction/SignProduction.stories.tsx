import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { SignProduction } from "./SignProduction";

const meta = {
  title: "SignProduction",
  component: SignProduction,
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
} satisfies Meta<typeof SignProduction>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
