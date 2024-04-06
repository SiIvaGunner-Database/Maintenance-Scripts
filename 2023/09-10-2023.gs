function copyChannelsFromProductionToDevelopment() {
  initializeSettings().disableYoutubeApi().disableCache()

  const productionChannels = HighQualityUtils.channels().getAll()
  HighQualityUtils.settings().enableDevMode()
  const developmentChannels = HighQualityUtils.channels().getAll({ "fields": "id" })
  const developmentChannelsMap = new Map(developmentChannels.map(channel => [channel.getId(), channel]))

  productionChannels.forEach(productionChannel => {
    if (developmentChannelsMap.has(productionChannel.getId()) === false) {
      console.log(`Post channel with ID "${productionChannel.getId()}" to development database`)
      HighQualityUtils.database().postData(HighQualityUtils.channels().getApiPath(), productionChannel.getDatabaseObject())
    }
  })
}

// This is really slow. In the future, I should try to use SQL instead.
function copyVideosFromProductionToDevelopment() {
  initializeSettings().disableYoutubeApi().disableCache()

  const scriptProperties = PropertiesService.getScriptProperties()
  const pageNumberKey = "copyVideosFromProductionToDevelopment.pageNumber"
  let pageNumber = Number(scriptProperties.getProperty(pageNumberKey)) + 1

  const productionVideos = HighQualityUtils.videos().getAll({ "page": pageNumber }, 1000)
  HighQualityUtils.settings().enableDevMode()
  const developmentVideos = HighQualityUtils.videos().getAll({ "fields": "id" })
  const developmentVideosMap = new Map(developmentVideos.map(video => [video.getId(), video]))
  const missingVideoData = []

  productionVideos.forEach(productionVideo => {
    if (developmentVideosMap.has(productionVideo.getId()) === false) {
      console.log(`Video with ID "${productionVideo.getId()}" missing from development database`)
      missingVideoData.push(productionVideo.getDatabaseObject())
    }
  })

  console.log(`Posting ${missingVideoData.length} videos to development database`)
  HighQualityUtils.database().postData(HighQualityUtils.videos().getApiPath(), missingVideoData)
  scriptProperties.setProperty(pageNumberKey, pageNumber)
}

function updateDevelopmentSpreadsheetValues() {
  initializeSettings()
  const channels = HighQualityUtils.channels().getAll()

  channels.forEach(channel => {
    const isPartOfBigThree = (channel.getDatabaseObject().productionSpreadsheet === "1B7b9jEaWiqZI8Z8CzvFN1cBvLVYwjb5xzhWtrgs4anI")

    if (isPartOfBigThree === true) {
      channel.getDatabaseObject().developmentSpreadsheet = "1qMZEYTyh8qINjchKdXISha0KwLHAhcrSrTkQ4JipYTw"
      channel.getDatabaseObject().developmentChangelogSpreadsheet = "1Rwdks8gpY8SPTJVjyVgT9_7o5piO9ZyH_510eiwyp_4"
    } else {
      channel.getDatabaseObject().developmentSpreadsheet = "1-X8Jx5uOtzPgMZIVkMu2PR6LgRr0rykdapacv50g5EI"
      channel.getDatabaseObject().developmentChangelogSpreadsheet = "1I3pwwgWhFQKTBFWTxIjWsiCMmbYyS9_02yYXbIeJqxQ"
    }

    channel.update()
  })  
}
