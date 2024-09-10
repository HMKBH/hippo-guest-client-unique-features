function initializeThemeManagement() {
  const THEMES = {
    LIGHT: "light",
    DARK: "dark",
    SYSTEM: "system",
  };

  function isThemeValid(theme) {
    return Object.values(THEMES).includes(theme);
  }

  function getCurrentSystemTheme() {
    return window.matchMedia(`(prefers-color-scheme: ${THEMES.DARK})`).matches
      ? THEMES.DARK
      : THEMES.LIGHT;
  }

  function setTheme(newTheme) {
    if (!isThemeValid(newTheme)) return;

    document.documentElement.setAttribute("data-theme", newTheme);

    if (newTheme === THEMES.SYSTEM) {
      newTheme = getCurrentSystemTheme();
    }

    window.__hh_theme = newTheme;

    document.documentElement.classList.remove(THEMES.LIGHT, THEMES.DARK);
    document.documentElement.classList.add(newTheme);
    document.documentElement.style.colorScheme = newTheme;
  }

  let preferredTheme;

  try {
    preferredTheme = localStorage.getItem("theme");
  } catch (err) {
    preferredTheme = THEMES.SYSTEM;
  }

  if (!isThemeValid(preferredTheme)) {
    preferredTheme = THEMES.SYSTEM;
  }

  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme);
    preferredTheme = newTheme;
    try {
      localStorage.setItem("theme", newTheme);
    } catch (err) {}
  };

  window
    .matchMedia(`(prefers-color-scheme: ${THEMES.DARK})`)
    .addEventListener("change", function (e) {
      if (preferredTheme === THEMES.SYSTEM) {
        window.__setPreferredTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    });

  setTheme(preferredTheme);
}

export default initializeThemeManagement;
