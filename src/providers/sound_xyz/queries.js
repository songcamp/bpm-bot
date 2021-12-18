const url = "https://www.sound.xyz/api/graphql";

const GET_SOUND = `
query getMintedRelease($soundHandle: String!, $releaseSlug: String!) {
    getMintedRelease(soundHandle: $soundHandle, releaseSlug: $releaseSlug) {
      ...sharedReleaseFields
    }
  }
  
  fragment sharedReleaseFields on Release {
    id
    title
    titleSlug
    type
    createdAt
    description
    behindTheMusic
    artist{
      name
    }
    rewards {
      id
      title
      description
      numOfBackers
      price
    }
    mintInfos {
      id
      createdAt
      chainId
      editionId
      quantity
      numSold
      price
      startTime
      totalRaised
      totalRaisedUSD
    }
    genre {
      id
      name
    }
    coverImage {
      id
      url
      key
    }
    goldenEggImage {
      id
      url
      key
    }
    tracks {
      id
      title
      trackNumber
      audio {
        id
        url
        key
      }
      normalizedPeaks
      duration
    }
  }              
`;

export { url, GET_SOUND };
