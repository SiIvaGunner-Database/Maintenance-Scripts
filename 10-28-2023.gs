// To run before updating the video sheets script, which did
// a better job keeping up with uploads in the testing phase
function copyVideosFromDevelopmentToProduction() {
  initializeSettings().disableYoutubeApi().disableCache()

  const productionVideoIds = getAllVideoIdsFromSheets()
  console.log(`${productionVideoIds.length} production video IDs found`)
  HighQualityUtils.settings().enableDevMode()
  const developmentVideoIds = getAllVideoIdsFromSheets()
  console.log(`${developmentVideoIds.length} production video IDs found`)

  const productionVideoIdMap = new Map(productionVideoIds.map(videoId => [videoId, videoId]))
  const missingVideos = []

  developmentVideoIds.forEach(developmentVideoId => {
    if (productionVideoIdMap.has(developmentVideoId) === false) {
      console.log(`Video with ID "${developmentVideoId}" missing from production database`)
      const video = HighQualityUtils.videos().getById(developmentVideoId).getDatabaseObject()
      missingVideos.push(video)
    }
  })

  HighQualityUtils.settings().disableDevMode()
  console.log(`Posting ${missingVideos.length} videos to production database`)

  missingVideos.forEach(video => {
    try {
      HighQualityUtils.database().postData(HighQualityUtils.videos().getApiPath(), video)
    } catch (error) {
      console.error(error.stack)
    }
  })
}

function getAllVideoIdsFromSheets() {
  const channels = HighQualityUtils.channels().getAll({ "channelStatus": "Public" })
  const videoIds = []

  channels.forEach(channel => {
    const sheetValues = channel.getSheet().getValues("A:A")
    sheetValues.forEach(rowValues => videoIds.push(rowValues[0]))
  })

  return videoIds
}
