// User data and state
let currentUser = null;
let userHistory = [];
let selectedDiseases = [];
let image = null;

// DOM Elements
const authContainer = document.querySelector('.auth-container');
const loginCard = document.getElementById('login-card');
const signupCard = document.getElementById('signup-card');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
const appContainer = document.getElementById('app-container');
const logoutButton = document.getElementById('logout-button');
const searchInput = document.getElementById('disease-search');
const suggestionsList = document.querySelector('.suggestions-list');
const diseaseChipsContainer = document.querySelector('.disease-chips');
const uploadArea = document.querySelector('.upload-area');
const fileInput = document.querySelector('.file-input');
const submitButton = document.querySelector('.submit-button');
const resultsCard = document.querySelector('.results-card');
const recommendationsList = document.querySelector('.recommendations-list');
const warningsSection = document.querySelector('.warnings-section');
const warningsList = document.querySelector('.warnings-list');
const tipsGrid = document.querySelector('.tips-grid');
const tabContents = document.querySelectorAll('.tab-content');
const navButtons = document.querySelectorAll('.nav-button');
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mainNav = document.querySelector('.main-nav');
const footerLinks = document.querySelectorAll('.footer-link');
const currentYearElement = document.querySelector('.current-year');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileAvatar = document.querySelector('.profile-avatar img');
const analysisCount = document.getElementById('analysis-count');
const conditionsCount = document.getElementById('conditions-count');
const historyList = document.querySelector('.history-list');

// Comprehensive Disease Data (200+ conditions)
const diseases = [
  // Common Conditions
  "Acne", "Allergies", "Anemia", "Anxiety", "Arthritis", "Asthma", "Back Pain", 
  "Bronchitis", "Common Cold", "Constipation", "Cough", "Depression", "Diarrhea",
  "Eczema", "Fatigue", "Fever", "Flu", "Headache", "Heartburn", "Hypertension",
  "Insomnia", "Migraine", "Nausea", "Obesity", "Pneumonia", "Sinusitis", "Stress",
  
  // Chronic Diseases
  "Alzheimer's Disease", "Bipolar Disorder", "Cancer", "Chronic Kidney Disease",
  "Chronic Pain", "COPD", "Coronary Artery Disease", "Crohn's Disease", 
  "Cystic Fibrosis", "Dementia", "Diabetes Type 1", "Diabetes Type 2",
  "Epilepsy", "Fibromyalgia", "Gout", "HIV/AIDS", "Hyperthyroidism",
  "Hypothyroidism", "Irritable Bowel Syndrome", "Lupus", "Multiple Sclerosis",
  "Osteoarthritis", "Osteoporosis", "Parkinson's Disease", "Psoriasis",
  "Rheumatoid Arthritis", "Schizophrenia", "Stroke", "Ulcerative Colitis",
  
  // Infectious Diseases
  "Chickenpox", "Cholera", "COVID-19", "Dengue Fever", "Ebola", "Hepatitis A",
  "Hepatitis B", "Hepatitis C", "Herpes", "HIV", "Influenza", "Lyme Disease",
  "Malaria", "Measles", "Meningitis", "Mumps", "Polio", "Rabies", "Rubella",
  "SARS", "Shingles", "Smallpox", "Syphilis", "Tetanus", "Tuberculosis", "Zika",
  
  // Rare Diseases
  "ALS (Lou Gehrig's Disease)", "Celiac Disease", "Charcot-Marie-Tooth Disease",
  "Ehlers-Danlos Syndrome", "Fabry Disease", "Gaucher Disease", "Hemophilia",
  "Huntington's Disease", "Marfan Syndrome", "Muscular Dystrophy", "Phenylketonuria",
  "Porphyria", "Prader-Willi Syndrome", "Progeria", "Sickle Cell Anemia",
  "Tay-Sachs Disease", "Tourette Syndrome", "Wilson's Disease",
  
  // Organ-Specific Conditions
  "Appendicitis", "Cataracts", "Cirrhosis", "Diverticulitis", "Endometriosis",
  "Gallstones", "Glaucoma", "Heart Failure", "Kidney Stones", "Macular Degeneration",
  "Myocardial Infarction", "Pancreatitis", "Peptic Ulcer", "Prostatitis",
  "Retinal Detachment", "Tinnitus", "Varicose Veins",
  
  // Mental Health
  "ADHD", "Autism Spectrum Disorder", "Borderline Personality Disorder",
  "Bulimia Nervosa", "Eating Disorder", "Generalized Anxiety Disorder",
  "OCD", "PTSD", "Seasonal Affective Disorder", "Social Anxiety Disorder",
  
  // Women's Health
  "Breast Cancer", "Cervical Cancer", "Endometriosis", "Fibroids", "Menopause",
  "Ovarian Cancer", "PCOS", "Preeclampsia", "Premenstrual Dysphoric Disorder",
  
  // Children's Health
  "Asthma (Childhood)", "Autism", "Croup", "Ear Infection", "Hand-Foot-Mouth Disease",
  "Juvenile Diabetes", "Kawasaki Disease", "RSV", "Whooping Cough",
  
  // Age-Related
  "Age-Related Macular Degeneration", "Benign Prostatic Hyperplasia",
  "Osteoarthritis", "Osteoporosis", "Presbycusis", "Presbyopia",
  
  // Other Conditions
  "Anorexia Nervosa", "Bell's Palsy", "Carpal Tunnel Syndrome", "Chronic Fatigue Syndrome",
  "Dupuytren's Contracture", "GERD", "Guillain-Barre Syndrome", "Hemorrhoids",
  "Interstitial Cystitis", "Laryngitis", "Meniere's Disease", "Narcolepsy",
  "Restless Legs Syndrome", "Rosacea", "Sarcoidosis", "Sciatica", "Scoliosis",
  "Sleep Apnea", "Temporomandibular Joint Disorder", "Trigeminal Neuralgia",
  "Urinary Incontinence", "Vertigo", "Vitiligo"
];

