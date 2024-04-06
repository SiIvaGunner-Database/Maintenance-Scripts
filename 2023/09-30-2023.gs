function updateChannelUndocumentedPlaylistValuesAgain() {
  initializeSettings()
  const channels = HighQualityUtils.channels().getAll()

  channels.forEach(channel => {
    if (channel.getDatabaseObject().wiki !== "") {
      channel.getDatabaseObject().developmentUndocumentedRipsPlaylist = "PLn8P5M1uNQk5_q_y1BVxgP68xhKQ2eM3F"
    } else {
      channel.getDatabaseObject().developmentUndocumentedRipsPlaylist = ""
    }

    channel.update()
  })  
}

function clearUndocumentedRipsTestPlaylist() {
  initializeSettings(true)
  const playlist = HighQualityUtils.playlists().getById("PLn8P5M1uNQk5_q_y1BVxgP68xhKQ2eM3F")
  const [videos] = playlist.getVideos()
  videos.forEach(video => playlist.removeVideo(video.getId()))
}
