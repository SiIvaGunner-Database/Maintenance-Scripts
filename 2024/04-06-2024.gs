/**
 * Check all of my playlists for ones missing from the "Rips featuring..." sheet.
 */
function checkForRipsFeaturingPlaylistsMissingFromSheet() {
  initializeSettings()
  const ripsFeaturingSheet = SpreadsheetApp.openById("1poNOCj5M31QSkdD4AMXvewuFMj-YQ6UzmJvT3PdyxNo").getActiveSheet()
  const sheetIds = ripsFeaturingSheet.getRange("B2:B").getValues().map(values => values[0])
  const [channelPlaylists] = HighQualityUtils.youtube().getChannelPlaylists("UC6ajqR7lEYf-33Gsj4lgVOA")
  console.log("Sheet playlists: ", sheetIds.length, "\nYouTube playlists: ", channelPlaylists.length)

  channelPlaylists.forEach(playlist => {
    const playlistTitle = playlist.snippet.localized.title
    console.log(playlistTitle)

    if (playlistTitle.includes("Rips") === true && sheetIds.includes(playlist.id) === false) {
      console.warn(`Adding ${playlistTitle} (${playlist.id}) to sheet`)
      const titleHyperlink = HighQualityUtils.utils().formatFandomHyperlink(playlistTitle, "siivagunner")
      const idHyperlink = HighQualityUtils.utils().formatYoutubeHyperlink(playlist.id)
      const lastRow = ripsFeaturingSheet.getLastRow()
      ripsFeaturingSheet.insertRowAfter(lastRow)
      ripsFeaturingSheet.getRange(lastRow + 1, 1).setValue(titleHyperlink)
      ripsFeaturingSheet.getRange(lastRow + 1, 2).setValue(idHyperlink)
    }
  })
}
