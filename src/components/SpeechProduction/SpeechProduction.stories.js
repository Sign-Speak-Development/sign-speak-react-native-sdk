"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_native_1 = require("react-native");
var SpeechProduction_1 = require("./SpeechProduction");
var meta = {
    title: "SpeechProduction",
    component: SpeechProduction_1.SpeechProduction,
    args: {
        text: "hello",
        play: true,
    },
    decorators: [
        function (Story) { return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: 16 }, children: (0, jsx_runtime_1.jsx)(Story, {}) })); },
    ],
};
exports.default = meta;
exports.Basic = {};
