import { Audio } from "expo-av";

// Dopamine trigger: success sound chime
let successSound = null;

export const initSounds = async () => {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });
  } catch (error) {
    console.warn("Audio init failed:", error);
  }
};

export const playSuccessSound = async () => {
  try {
    if (!successSound) {
      // Try to load sound, gracefully fail if file doesn't exist
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/success.mp3"),
          { shouldPlay: false, volume: 0.5 }
        );
        successSound = sound;
      } catch (loadError) {
        console.warn("Success sound file not found - skipping audio");
        return; // Graceful exit if sound file missing
      }
    }
    await successSound.replayAsync();
  } catch (error) {
    console.warn("Sound playback failed:", error);
  }
};

export const cleanupSounds = async () => {
  if (successSound) {
    await successSound.unloadAsync();
    successSound = null;
  }
};
