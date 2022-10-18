import { zora, sound, catalog, audius, opensea } from '../providers/index.js';

const providerSelect = async (command) => {
  try {
    const url = new URL(command);
    switch (true) {
      case url.hostname.includes('catalog.works'):
        return await catalog(command);
      case url.hostname.includes('zora.co'):
        return await zora(command);
      case url.hostname.includes('sound.xyz'):
        return await sound(command);
      case url.hostname.includes('audius.co'):
        return await audius(command);
      case url.hostname.includes('opensea.io'):
        return await opensea(command);
      default:
        return null;
    }
  } catch (error) {
    throw new Error(`Failed to find the requested track from ${command}`);
  }
};

export { providerSelect };
