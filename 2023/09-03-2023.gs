// At some point, the upload date column started getting values formatted as strings with E.g. "2023-03-12T06:00:17Z".
// I don't know what caused it, but it needs to be fixed. It messes up the row sorting, which leads to duplication
// and errors with the website API.
function fixUploadDateColumnFormattingOnFanChannelRips() {
  initializeSettings()
  // const sheets = SpreadsheetApp.openById("1JhARnRkPEtwGFGgmxIBFoWixB7QR2K_toz38-tTHDOM").getSheets() // Copy of SiIvaGunner Fan Channel Rips
  const sheets = SpreadsheetApp.openById("1Q_L84zZ2rzS57ZcDcCdmxMsguqjpnbLGr5_QVX5LVKA").getSheets() // SiIvaGunner Fan Channel Rips

  sheets.forEach(sheet => {
    if (sheet.getName() === "Index" || sheet.getName() === "Template") {
      return
    }

    const uploadDateRange = sheet.getRange("E2:E")
    const uploadDates = sheet.getRange("E2:E").getValues()
    const formattedUploadDates = uploadDates.map(date => [HighQualityUtils.utils().formatDate(date[0])])
    console.log(sheet.getName(), uploadDates[0], formattedUploadDates[0])
    uploadDateRange.setValues(formattedUploadDates)
    sheet.sort(5, false)
  })
}

// Empty rows appeared when duplicate rows were removed via Google Sheets data cleanup. Make them disappear.
function deleteEmptyRowsOnFanChannelRips() {
  initializeSettings()
  // const sheets = SpreadsheetApp.openById("1JhARnRkPEtwGFGgmxIBFoWixB7QR2K_toz38-tTHDOM").getSheets() // Copy of SiIvaGunner Fan Channel Rips
  const sheets = SpreadsheetApp.openById("1Q_L84zZ2rzS57ZcDcCdmxMsguqjpnbLGr5_QVX5LVKA").getSheets() // SiIvaGunner Fan Channel Rips

  sheets.forEach(sheet => {
    if (sheet.getName() === "Index" || sheet.getName() === "Template") {
      return
    }

    console.log(sheet.getName())
    const lastRow = sheet.getLastRow()

    // Copied from HighQualityUtils.WrapperSheet.format()
    if (sheet.getMaxRows() > lastRow && sheet.getMaxRows() > 2) {
      const firstEmptyRow = (lastRow === 1 ? 3 : lastRow + 1)
      sheet.deleteRows(firstEmptyRow, sheet.getMaxRows() - firstEmptyRow + 1)
    }
  })
}
