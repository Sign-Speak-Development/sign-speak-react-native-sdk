import { SignProduction } from "./components/SignProduction/SignProduction";
import { SignRecognition } from "./components/SignRecognition/SignRecognition";
import { SpeechProduction } from "./components/SpeechProduction/SpeechProduction";
import { SpeechRecognition } from "./components/SpeechRecognition/SpeechRecognition";
import { produceSign, produceSpeech, recognizeSign, submitFeedback } from "./network/adapter";
import { setKey } from "./network/key";

export { SignRecognition, SignProduction, SpeechProduction, SpeechRecognition, produceSign, produceSpeech, recognizeSign, submitFeedback, setKey }