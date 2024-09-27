class WebSpeechExtension {
    constructor() {
        // Cache the list of voices and languages to avoid multiple calls to getVoices
        this.languages = [];

        // Get the voices and extract languages
        this.updateLanguages();
    }

    updateLanguages() {
        const voices = window.speechSynthesis.getVoices();
        
        // Extract unique language codes
        const languageSet = new Set();
        voices.forEach(voice => {
            languageSet.add(voice.lang);
        });

        // Convert to an array and sort
        this.languages = Array.from(languageSet).sort();
    }

    getInfo() {
        // Check if the language list is empty and refresh if needed
        if (this.languages.length === 0) {
            this.updateLanguages();
        }

        return {
            id: 'webSpeech',
            name: 'Web Speech',
            blocks: [
                {
                    opcode: 'speakAndWait',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'speak and wait [TEXT] in [LANGUAGE] pitch [PITCH] rate [RATE] volume [VOLUME]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello, world!'
                        },
                        LANGUAGE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'languages'
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
                },
                {
                    opcode: 'stopAllSpeech',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'stop all speech'
                }
            ],
            menus: {
                languages: {
                    acceptReporters: true,
                    items: [
                        { text: 'default', value: 'default' },  // Add the "default" option
                        ...this.languages.map(lang => ({ text: lang, value: lang }))
                    ]
                }
            }
        };
    }

    speakAndWait({ TEXT, LANGUAGE, PITCH, RATE, VOLUME }, util) {
        const utterance = new SpeechSynthesisUtterance(TEXT);

        // Set pitch, rate, and volume
        utterance.pitch = PITCH;
        utterance.rate = RATE;
        utterance.volume = VOLUME;

        // If LANGUAGE is not 'default', set the language
        if (LANGUAGE !== 'default') {
            utterance.lang = LANGUAGE;
        }

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

    stopAllSpeech() {
        // Cancel all ongoing speech synthesis and clear the queue
        window.speechSynthesis.cancel();
    }
}

// Register the extension in TurboWarp
Scratch.extensions.register(new WebSpeechExtension());
