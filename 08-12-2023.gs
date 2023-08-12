function updateChannelChangelogAndUndocumentedPlaylistValues() {
  initializeSettings()
  const channels = HighQualityUtils.channels().getAll()

  channels.forEach(channel => {
    const isPartOfBigThree = (channel.getDatabaseObject().productionSpreadsheet === "1B7b9jEaWiqZI8Z8CzvFN1cBvLVYwjb5xzhWtrgs4anI")

    if (isPartOfBigThree === true) {
      channel.getDatabaseObject().productionChangelogSpreadsheet = "1EKQq1K8Bd7hDlFMg1Y5G_a2tWk_FH39bgniUUBGlFKM"
      channel.getDatabaseObject().developmentChangelogSpreadsheet = "1rN_VcmuhiDE3iyv8QvtzOqCtQUfXRRtnQxJLSkgsuBw"
    } else {
      channel.getDatabaseObject().productionChangelogSpreadsheet = "1pN9O24zfrDBl6WNySj4yurFiqT3UmQd1IdRISvUjHd8"
      channel.getDatabaseObject().developmentChangelogSpreadsheet = "1EqHI5csBFO0dpm4HpwwzAqtmUbC2B5G-MW1Kgew-vpM"
    }

    channel.getDatabaseObject().developmentUndocumentedRipsPlaylist = "PLn8P5M1uNQk5_q_y1BVxgP68xhKQ2eM3F"
    channel.update()
  })  
}
