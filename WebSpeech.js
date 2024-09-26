class WebSpeechExtension {
    getInfo() {
        return {
            id: 'webSpeech',
            name: 'Web Speech',
            blocks: [
                {
                    opcode: 'speakAndWait',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'speak and wait [TEXT] pitch [PITCH] rate [RATE] volume [VOLUME]',
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

    speakAndWait({ TEXT, PITCH, RATE, VOLUME }, util) {
        const utterance = new SpeechSynthesisUtterance(TEXT);

        // Set pitch, rate, and volume
        utterance.pitch = PITCH;
        utterance.rate = RATE;
        utterance.volume = VOLUME;

        // Return a promise to wait for speech to finish
        return new Promise((resolve) => {
            // Set up the onend event to resolve when speaking is done
            utterance.onend = () => {
                resolve(); // Resolve the promise when speech ends
            };

            // Start speaking
            window.speechSynthesis.speak(utterance);
        }).then(() => {
            util.runNext(); // Call next block when speech ends
        });
    }
}

// Register the extension in TurboWarp
Scratch.extensions.register(new WebSpeechExtension());