// Enhanced Recommendations Data
const recommendations = {
  general: [
    'Increase intake of leafy greens and colorful vegetables',
    'Stay hydrated with at least 8 glasses of water daily',
    'Engage in 30 minutes of moderate exercise most days',
    'Get 7-9 hours of quality sleep each night',
    'Reduce processed food and added sugar consumption',
    'Practice stress-reduction techniques like meditation',
    'Maintain regular meal times for better digestion',
    'Include probiotic-rich foods for gut health',
    'Limit alcohol consumption to moderate levels',
    'Choose whole grains over refined carbohydrates'
  ],
  diabetes: [
    'Monitor carbohydrate intake and blood glucose levels',
    'Choose low glycemic index foods',
    'Balance meals with protein, fiber, and healthy fats',
    'Limit sugar-sweetened beverages',
    'Engage in regular physical activity',
    'Maintain a healthy weight',
    'Check feet daily for cuts or sores',
    'Schedule regular eye exams',
    'Manage stress levels effectively',
    'Take medications as prescribed'
  ],
  hypertension: [
    'Reduce sodium intake to less than 2,300mg daily',
    'Increase potassium-rich foods like bananas and spinach',
    'Limit alcohol to 1 drink per day for women, 2 for men',
    'Practice deep breathing exercises',
    'Monitor blood pressure regularly',
    'Maintain a healthy weight',
    'Engage in aerobic exercise most days',
    'Limit caffeine intake',
    'Quit smoking if applicable',
    'Consider the DASH diet approach'
  ],
  heart: [
    'Choose healthy fats (olive oil, avocados, nuts)',
    'Increase omega-3 fatty acids from fish or flaxseeds',
    'Limit saturated and trans fats',
    'Include soluble fiber from oats and legumes',
    'Engage in regular cardiovascular exercise',
    'Manage cholesterol levels',
    'Control portion sizes',
    'Limit processed meats',
    'Practice relaxation techniques',
    'Know your family heart health history'
  ],
  digestive: [
    'Eat slowly and chew thoroughly',
    'Stay hydrated throughout the day',
    'Include probiotic and prebiotic foods',
    'Limit fatty and fried foods',
    'Reduce portion sizes',
    'Identify and avoid trigger foods',
    'Maintain regular meal times',
    'Consider food combining principles',
    'Stay physically active',
    'Manage stress levels'
  ],
  autoimmune: [
    'Consider an anti-inflammatory diet',
    'Increase omega-3 fatty acids',
    'Limit processed foods and additives',
    'Stay hydrated with clean water',
    'Consider elimination diets under supervision',
    'Prioritize sleep and rest',
    'Manage stress through mindfulness',
    'Consider vitamin D supplementation',
    'Work with a registered dietitian',
    'Listen to your body\'s responses'
  ]
};



