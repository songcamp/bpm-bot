const url = "https://api.sound.xyz/graphql";

const GET_TRACK = `
query ReleasePage($soundHandle: String!, $releaseSlug: String!) {
  mintedRelease(soundHandle: $soundHandle, releaseSlug: $releaseSlug) {
    ...ReleasePageContent
  }
}

fragment ReleasePageContent on Release {
  ...PublicSaleInfo
}

fragment PublicSaleInfo on Release {
  track {
    id
  }
}       
`;

const GET_SONG = `
query audioFromTrack($trackId: UUID!) {
  audioFromTrack(trackId: $trackId) {
    release {
      title
      coverImage {
        url
      }
      artist {
        name
      }
    }
    audio {
      url
    }
  }
}
`

export { url, GET_TRACK, GET_SONG };

