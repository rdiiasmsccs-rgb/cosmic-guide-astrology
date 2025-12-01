// Navigation
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetPage = btn.dataset.page;
    
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(`${targetPage}-page`).classList.add('active');
  });
});

// Horoscope Data
const horoscopes = {
  aries: "Today brings dynamic energy your way. Mars empowers your ambitions while the Moon enhances your intuition. Focus on personal goals and trust your instincts. A surprise opportunity may arise in the afternoon.",
  taurus: "Venus blesses you with harmony and beauty today. Financial matters look promising. Take time to appreciate the simple pleasures. Your patience will be rewarded, especially in relationships.",
  gemini: "Mercury sharpens your communication skills today. It's an excellent time for networking and sharing ideas. Your curiosity leads to interesting discoveries. Stay flexible with your plans.",
  cancer: "The Moon illuminates your emotional landscape. Trust your feelings and nurture important relationships. Home and family matters take priority. Your intuition is especially strong now.",
  leo: "The Sun radiates confidence through you today. Your natural leadership shines in group settings. Creative projects flourish. Romance and self-expression are highlighted.",
  virgo: "Mercury brings clarity to your analytical mind. Organization and attention to detail serve you well. Health and wellness routines show positive results. Help others with your practical wisdom.",
  libra: "Venus enhances your charm and diplomatic skills. Relationships deepen through honest communication. Balance is key in all areas. Artistic pursuits bring joy and fulfillment.",
  scorpio: "Pluto intensifies your transformative power today. Deep insights emerge from introspection. Trust your instincts in financial matters. Emotional healing is possible through vulnerability.",
  sagittarius: "Jupiter expands your horizons and optimism. Adventure calls, whether physical or intellectual. Your enthusiasm inspires others. Learning opportunities abound.",
  capricorn: "Saturn rewards your discipline and hard work. Career matters progress steadily. Your practical approach solves complex problems. Long-term planning pays off.",
  aquarius: "Uranus brings innovative ideas and unexpected connections. Your unique perspective is valued. Community involvement feels rewarding. Embrace change and originality.",
  pisces: "Neptune heightens your intuition and creativity. Spiritual practices bring peace and clarity. Compassion for others comes naturally. Trust your dreams and visions."
};

// Load saved zodiac sign
let userZodiac = localStorage.getItem('userZodiac') || 'aries';
let userBirthData = JSON.parse(localStorage.getItem('birthData') || '{}');

document.getElementById('zodiac-select').value = userZodiac;

function updateHoroscope() {
  const zodiac = document.getElementById('zodiac-select').value;
  userZodiac = zodiac;
  localStorage.setItem('userZodiac', zodiac);
  
  const content = document.getElementById('horoscope-content');
  content.innerHTML = `<p>${horoscopes[zodiac]}</p>`;
  
  updatePrediction();
}

function updatePrediction() {
  const predictions = [
    "The planetary alignment suggests a period of personal growth and self-discovery.",
    "Your ruling planet's current position indicates favorable outcomes in creative endeavors.",
    "Transit energies support relationship development and emotional connections.",
    "Financial opportunities may present themselves through unexpected channels.",
    "Your intuition is heightened - trust your inner guidance in decision-making."
  ];
  
  const content = document.getElementById('prediction-content');
  const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
  content.innerHTML = `<p>${randomPrediction}</p>`;
}

document.getElementById('zodiac-select').addEventListener('change', updateHoroscope);

// Birth Chart
document.getElementById('birth-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const date = document.getElementById('birth-date').value;
  const time = document.getElementById('birth-time').value;
  const location = document.getElementById('birth-location').value;
  
  userBirthData = { date, time, location };
  localStorage.setItem('birthData', JSON.stringify(userBirthData));
  
  generateBirthChart(date, time, location);
});

