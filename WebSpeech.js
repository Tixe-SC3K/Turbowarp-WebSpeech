class WebSpeechExtension {
    getInfo() {
        return {
            id: 'webSpeech',
            name: 'Web Speech',
            blocks: [
                {
                    opcode: 'speakAndWait',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'speak [TEXT] with pitch [PITCH] rate [RATE] volume [VOLUME]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello, world!'
                        },
                        PITCH: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1,
                            minValue: 0,
                            maxValue: 2
                        },
                        RATE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1,
                            minValue: 0.1,
                            maxValue: 10
                        },
                        VOLUME: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1,
                            minValue: 0,
                            maxValue: 1
                        }
                    }
                }
            ]
        };
    }

    speakAndWait({ TEXT, PITCH, RATE, VOLUME }) {
        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(TEXT);

            // Set pitch, rate, and volume
            utterance.pitch = PITCH;
            utterance.rate = RATE;
            utterance.volume = VOLUME;

            // Resolve the promise when speech ends
            utterance.onend = resolve;
            
            // Speak the text
            window.speechSynthesis.speak(utterance);
        });
    }
}

// Register extention
Scratch.extensions.register(new WebSpeechExtension());
