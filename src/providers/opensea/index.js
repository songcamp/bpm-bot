import axios from 'axios';
import { isNullish } from '../../utilities/index.js';

const BASE_URI = 'https://api.opensea.io/api/v1/';

const opensea = async (command) => {
    const { contractAddress, tokenId } = parseOpenSeaURL(command);
    const fetchURL = new URL(`${BASE_URI}assets`);
    fetchURL.searchParams.set('asset_contract_address', contractAddress);
    fetchURL.searchParams.set('token_ids', tokenId);
    try {
        const res = await axios.get(fetchURL.toString());

        if (isNullish(res.data)) {
            throw new Error(`Failed to find OpenSea asset at URL: ${command}`);
        }
        const asset = res.data.assets[0];

        if (isNullish(asset)) {
            throw new Error(`Failed to find OpenSea asset at URL: ${command}`);
        }
        if (isNullish(asset.animation_url) && isNullish(asset.animation_original_url)) {
            throw new Error('This OpenSea URL belongs to an NFT that is not an audio file. Please find an audio NFT on OpenSea & try again.');
        }

        return [
            {
                url: command,
                title: asset.name,
                // NOTE: Bit of a hack here as there's no guarantee any art the artist name. 
                artist: asset.creator?.user?.username ?? asset.collection?.name ?? asset.asset_contract?.name,
                artwork: asset.image_url,
                audio: asset.animation_url ?? asset.animation_original_url,
                provider: "OpenSea",
            }
        ];
    } catch (err) {
        if (err?.response?.status === 400) {
            throw new Error(`Failed to find OpenSea asset at URL: ${command}`);
        }

        throw err;
    }
    
};

const parseOpenSeaURL = (url) => {
    try {
        const urlObj = new URL(url);
        if (!urlObj.pathname.includes('assets')) {
            throw new Error('Invalid OpenSea URL. Please provide an OpenSea asset URL with an audio NFT');
        }

        const params = urlObj.pathname.split('/');

        return {
            contractAddress: params[2],
            tokenId: params[3]
        };
    } catch (err) {
        throw err;
    }
};

export { opensea };
