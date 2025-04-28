document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const currentThemeBtn = themeSwitcher.querySelector('.current-theme');
    const themeOptions = themeSwitcher.querySelectorAll('.theme-option');
    const html = document.documentElement;
  
    // Theme icons mapping
    const themeIcons = {
      light: 'fa-sun',
      dark: 'fa-moon',
      green: 'fa-leaf',
      blue: 'fa-droplet'
    };
  
    // Theme names mapping
    const themeNames = {
      light: 'Light',
      dark: 'Dark',
      green: 'Green',
      blue: 'Blue'
    };
  
    // Initialize theme
    function initializeTheme() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Use system preference if no theme is saved
      const theme = !localStorage.getItem('theme') && systemPrefersDark ? 'dark' : savedTheme;
      
      setTheme(theme);
    }
  
    // Set theme
    function setTheme(theme) {
      // Remove all theme classes
      html.classList.remove('light', 'dark', 'green', 'blue');
      
      // Add selected theme class
      html.classList.add(theme);
      
      // Update active button and current theme icon
      themeOptions.forEach(option => {
        const isActive = option.dataset.theme === theme;
        option.classList.toggle('active', isActive);
        
        if (isActive) {
          const iconClass = option.querySelector('i').className;
          currentThemeBtn.innerHTML = `<i class="${iconClass}"></i>`;
          currentThemeBtn.setAttribute('title', `${themeNames[theme]} Theme`);
        }
      });
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
      
      // Close dropdown
      themeSwitcher.classList.remove('active');
      
      // Update meta theme color if needed
      updateMetaThemeColor(theme);
    }
  
    // Update meta theme color for mobile browsers
    function updateMetaThemeColor(theme) {
      const themeColors = {
        light: '#10b981',
        dark: '#064e3b',
        green: '#22c55e',
        blue: '#3b82f6'
      };
      
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.content = themeColors[theme];
    }
  
    // Toggle theme options dropdown
    currentThemeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeSwitcher.classList.toggle('active');
    });
  
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!themeSwitcher.contains(e.target)) {
        themeSwitcher.classList.remove('active');
      }
    });
  
    // Event listeners for theme buttons
    themeOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        setTheme(option.dataset.theme);
      });
    });
  
    // Initialize on load
    initializeTheme();
  
    // Watch for system theme changes (only if no preference set)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  });