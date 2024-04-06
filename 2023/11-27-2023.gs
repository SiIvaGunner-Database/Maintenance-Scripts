// Video statuses aren't getting updated for deleted channels
// For now, update them through a manual run here
// In the future, do this from the SiIvaGunner Channels script
function updateVideoStatusOfDeletedChannels() {
  initializeSettings().disableYoutubeApi()
  const channels = HighQualityUtils.channels().getAll({ "channelStatus": "Deleted" })

  channels.forEach(channel => {
    console.log(`Checking channel with ID ${channel.getId()}`)
    const videosToUpdate = []
    const options = { "parameters": { "fields": "id,title,channel,videoStatus" } }

    channel.getVideos(options)[0].forEach(video => {
      if (video.getDatabaseObject().videoStatus !== "Deleted") {
        video.getDatabaseObject().videoStatus = "Deleted"
        videosToUpdate.push(video)
      }
    })

    if (videosToUpdate.length > 0) {
      console.log(`Updating ${videosToUpdate.length} videos status for channel with ID ${channel.getId()}`)
      const range = channel.getSheet().getOriginalObject().getRange("D2:D")
      const newStatuses = range.getValues().map(value => ["Deleted"])
      range.setValues(newStatuses)
      HighQualityUtils.videos().updateAll(videosToUpdate)
    }
  })  
}
