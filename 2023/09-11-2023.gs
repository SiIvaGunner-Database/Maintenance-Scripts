function updateInvalidChannelWikis() {
  initializeSettings(true)
  const channels = HighQualityUtils.channels().getAll()

  channels.forEach(channel => {
    if (channel.getDatabaseObject().wiki === "None") {
      channel.getDatabaseObject().wiki = ""
      channel.update()
    }
  })  
}
