function initializeSettings(enableDevMode = false) {
  if (enableDevMode === true) {
    HighQualityUtils.settings().enableDevMode()
  }

  return HighQualityUtils.settings().setAuthToken(PropertiesService.getScriptProperties())
}
