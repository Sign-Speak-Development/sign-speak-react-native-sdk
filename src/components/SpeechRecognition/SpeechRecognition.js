"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechRecognition = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var expo_av_1 = require("expo-av");
var react_native_1 = require("react-native");
var adapter_1 = require("../../network/adapter");
var SpeechRecognition = function (_a) {
    var _b = _a.modelName, modelName = _b === void 0 ? "LATEST" : _b, _c = _a.containerStyle, containerStyle = _c === void 0 ? {} : _c, _d = _a.buttonStyle, buttonStyle = _d === void 0 ? {} : _d, _e = _a.transcriptionStyle, transcriptionStyle = _e === void 0 ? {} : _e, _f = _a.loadingStyle, loadingStyle = _f === void 0 ? {} : _f, _g = _a.buttonTextStyle, buttonTextStyle = _g === void 0 ? {} : _g, _h = _a.gotResult, gotResult = _h === void 0 ? function () { } : _h, props = __rest(_a, ["modelName", "containerStyle", "buttonStyle", "transcriptionStyle", "loadingStyle", "buttonTextStyle", "gotResult"]);
    var _j = expo_av_1.Audio.usePermissions(), permissionResponse = _j[0], requestPermission = _j[1];
    var recorder = (0, react_1.useRef)(null);
    var _k = (0, react_1.useState)(null), transcription = _k[0], setTranscription = _k[1];
    var _l = (0, react_1.useState)(false), processing = _l[0], setProcessing = _l[1];
    var _m = (0, react_1.useState)(false), recording = _m[0], setRecording = _m[1];
    var startRecording = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (permissionResponse == null) {
                        return [2 /*return*/];
                    }
                    if (!(permissionResponse.status !== 'granted')) return [3 /*break*/, 2];
                    return [4 /*yield*/, requestPermission()];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2: return [4 /*yield*/, expo_av_1.Audio.setAudioModeAsync({
                        allowsRecordingIOS: true,
                        playsInSilentModeIOS: true
                    })];
                case 3:
                    _b.sent();
                    _a = recorder;
                    return [4 /*yield*/, expo_av_1.Audio.Recording.createAsync(expo_av_1.Audio.RecordingOptionsPresets.LOW_QUALITY)];
                case 4:
                    _a.current = _b.sent();
                    setRecording(true);
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _b.sent();
                    console.error(JSON.stringify(e_1));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var stopRecording = function () { return __awaiter(void 0, void 0, void 0, function () {
        var uri, blob, reader;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setRecording(false);
                    if (recorder.current == null) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, ((_a = recorder.current) === null || _a === void 0 ? void 0 : _a.recording.stopAndUnloadAsync())];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, expo_av_1.Audio.setAudioModeAsync({ allowsRecordingIOS: false })];
                case 2:
                    _b.sent();
                    uri = recorder.current.recording.getURI();
                    if (uri == null) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch(uri)];
                case 3: return [4 /*yield*/, (_b.sent()).blob()];
                case 4:
                    blob = _b.sent();
                    reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var base64data;
                        return __generator(this, function (_a) {
                            base64data = reader.result;
                            if (base64data == null) {
                                console.log("got no b64 data");
                                return [2 /*return*/];
                            }
                            setProcessing(true);
                            (0, adapter_1.recognizeSpeech)(base64data.split(",")[1]).then(function (result) {
                                setProcessing(false);
                                setTranscription(result);
                                gotResult(result);
                            });
                            return [2 /*return*/];
                        });
                    }); };
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.container, containerStyle], children: [transcription != null && transcription.trim().length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.transcription, transcriptionStyle], children: transcription })) : null, processing ? ((0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { color: '#00AA9D', style: [styles.loading, loadingStyle] })) : recording ? ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: [styles.button, styles.stopButton, buttonStyle], onPress: stopRecording, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.buttonText, buttonTextStyle], children: "Stop Listening" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: [styles.button, styles.startButton, buttonStyle], onPress: startRecording, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.buttonText, buttonTextStyle], children: "Start Listening" }) }))] }));
};
exports.SpeechRecognition = SpeechRecognition;
var styles = react_native_1.StyleSheet.create({
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
