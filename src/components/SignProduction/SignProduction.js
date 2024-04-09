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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignProduction = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var expo_av_1 = require("expo-av");
var adapter_1 = require("../../network/adapter");
var react_native_1 = require("react-native");
var FileSystem = __importStar(require("expo-file-system"));
var SignProduction = function (_a) {
    var _b = _a.modelName, modelName = _b === void 0 ? "MALE" : _b, text = _a.text, _c = _a.play, play = _c === void 0 ? true : _c, _d = _a.onLoaded, onLoaded = _d === void 0 ? function () { } : _d, _e = _a.onPlaying, onPlaying = _e === void 0 ? function () { } : _e, _f = _a.onStopped, onStopped = _f === void 0 ? function () { } : _f, _g = _a.videoStyle, videoStyle = _g === void 0 ? {} : _g, _h = _a.videoContainerStyle, videoContainerStyle = _h === void 0 ? {} : _h, _j = _a.loadingTextStyle, loadingTextStyle = _j === void 0 ? {} : _j, props = __rest(_a, ["modelName", "text", "play", "onLoaded", "onPlaying", "onStopped", "videoStyle", "videoContainerStyle", "loadingTextStyle"]);
    var _k = (0, react_1.useState)(null), videos = _k[0], setVideos = _k[1];
    var _l = (0, react_1.useState)(-1), currentVideoPlaying = _l[0], setCurrentVideoPlaying = _l[1];
    var _m = (0, react_1.useState)(-1), finishedPlaying = _m[0], setFinishedPlaying = _m[1];
    var _o = (0, react_1.useState)(false), loading = _o[0], setLoading = _o[1];
    var videoRef = (0, react_1.useRef)(null);
    var blobToName = function (blob, idx) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                var base64data = reader.result;
                if (base64data == null) {
                    console.log("got no b64 data");
                    return;
                }
                // Assuming you're working with an MP4 video, otherwise, adjust the mime type accordingly.
                var base64Video = base64data.split(',')[1]; // Splitting and taking the base64 content
                var filePath = "".concat(FileSystem.cacheDirectory).concat(idx, ".mp4");
                FileSystem.writeAsStringAsync(filePath, base64Video, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                resolve(filePath);
            };
        });
    };
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var textSplit, videos, textToRender, cnt, _a, _b, _c, _i, textIdx, text_1, result, fname, result, fname;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        textSplit = text.split(/[.!?]/);
                        setLoading(true);
                        setVideos([]);
                        setCurrentVideoPlaying(-1);
                        setFinishedPlaying(-1);
                        videos = [];
                        textToRender = "";
                        cnt = 0;
                        _a = textSplit;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 4];
                        textIdx = _c;
                        text_1 = (textSplit[textIdx] + ".").trim();
                        textToRender += (" " + text_1).trim();
                        if (textToRender.split(" ").length < 8 || textToRender.trim().length == 0) {
                            return [3 /*break*/, 4];
                        }
                        return [4 /*yield*/, (0, adapter_1.produceSign)(textToRender, modelName)];
                    case 2:
                        result = _d.sent();
                        return [4 /*yield*/, blobToName(result, cnt)];
                    case 3:
                        fname = _d.sent();
                        videos.push(fname);
                        setVideos(__spreadArray([], videos, true));
                        textToRender = "";
                        cnt++;
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        if (!(textToRender.trim().length > 2)) return [3 /*break*/, 8];
                        return [4 /*yield*/, (0, adapter_1.produceSign)(textToRender, modelName)];
                    case 6:
                        result = _d.sent();
                        return [4 /*yield*/, blobToName(result, cnt)];
                    case 7:
                        fname = _d.sent();
                        videos.push(fname);
                        setVideos(__spreadArray([], videos, true));
                        _d.label = 8;
                    case 8:
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [text]);
    var playVideo = function (idx) { return __awaiter(void 0, void 0, void 0, function () {
        var firedPlaying;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (videos == null) {
                        return [2 /*return*/];
                    }
                    if (videoRef.current == null) {
                        return [2 /*return*/];
                    }
                    onPlaying();
                    setCurrentVideoPlaying(idx);
                    return [4 /*yield*/, videoRef.current.unloadAsync()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, videoRef.current.loadAsync({ uri: videos[idx] })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, videoRef.current.playAsync()];
                case 3:
                    _a.sent();
                    firedPlaying = false;
                    videoRef.current.setOnPlaybackStatusUpdate(function (x) {
                        if ("didJustFinish" in x && x.didJustFinish) {
                            onStopped();
                            setFinishedPlaying(idx);
                        }
                        if ("isPlaying" in x && x.isPlaying && !firedPlaying) {
                            firedPlaying = true;
                            onPlaying();
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        if (play && videos != null && videoRef.current != null) {
            var numVideos = videos.length;
            if (currentVideoPlaying == finishedPlaying && numVideos - 1 > currentVideoPlaying) {
                playVideo(currentVideoPlaying + 1);
            }
        }
    }, [videos, play, currentVideoPlaying, finishedPlaying]);
    if (videos == null) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.videoContainer, videoContainerStyle], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.video, videoStyle], children: (0, jsx_runtime_1.jsx)(expo_av_1.Video, { ref: videoRef, isMuted: true, shouldPlay: true, style: styles.videoPlayer }) }), loading && currentVideoPlaying == finishedPlaying ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.loadingText, loadingTextStyle], children: "loading..." })) : null] }));
};
exports.SignProduction = SignProduction;
var styles = react_native_1.StyleSheet.create({
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
