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
exports.SpeechProduction = void 0;
var react_1 = require("react");
var expo_av_1 = require("expo-av");
var adapter_1 = require("../../network/adapter");
var SpeechProduction = function (_a) {
    var _b = _a.modelName, modelName = _b === void 0 ? "FEMALE" : _b, text = _a.text, _c = _a.play, play = _c === void 0 ? true : _c, _d = _a.onLoaded, onLoaded = _d === void 0 ? function () { } : _d, _e = _a.onPlaying, onPlaying = _e === void 0 ? function () { } : _e, _f = _a.onStopped, onStopped = _f === void 0 ? function () { } : _f, props = __rest(_a, ["modelName", "text", "play", "onLoaded", "onPlaying", "onStopped"]);
    var _g = (0, react_1.useState)(), audio = _g[0], setAudio = _g[1];
    (0, react_1.useEffect)(function () {
        (0, adapter_1.produceSpeech)(text, modelName).then(function (blob) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setAudio(blob);
                return [2 /*return*/];
            });
        }); });
    }, [text]);
    (0, react_1.useEffect)(function () {
        if (play && audio != null) {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(audio);
            reader_1.onloadend = function () { return __awaiter(void 0, void 0, void 0, function () {
                var base64data, mimeType, base64Video, videoDataUrl, sound, firedPlaying;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            onLoaded();
                            base64data = reader_1.result;
                            if (base64data == null) {
                                console.log("got no b64 data");
                                return [2 /*return*/];
                            }
                            mimeType = 'audio/mp3';
                            base64Video = base64data.split(',')[1];
                            videoDataUrl = "data:".concat(mimeType, ";base64,").concat(base64Video);
                            return [4 /*yield*/, expo_av_1.Audio.Sound.createAsync({ uri: videoDataUrl })];
                        case 1:
                            sound = (_a.sent()).sound;
                            return [4 /*yield*/, sound.playAsync()];
                        case 2:
                            _a.sent();
                            firedPlaying = false;
                            sound.setOnPlaybackStatusUpdate(function (x) {
                                if ("didJustFinish" in x && x.didJustFinish) {
                                    onStopped();
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
        }
    }, [audio, play]);
    return null;
};
exports.SpeechProduction = SpeechProduction;