function generateBirthChart(date, time, location) {
  const birthDate = new Date(date + 'T' + time);
  const zodiacSign = calculateZodiacSign(birthDate);
  const ascendant = calculateAscendant(birthDate, time);
  const moonSign = calculateMoonSign(birthDate);
  
  const chartDetails = document.getElementById('chart-details');
  const chartResult = document.getElementById('chart-result');
  
  chartDetails.innerHTML = `
    <div class="chart-item">
      <h3>☀️ Sun Sign</h3>
      <p><strong>${zodiacSign}</strong> - Your core identity and life purpose. This represents your conscious self and ego.</p>
    </div>
    <div class="chart-item">
      <h3>🌙 Moon Sign</h3>
      <p><strong>${moonSign}</strong> - Your emotional nature and inner world. This governs your feelings and instincts.</p>
    </div>
    <div class="chart-item">
      <h3>⬆️ Rising Sign (Ascendant)</h3>
      <p><strong>${ascendant}</strong> - Your outer personality and how others perceive you. This is your social mask.</p>
    </div>
    <div class="chart-item">
      <h3>📍 Birth Details</h3>
      <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}<br>
      <strong>Time:</strong> ${time}<br>
      <strong>Location:</strong> ${location}</p>
    </div>
    <div class="chart-item">
      <h3>🎯 Life Path Insights</h3>
      <p>Your ${zodiacSign} Sun combined with ${moonSign} Moon creates a unique blend of conscious drive and emotional depth. Your ${ascendant} Rising influences how you approach new situations and first impressions.</p>
    </div>
  `;
  
  chartResult.style.display = 'block';
  chartResult.scrollIntoView({ behavior: 'smooth' });
}

// Planetary Positions
function updatePlanets() {
  const now = new Date();
  const planets = calculatePlanetaryPositions(now);
  
  const planetsContent = document.getElementById('planets-content');
  planetsContent.innerHTML = planets.map(planet => `
    <div class="planet-item">
      <h3>${planet.symbol} ${planet.name}</h3>
      <p><strong>Position:</strong> ${planet.position}° ${planet.sign}</p>
      <p>${planet.meaning}</p>
    </div>
  `).join('');
  
  updateTransitImpact(planets);
}

function updateTransitImpact(planets) {
  const transitContent = document.getElementById('transit-impact');
  
  if (!userBirthData.date) {
    transitContent.innerHTML = '<p>Enter your birth details in the Birth Chart section to see personalized transit impacts.</p>';
    return;
  }
  
  transitContent.innerHTML = `
    <div class="planet-item">
      <h3>Current Transits Affecting You</h3>
      <p>Based on your birth chart, current planetary movements are influencing your ${userZodiac} energy. The Moon's position enhances your emotional awareness, while Mercury's transit supports clear communication.</p>
    </div>
    <div class="planet-item">
      <h3>Key Transit Alert</h3>
      <p>Pay attention to ${planets[0].name}'s movement through ${planets[0].sign}. This transit may bring opportunities for growth in areas related to your personal goals and self-expression.</p>
    </div>
  `;
}

// Moon Phases
function updateMoonPhase() {
  const now = new Date();
  const moonData = calculateMoonPhase(now);
  
  const moonPhaseDiv = document.getElementById('moon-phase');
  moonPhaseDiv.innerHTML = `
    <div class="moon-icon">${moonData.icon}</div>
    <div class="moon-info">
      <h3>${moonData.phase}</h3>
      <p><strong>Illumination:</strong> ${moonData.illumination}%</p>
      <p><strong>Sign:</strong> ${moonData.sign}</p>
      <p class="moon-meaning">${moonData.meaning}</p>
    </div>
  `;
  
  updateMoonCalendar();
}

function updateMoonCalendar() {
  const calendar = document.getElementById('moon-calendar');
  const days = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const moonData = calculateMoonPhase(date);
    
    days.push(`
      <div class="moon-day">
        <div>
          <strong>${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</strong>
          <p style="color: var(--text-dim); font-size: 0.9rem;">${moonData.phase}</p>
        </div>
        <div style="font-size: 2rem;">${moonData.icon}</div>
      </div>
    `);
  }
  
  calendar.innerHTML = days.join('');
}

// Initialize
updateHoroscope();
updatePlanets();
updateMoonPhase();

// Load saved birth chart if exists
if (userBirthData.date) {
  document.getElementById('birth-date').value = userBirthData.date;
  document.getElementById('birth-time').value = userBirthData.time;
  document.getElementById('birth-location').value = userBirthData.location;
  generateBirthChart(userBirthData.date, userBirthData.time, userBirthData.location);
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}