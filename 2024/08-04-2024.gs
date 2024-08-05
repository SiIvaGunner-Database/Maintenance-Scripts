/**
 * Populate the new "Wiki Title" sheet column.
 */
function addWikiTitlesToSheet() {
  initializeSettings()

  const sheet = HighQualityUtils.channels().getById("UC9ecwl3FTG66jIKA9JRDtmg").getSheet()
  const titles = sheet.getValues("B:B")
  const wikiTitles = titles.map(title => [HighQualityUtils.utils().formatFandomPageName(title[0])])

  console.log(titles.length, titles)
  console.log(wikiTitles.length, wikiTitles)

  sheet.updateValues(wikiTitles, 2, 12)
}
