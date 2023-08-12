function initializeSettings(enableDevMode = false) {
  if (enableDevMode === true) {
    HighQualityUtils.settings().enableDevMode()
  }

  HighQualityUtils.settings().setAuthToken(PropertiesService.getScriptProperties())
}