document.addEventListener('DOMContentLoaded', function() {
  // Toggle password visibility
  document.querySelectorAll('.toggle-password').forEach(button => {
      button.addEventListener('click', function(e) {
          e.stopPropagation();
          const input = this.closest('.input-with-icon').querySelector('input');
          const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
          input.setAttribute('type', type);
          this.classList.toggle('fa-eye');
          this.classList.toggle('fa-eye-slash');
      });
  });

  // Focus input when clicking anywhere in the container (except the eye icon)
  document.querySelectorAll('.input-with-icon').forEach(container => {
      container.addEventListener('click', function(e) {
          if (!e.target.closest('.toggle-password-container')) {
              this.querySelector('input').focus();
          }
      });
  });

  // Switch between login and signup forms
  document.getElementById('show-signup').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('login-card').classList.remove('active');
      document.getElementById('signup-card').classList.add('active');
  });

  document.getElementById('show-login').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('signup-card').classList.remove('active');
      document.getElementById('login-card').classList.add('active');
  });

  // Form submission handlers
  document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your login logic here
  });

  document.getElementById('signup-form').addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your signup logic here
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm').value;
      
      if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
      }
      
      alert('Signup functionality would be implemented here');
  });

  // OAuth button handlers
  document.querySelectorAll('.oauth-button.google').forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Google OAuth would be implemented here');
      });
  });

  document.querySelectorAll('.oauth-button.facebook').forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Facebook OAuth would be implemented here');
      });
  });
});

// Initialize the app
function init() {
  // Set current year in footer
  currentYearElement.textContent = new Date().getFullYear();

  // Check if user is logged in
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    userHistory = JSON.parse(localStorage.getItem('userHistory')) || [];
    showApp();
  } else {
    showAuth();
  }

  // Set up event listeners
  setupEventListeners();
}


// Set up event listeners
function setupEventListeners() {
  // Auth navigation
  showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginCard.classList.remove('active');
    signupCard.classList.add('active');
  });

  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupCard.classList.remove('active');
    loginCard.classList.add('active');
  });

  // Toggle password visibility
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  });

  // Auth forms
  loginForm.addEventListener('submit', handleLogin);
  signupForm.addEventListener('submit', handleSignup);
  logoutButton.addEventListener('click', handleLogout);

  // Disease search
  searchInput.addEventListener('input', handleSearchInput);
  suggestionsList.addEventListener('click', handleSuggestionClick);

  // Image upload
  uploadArea.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', handleImageChange);
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      handleImageChange({ target: fileInput });
    }
  });

  // Form submission
  submitButton.addEventListener('click', handleSubmit);

  // Tab navigation
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;
      showTab(tabId);
    });
  });

  // Footer navigation
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.dataset.tab;
      showTab(tabId);
    });
  });

  // Mobile menu
  mobileMenuButton.addEventListener('click', toggleMobileMenu);
}

// Show auth screens
function showAuth() {
  authContainer.style.display = 'flex';
  appContainer.style.display = 'none';
}

// Show main app
function showApp(firstTime = false) {
  authContainer.style.display = 'none';
  appContainer.style.display = 'block';
  updateProfile();

  // If first time (login/signup), go to home
  // Otherwise, restore last active tab
  const tabToShow = firstTime ? 'home' : localStorage.getItem('currentTab') || 'home';
  showTab(tabToShow);
}


// Handle login
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    showAlert('Please enter both email and password', 'error');
    return;
  }

  currentUser = {
    name: email.split('@')[0],
    email: email,
    avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=10b981&color=fff`
  };

  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  localStorage.setItem('userHistory', JSON.stringify(userHistory));

  // Pass true to indicate first time login
  showApp(true);
}

// Handle signup
function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  if (!name || !email || !password || !confirm) {
    showAlert('Please fill all fields', 'error');
    return;
  }

  if (password !== confirm) {
    showAlert('Passwords do not match', 'error');
    return;
  }

  if (password.length < 6) {
    showAlert('Password must be at least 6 characters', 'error');
    return;
  }

  currentUser = {
    name: name,
    email: email,
    avatar: `https://ui-avatars.com/api/?name=${name}&background=10b981&color=fff`
  };

  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  localStorage.setItem('userHistory', JSON.stringify(userHistory));

  // Pass true to indicate first time signup
  showApp(true);
}

