const url = "https://catalog-prod.hasura.app/v1/graphql";

const GET_SPACES = `
query GetSpacesById($spaceId: uuid!) {
  spaces_by_pk(id: $spaceId) {
    creator {
      id
      handle
      name
    }
    title
    description
    ipfs_hash_cover_img
    type
    tracks {
      order
      track {
        title
        description
        nft_id
        ipfs_hash_lossy_audio
        ipfs_hash_lossy_artwork
        short_url
        artist {
          name
          handle
        }
      }
    }
  }
}
`;

const GET_TRACK = `
query GetTrack($shortUrl: String, $handle: String) {
  tracks(where: {
    _and: { 
      short_url: { 
        _eq: $shortUrl
      }, 
      artist: {
        handle: {
          _eq: $handle
        }
      }
    }
  }) {
    title
    artist {
      name
    }
    ipfs_hash_lossy_artwork
    ipfs_hash_lossy_audio
  }
}
`;

export { url, GET_TRACK, GET_SPACES };
