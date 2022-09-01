import isNullish from '@bitty/nullish';
import { validate as isValidV4UUID } from 'uuid';

const IPFS_PROVIDER = 'https://ipfs.fleek.co/ipfs/';
const queue = new Map(); // Global queue for song state.

const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

const emojiNumbers = [
  '0️⃣',
  '1️⃣',
  '2️⃣',
  '3️⃣',
  '4️⃣',
  '5️⃣',
  '6️⃣',
  '7️⃣',
  '8️⃣',
  '9️⃣',
  '1️⃣0️⃣',
];

// Extract artist + song from urls
// YOLO reusing for sections that dont follow same artist/song pattern.
const getUrl = (link) => {
  const url = new URL(link);

  const p = url.pathname;

  const artist = p.substring(p.indexOf('/') + 1, p.lastIndexOf('/'));

  const removed = p.replace(artist, '');

  const song = p.replace(artist, '').substring(2, removed.length);

  return { artist, song };
};

// Zora sometimes shows pinned IPFS + sometimes IPFS hashes.
// This function will convert IPFS hashes to pinned IPFS URLS.
const ipfsConverter = (ipfs) => {
  if (ipfs.includes('ipfs://')) {
    const IPFS_HASH = ipfs.replace('ipfs://', '');
    return `${IPFS_PROVIDER}${IPFS_HASH}`;
  } else if (ipfs.includes('https://ipfs.io/ipfs/')) {
    return ipfs.replace('https://ipfs.io/ipfs/', IPFS_PROVIDER);
  } else {
    return ipfs;
  }
};

export {
  isValidUrl,
  queue,
  getUrl,
  isValidV4UUID,
  emojiNumbers,
  isNullish,
  ipfsConverter,
};
