"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_native_1 = require("react-native");
var SignProduction_1 = require("./SignProduction");
var meta = {
    title: "SignProduction",
    component: SignProduction_1.SignProduction,
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
