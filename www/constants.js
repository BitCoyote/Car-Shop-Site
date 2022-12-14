module.exports = {
  graphqlUrl: process.env.GATSBY_GRAPHQL_URL || `http://localhost:1337/graphql`,
  strapiApiBase: process.env.GATSBY_STRAPI_API_BASE || `http://localhost:1337`,
  youtubeApi: process.env.GATSBY_YOUTUBE_API_KEY ,
  youtubePlaylistId: process.env.GATSBY_YOUTUBE_PLAYLIST_ID,
  contactEmail: process.env.GATSBY_CONTACT_EMAIL_TO || ``,
}