// Show alert message
function showAlert(message, type) {
  const alertBox = document.createElement('div');
  alertBox.className = `alert-box ${type}`;
  alertBox.textContent = message;
  
  document.body.appendChild(alertBox);
  
  setTimeout(() => {
    alertBox.classList.add('fade-out');
    setTimeout(() => {
      alertBox.remove();
    }, 500);
  }, 3000);
}

// Handle logout
function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentTab'); // <-- clear saved tab
  showAuth();
  showAlert('Logged out successfully', 'success');
}


// Update profile info
function updateProfile() {
  if (!currentUser) return;

  profileName.textContent = currentUser.name;
  profileEmail.textContent = currentUser.email;
  if (profileAvatar) {
    profileAvatar.src = currentUser.avatar;
  }

  // Update stats
  analysisCount.textContent = userHistory.length;
  conditionsCount.textContent = [...new Set(userHistory.flatMap(item => item.conditions))].length;

  // Update history
  updateHistoryList();
}

// Update history list
function updateHistoryList() {
  const historyContainer = document.querySelector('.history-timeline');
  if (!historyContainer) return;

  if (userHistory.length === 0) {
    historyContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-history"></i>
        </div>
        <p class="empty-text">No analysis history yet</p>
      </div>
    `;
    return;
  }

  historyContainer.innerHTML = userHistory.slice(0, 5).map(item => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">${formatDate(item.date)}</div>
        <div class="timeline-desc">Analysis for ${item.conditions.join(', ')}</div>
        <div class="timeline-status completed">Completed</div>
      </div>
    </div>
  `).join('');

  // Add view all button if more than 5 items
  if (userHistory.length > 5) {
    const viewAll = document.createElement('div');
    viewAll.className = 'empty-state';
    viewAll.innerHTML = `
      <button class="empty-action" id="view-all-history">View All History</button>
    `;
    historyContainer.appendChild(viewAll);
    
    document.getElementById('view-all-history').addEventListener('click', () => {
      showTab('profile');
    });
  }
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Handle search input
function handleSearchInput(e) {
  const searchTerm = e.target.value.trim().toLowerCase();
  
  if (searchTerm.length > 1) {
    const filtered = diseases.filter(disease => 
      disease.toLowerCase().includes(searchTerm) &&
      !selectedDiseases.includes(disease)
    ).slice(0, 10);
    
    showSuggestions(filtered);
  } else {
    hideSuggestions();
  }
}

// Show suggestions
function showSuggestions(suggestions) {
  suggestionsList.innerHTML = '';
  
  if (suggestions.length > 0) {
    suggestions.forEach(disease => {
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.textContent = disease;
      suggestionsList.appendChild(li);
    });
    suggestionsList.style.display = 'block';
  } else {
    hideSuggestions();
  }
}

// Hide suggestions
function hideSuggestions() {
  suggestionsList.style.display = 'none';
}

// Handle suggestion click
function handleSuggestionClick(e) {
  if (e.target.classList.contains('suggestion-item')) {
    const disease = e.target.textContent;
    addDisease(disease);
    searchInput.value = '';
    hideSuggestions();
  }
}

// Add disease to selected list
function addDisease(disease) {
  if (!selectedDiseases.includes(disease)) {
    selectedDiseases.push(disease);
    renderDiseaseChips();
    toggleSelectedDiseasesSection();
  }
}

// Remove disease from selected list
function removeDisease(diseaseToRemove) {
  selectedDiseases = selectedDiseases.filter(disease => disease !== diseaseToRemove);
  renderDiseaseChips();
  toggleSelectedDiseasesSection();
}

// Render disease chips
function renderDiseaseChips() {
  diseaseChipsContainer.innerHTML = '';
  
  selectedDiseases.forEach(disease => {
    const chip = document.createElement('span');
    chip.className = 'disease-chip';
    chip.innerHTML = `
      ${disease}
      <button class="remove-chip-button">
        <i class="fas fa-times remove-chip-icon"></i>
      </button>
    `;
    
    const removeButton = chip.querySelector('.remove-chip-button');
    removeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      removeDisease(disease);
    });
    
    diseaseChipsContainer.appendChild(chip);
  });
}

