class WebSpeechExtension {
    getInfo() {
        return {
            id: 'webSpeech',
            name: 'Web Speech',
            blocks: [
                {
                    opcode: 'speakAndWait',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'speak [TEXT] pitch [PITCH] rate [RATE] volume [VOLUME]',
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

    async speakAndWait({ TEXT, PITCH, RATE, VOLUME }) {
        const utterance = new SpeechSynthesisUtterance(TEXT);

        // Set pitch, rate, and volume
        utterance.pitch = PITCH;
        utterance.rate = RATE;
        utterance.volume = VOLUME;

        // Create a promise that resolves when the speech ends
        return new Promise((resolve) => {
            utterance.onend = () => {
                resolve();  // Resolve the promise when speech ends
            };
            window.speechSynthesis.speak(utterance);  // Start speaking
        });
    }
}

// Register the extension in TurboWarp
Scratch.extensions.register(new WebSpeechExtension());
