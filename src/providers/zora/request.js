const url = "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1";

const GET_ZORA = `
query getMedia($id: ID!) {
    media(id: $id) {
      contentURI
      metadataURI
    }
  }`;

export { url, GET_ZORA };