// Toggle selected diseases section visibility
function toggleSelectedDiseasesSection() {
  const section = document.querySelector('.selected-diseases-section');
  if (!section) return;
  
  if (selectedDiseases.length > 0) {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
}

// Handle image change
function handleImageChange(e) {
  const file = e.target.files[0];
  if (file && file.type.match('image.*')) {
    if (file.size > 5 * 1024 * 1024) {
      showAlert('Image size should be less than 5MB', 'error');
      return;
    }
    
    image = file;
    showImagePreview(image);
  } else {
    image = null;
    hideImagePreview();
  }
}

// Show image preview
function showImagePreview(imageFile) {
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadArea.innerHTML = `
      <div class="image-preview-container">
        <img src="${e.target.result}" alt="Preview" class="image-preview">
        <button class="remove-image-button">
          <i class="fas fa-times remove-image-icon"></i>
        </button>
      </div>
    `;
    
    const removeButton = uploadArea.querySelector('.remove-image-button');
    removeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      image = null;
      fileInput.value = '';
      hideImagePreview();
    });
  };
  reader.readAsDataURL(imageFile);
}

// Hide image preview
function hideImagePreview() {
  uploadArea.innerHTML = `
    <div class="upload-content">
      <i class="fas fa-upload upload-icon"></i>
      <p class="upload-text">Click to upload or drag and drop</p>
      <p class="upload-subtext">PNG, JPG up to 5MB</p>
    </div>
  `;
}
async function apis() {
  // Determine API base URL based on environment
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const API_BASE_URL = isDevelopment 
    ? 'http://localhost:8000' 
    : 'https://your-render-service-name.onrender.com';

  const formData = new FormData();
  formData.append('image', image);
  
  try {
    // 1. Upload image to backend
    const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.status}`);
    }

    const uploadData = await uploadResponse.json();
    const imageUrl = uploadData.imageUrl;
    
    // 2. Extract text from image
    let extractedText;
    try {
      extractedText = await puter.ai.img2txt(imageUrl);
      if (!extractedText || extractedText.trim() === "") {
        throw new Error('No text detected in the image');
      }
      console.log('Extracted Text:', extractedText);   
    } catch (textError) {
      console.error("Text extraction error:", textError);
      showResults({ 
        status: 'error', 
        message: 'Failed to extract text from image. Please ensure the image is clear and contains readable text.'
      });
      return;
    }

    // 3. Analyze ingredients with Gemini API
    const GEMINI_API_KEY = "AIzaSyASew-7kpDXeKmtzZyLaQyhHMnRvyqQxgI"; 
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const ingredientsPrompt = `${extractedText}\n\nList out the ingredient names and nutrition information in the text above.`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: ingredientsPrompt }] }]
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error("Gemini API Error:", errorData);
      throw new Error('Failed to analyze ingredients');
    }

    const geminiData = await geminiResponse.json();
    const ingredientsAnalysis = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!ingredientsAnalysis) {
      throw new Error('No ingredient data returned');
    }

    // 4. Get health recommendations
    const format = `{
      "summary": "Brief 1-2 line product health overview",
      "rating": "Good | Moderate | Poor",
      "scoreOutOf10": 0-10,
      "verdict": "Should someone eat this? Why?",
      "recommendedFor": ["Diseases where it's okay"],
      "notRecommendedFor": ["Diseases where it's harmful"],
      "ingredientConcerns": [
        { "ingredient": "Name", "concern": "Whether it's bad or good and why" }
      ],
      "nutritionWarnings": ["List of nutrition issues"],
      "suggestedAlternatives": ["Healthier product ideas"]
    }`;
    
    const healthPrompt = `
      You are a health AI. Analyze this product for someone with: ${selectedDiseases.join(', ')}
      Ingredients & Nutrition: ${ingredientsAnalysis}
      Return JSON in this format: ${format}
      Be concise and accurate in your analysis.
    `;

    const healthResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: healthPrompt }] }]
      })
    });

    if (!healthResponse.ok) {
      const errorData = await healthResponse.json();
      console.error("Gemini API Error:", errorData);
      throw new Error('Failed to get health recommendations');
    }

    const healthData = await healthResponse.json();
    const healthAnalysis = healthData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!healthAnalysis) {
      throw new Error('No health recommendations returned');
    }
    
    // 5. Parse and display results
    try {
      const jsonMatch = healthAnalysis.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : healthAnalysis;
      const analysisResult = JSON.parse(jsonStr);
      
      // Add to user history
      const analysisRecord = {
        date: new Date().toISOString(),
        conditions: [...selectedDiseases],
        result: analysisResult
      };
      userHistory.unshift(analysisRecord);
      localStorage.setItem('userHistory', JSON.stringify(userHistory));
      
      showResults({ 
        status: 'success', 
        analysisData: analysisResult 
      });
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      showResults({ 
        status: 'partial', 
        message: 'Showing raw analysis data',
        rawData: healthAnalysis 
      });
    }

  } catch (error) {
    console.error("API Error:", error);
    showResults({ 
      status: 'error', 
      message: error.message || 'An error occurred during analysis'
    });
  }
}


// Handle form submission
async function handleSubmit() {
  if (selectedDiseases.length === 0 && !image) {
    alert('Please select at least one disease or upload an image');
    return;
  }

  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = `<span class="spinner"></span> Analyzing... `;

  // Call the API to analyze the image
  try {
    await apis();
    // The apis() function now needs to return the result or update a global variable
  } catch (error) {
    console.error("Error during analysis:", error);
    alert("An error occurred during analysis. Please try again.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Get Recommendations';
  }
}

// Show results
function showResults(result) {
  // Show results card
  resultsCard.style.display = 'block';
  
  // Hide tips section
  document.querySelector('.tips-section').style.display = 'none';
  
  // Handle error states
  if (result.status === 'error') {
    recommendationsList.innerHTML = `<li class="error-message">${result.message}</li>`;
    warningsSection.style.display = 'none';
    return;
  }
  
  // Handle raw data if JSON parsing failed
  if (result.status === 'partial') {
    recommendationsList.innerHTML = `<li class="warning-message">${result.message}</li>
      <li class="raw-data">${result.rawData}</li>`;
    warningsSection.style.display = 'none';
    return;
  }
  
  // We have successfully parsed analysis data
  const analysisData = result.analysisData;
  
  // Create a header section for the summary and rating
  const headerSection = document.createElement('div');
  headerSection.className = 'analysis-header';
  headerSection.innerHTML = `
    <div class="summary-container">
      <h4 class="summary-title">Summary:</h4>
      <p class="summary-text">${analysisData.summary}</p>
    </div>
    <div class="rating-container">
      <div class="rating ${analysisData.rating.toLowerCase()}-rating">
        <span class="rating-label">${analysisData.rating}</span>
        <span class="rating-score">${analysisData.scoreOutOf10}/10</span>
      </div>
    </div>
  `;
  
  // Insert the header section at the beginning of the results card
  resultsCard.insertBefore(headerSection, resultsCard.firstChild);
  
  // Add the verdict section
  const verdictSection = document.createElement('div');
  verdictSection.className = 'verdict-section';
  verdictSection.innerHTML = `
    <h4 class="section-title">Verdict:</h4>
    <p class="verdict-text">${analysisData.verdict}</p>
  `;
  resultsCard.insertBefore(verdictSection, document.querySelector('.recommendations-section'));
  
  // Show recommendations (from suggestedAlternatives)
  recommendationsList.innerHTML = '';
  if (analysisData.suggestedAlternatives && analysisData.suggestedAlternatives.length > 0) {
    analysisData.suggestedAlternatives.forEach(item => {
      const li = document.createElement('li');
      li.className = 'recommendation-item';
      li.innerHTML = `
        <div class="recommendation-icon">✓</div>
        <span>${item}</span>
      `;
      recommendationsList.appendChild(li);
    });
  } else {
    recommendationsList.innerHTML = '<li class="recommendation-item"><span>No specific alternatives recommended</span></li>';
  }
  
  // Show warnings (from nutritionWarnings)
  warningsList.innerHTML = '';
if (analysisData.nutritionWarnings && analysisData.nutritionWarnings.length > 0) {
  warningsSection.style.display = 'block';
  analysisData.nutritionWarnings.forEach(warning => {
    const li = document.createElement('li');
    li.className = 'warning-item';
    li.innerHTML = `
      <div class="warning-icon">✗</div>
      <div class="warning-text">${warning}</div>
    `;
    warningsList.appendChild(li);
  });
} else {
  warningsSection.style.display = 'none';
}
  
  // Add ingredient concerns section
  if (analysisData.ingredientConcerns && analysisData.ingredientConcerns.length > 0) {
  const concernsSection = document.createElement('div');
  concernsSection.className = 'concerns-section';
  concernsSection.innerHTML = `<h4 class="section-title">Ingredient Concerns:</h4>`;

  const concernsList = document.createElement('ul');
  concernsList.className = 'concerns-list';

  analysisData.ingredientConcerns.forEach(concern => {
    const li = document.createElement('li');
    li.className = 'concern-item';

    // Adjusted HTML structure for better line-by-line formatting
    li.innerHTML = `
      <div class="concern-icon">!</div>
      <div class="concern-text">
        <strong>${concern.ingredient}:</strong> <span class="concern-description">${concern.concern}</span>
      </div>`;
    
    concernsList.appendChild(li);
  });

  concernsSection.appendChild(concernsList);
  resultsCard.appendChild(concernsSection);
}

  
  
  // Add disease compatibility section
  const compatibilitySection = document.createElement('div');
  compatibilitySection.className = 'compatibility-section';
  compatibilitySection.innerHTML = `
    <h4 class="section-title">Disease Compatibility:</h4>
    <div class="compatibility-container">
      <div class="good-for">
        <h5>Recommended for:</h5>
        <ul class="compatibility-list recommended-list">
          ${analysisData.recommendedFor.length > 0 ? 
            analysisData.recommendedFor.map(disease => `<li>${disease}</li>`).join('') : 
            '<li>Not specifically recommended for any conditions</li>'}
        </ul>
      </div>
      <div class="bad-for">
        <h5>Not recommended for:</h5>
        <ul class="compatibility-list not-recommended-list">
          ${analysisData.notRecommendedFor.length > 0 ? 
            analysisData.notRecommendedFor.map(disease => `<li>${disease}</li>`).join('') : 
            '<li>No specific contraindications</li>'}
        </ul>
      </div>
    </div>
  `;
  resultsCard.appendChild(compatibilitySection);
}

// Get random recommendations for tips
function getRandomRecommendations() {
  const randomIndexes = [];
  while (randomIndexes.length < 3) {
    const r = Math.floor(Math.random() * recommendations.general.length);
    if (!randomIndexes.includes(r)) randomIndexes.push(r);
  }
  return randomIndexes.map(i => recommendations.general[i]);
}

// Show tips
function showTips() {
  tipsGrid.innerHTML = '';
  const tips = getRandomRecommendations();
  
  tips.forEach((tip, index) => {
    const tipCard = document.createElement('div');
    tipCard.className = 'tip-card';
    tipCard.innerHTML = `
      <div class="tip-number">${index + 1}</div>
      <p class="tip-text">${tip}</p>
    `;
    tipsGrid.appendChild(tipCard);
  });
}

// Show tab
function showTab(tabId) {
  // Save the current tab to localStorage
  localStorage.setItem('currentTab', tabId);

  // Rest of your existing showTab implementation...
  tabContents.forEach(tab => tab.classList.remove('active'));
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) selectedTab.classList.add('active');
  
  navButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.tab === tabId);
  });

  if (mainNav.classList.contains('open')) toggleMobileMenu();

  if (tabId === 'home') {
    showTips();
    document.querySelector('.tips-section').style.display = 'block';
    resultsCard.style.display = 'none';
  }

  if (tabId === 'profile') updateProfile();
}

// Toggle mobile menu
function toggleMobileMenu() {
  mainNav.classList.toggle('open');
  const menuIcon = mobileMenuButton.querySelector('.menu-icon');
  menuIcon.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);


