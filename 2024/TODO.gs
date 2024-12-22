function addMissingSheetHyperlinksToFanChannelsSheet() {
  // add missing index links for fan channels
}

function sortFanChannelSheets() {
  // sort fan channel sheets
}

function removeDescriptionColumnsFromSheets() {
  // remove description column from all sheets
}

// This may or may not ever happen
function hideChannelSheetsUnder100Subscribers() {
  initializeSettings()

  HighQualityUtils.channels().getAll().forEach(channel => {
    const subscriberCount = parseInt(channel.getDatabaseObject().subscriberCount)
    console.log(subscriberCount, subscriberCount >= 100, channel.hasSheet() === false, subscriberCount >= 100 || channel.hasSheet() === false)
    if (subscriberCount >= 100 || channel.hasSheet() === false) {
      console.log(`Skipping ${channel.getDatabaseObject().title} [${channel.getId()}]`)
      return
    }

    console.log(`Updating ${channel.getDatabaseObject().title} [${channel.getId()}]`)
    // channel.getSpreadsheet().getOriginalObject().deleteSheet(channel.getSheet().getOriginalObject())
    // channel.getDatabaseObject().developmentSpreadsheet = null
    // channel.getDatabaseObject().productionSpreadsheet = null
    // channel.update()
  })
}
