// Values of video.channelTitle have been updated to match channel.title
// and empty video.wikiStatus values have been updated to undocumented.
/*
-- Find instances where video.channelTitle does not match channel.title
SELECT VIDEO.ID, VIDEO."channelTitle", CHANNEL."title"
FROM VIDEOS_VIDEO VIDEO
JOIN CHANNELS_CHANNEL CHANNEL ON CHANNEL.ID = VIDEO.CHANNEL_ID
WHERE VIDEO."channelTitle" != CHANNEL."title";

-- Update video.channelTitle to match channel.title (may need to rerun in the future)
UPDATE VIDEOS_VIDEO VIDEO
SET "channelTitle" = CHANNEL."title"
FROM CHANNELS_CHANNEL CHANNEL
WHERE CHANNEL.ID = VIDEO.CHANNEL_ID
AND VIDEO."channelTitle" != CHANNEL."title";

-- Find instances where video.wikiStatus values are empty
SELECT VIDEO.ID, VIDEO."wikiStatus"
FROM VIDEOS_VIDEO VIDEO
WHERE VIDEO."wikiStatus" IS NULL OR VIDEO."wikiStatus" = '';

-- Update empty video.wikiStatus values to undocumented
UPDATE VIDEOS_VIDEO VIDEO
SET "wikiStatus" = 'Undocumented'
WHERE VIDEO."wikiStatus" IS NULL OR VIDEO."wikiStatus" = '';
*/
