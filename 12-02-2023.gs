// I missed some videos with the approach used on 10-28-2023.
// The IDs missing from production were found using the following query:
/*
--create extension dblink; --only needs to run once

select dev_vids.id, dev_vids.title, dev_vids.visible, prod_vids.id
from videos_video as dev_vids 
left join dblink(
	'dbname=dbname user=user password=password',
	'select id from videos_video'
) as prod_vids(id text) on prod_vids.id = dev_vids.id
where prod_vids.id is null
limit 100;
*/
function addMissingVideosFromDevelopmentToProduction() {
  initializeSettings(true).disableYoutubeApi().disableCache()

  const videoIdsMissingFromProduction = [
    "HIJTufk3bNU", "dMJAyXBsZlE", "9OVHP6y3q70", "V5d5KRBhAf8", "YtX2hFzX6_w",
    "Li6iycvZKZk", "FxSBjSRMwgE", "InFf2v7iaWc", "cIHrHJuY2pE", "OXBzNPyub3Q",
    "p0swpNYgbeM", "AyFytNomQyE", "uiE7LIeQHNE", "jK-1c431kgg", "zgsWoQOgXTM",
    "PwbZxSiV4DM", "IPe_-kgutzQ", "1djfxw0s4u8", "ai08WTP3d4k"
  ]

  const missingVideoData = videoIdsMissingFromProduction.map(videoId => {
    return HighQualityUtils.videos().getById(videoId).getDatabaseObject()
  })

  console.log(`Posting ${missingVideoData.length} videos to production database`)
  HighQualityUtils.settings().disableDevMode()
  HighQualityUtils.database().postData(HighQualityUtils.videos().getApiPath(), missingVideoData)
}
