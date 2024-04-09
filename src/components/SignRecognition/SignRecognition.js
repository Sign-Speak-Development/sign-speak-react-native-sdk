"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignRecognition = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_camera_1 = require("expo-camera");
var adapter_1 = require("../../network/adapter");
var FileSystem = __importStar(require("expo-file-system"));
var State;
(function (State) {
    State[State["WAITING"] = 0] = "WAITING";
    State[State["RECORDING"] = 1] = "RECORDING";
    State[State["PROCESSING"] = 2] = "PROCESSING";
})(State || (State = {}));
var SignRecognition = function (_a) {
    var _b = _a.modelName, modelName = _b === void 0 ? "LATEST" : _b, _c = _a.containerStyle, containerStyle = _c === void 0 ? {} : _c, _d = _a.cameraStyle, cameraStyle = _d === void 0 ? {} : _d, _e = _a.interpretationTextStyle, interpretationTextStyle = _e === void 0 ? {} : _e, _f = _a.loaderTextStyle, loaderTextStyle = _f === void 0 ? {} : _f, _g = _a.buttonStyle, buttonStyle = _g === void 0 ? {} : _g, _h = _a.cameraWidth, cameraWidth = _h === void 0 ? 600 : _h, _j = _a.cameraHeight, cameraHeight = _j === void 0 ? 600 : _j, _k = _a.gotResult, gotResult = _k === void 0 ? function (_) { } : _k;
    var _l = (0, react_1.useState)(null), hasPermission = _l[0], setHasPermission = _l[1];
    var cameraRef = (0, react_1.useRef)(null);
    var _m = (0, react_1.useState)(null), interpretation = _m[0], setInterpretation = _m[1];
    var _o = (0, react_1.useState)(State.WAITING), state = _o[0], setState = _o[1];
    var _p = (0, react_1.useState)(null), feedbackID = _p[0], setFeedbackID = _p[1];
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expo_camera_1.Camera.requestCameraPermissionsAsync()];
                    case 1:
                        status = (_a.sent()).status;
                        setHasPermission(status === 'granted');
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    if (hasPermission === null) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, {});
    }
    if (hasPermission === false) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Text, { children: "No access to camera" });
    }
    var startRecording = function () { return __awaiter(void 0, void 0, void 0, function () {
        var video, base64;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!cameraRef.current) {
                        return [2 /*return*/];
                    }
                    setState(State.RECORDING);
                    return [4 /*yield*/, cameraRef.current.recordAsync()];
                case 1:
                    video = _a.sent();
                    setState(State.PROCESSING);
                    return [4 /*yield*/, FileSystem.readAsStringAsync(video.uri, { encoding: FileSystem.EncodingType.Base64 })];
                case 2:
                    base64 = _a.sent();
                    (0, adapter_1.recognizeSign)(base64, modelName).then(function (_a) {
                        var v = _a[0], fb = _a[1];
                        setFeedbackID(fb);
                        setInterpretation(v);
                        setState(State.WAITING);
                        gotResult(v);
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var stopRecording = function () {
        if (!cameraRef.current) {
            return;
        }
        cameraRef.current.stopRecording();
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.container, containerStyle], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ alignSelf: 'center', width: cameraWidth, height: cameraHeight }, cameraStyle], children: (0, jsx_runtime_1.jsxs)(expo_camera_1.Camera, { style: { width: '100%', height: '100%' }, type: expo_camera_1.CameraType.front, ref: cameraRef, children: [state === State.RECORDING && ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: [styles.button, styles.stopButton, buttonStyle], onPress: stopRecording, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.buttonText, children: "Stop Recording" }) })), state === State.WAITING && ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: [styles.button, styles.startButton, buttonStyle], onPress: startRecording, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.buttonText, children: "Start Recording" }) }))] }) }), state === State.PROCESSING ?
                (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.loaderText, loaderTextStyle], children: "Processing..." }) :
                (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.interpretationText, interpretationTextStyle], children: interpretation })] }));
};
exports.SignRecognition = SignRecognition;
var styles = react_native_1.StyleSheet.create({
    container: {
        display: "flex",
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
