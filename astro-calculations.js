// Zodiac calculation
function calculateZodiacSign(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '♈ Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '♉ Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return '♊ Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return '♋ Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '♌ Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '♍ Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return '♎ Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return '♏ Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return '♐ Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return '♑ Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '♒ Aquarius';
  return '♓ Pisces';
}

// Ascendant calculation (simplified)
function calculateAscendant(date, time) {
  const hour = parseInt(time.split(':')[0]);
  const signs = ['♈ Aries', '♉ Taurus', '♊ Gemini', '♋ Cancer', '♌ Leo', '♍ Virgo', 
                 '♎ Libra', '♏ Scorpio', '♐ Sagittarius', '♑ Capricorn', '♒ Aquarius', '♓ Pisces'];
  return signs[hour % 12];
}

// Moon sign calculation (simplified)
function calculateMoonSign(date) {
  const signs = ['♈ Aries', '♉ Taurus', '♊ Gemini', '♋ Cancer', '♌ Leo', '♍ Virgo', 
                 '♎ Libra', '♏ Scorpio', '♐ Sagittarius', '♑ Capricorn', '♒ Aquarius', '♓ Pisces'];
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  return signs[Math.floor((dayOfYear / 30.5) % 12)];
}

// Planetary positions (simplified)
function calculatePlanetaryPositions(date) {
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  
  return [
    {
      name: 'Sun',
      symbol: '☀️',
      position: Math.floor((dayOfYear * 0.986) % 360),
      sign: signs[Math.floor((dayOfYear / 30.5) % 12)],
      meaning: 'Represents your core identity, ego, and life force. Current position influences your self-expression and vitality.'
    },
    {
      name: 'Moon',
      symbol: '🌙',
      position: Math.floor((dayOfYear * 13.176) % 360),
      sign: signs[Math.floor((dayOfYear * 13.176 / 30) % 12)],
      meaning: 'Governs emotions, instincts, and subconscious. This position affects your mood and emotional responses.'
    },
    {
      name: 'Mercury',
      symbol: '☿',
      position: Math.floor((dayOfYear * 1.59) % 360),
      sign: signs[Math.floor((dayOfYear * 1.59 / 30) % 12)],
      meaning: 'Rules communication, thinking, and learning. Influences how you process and share information.'
    },
    {
      name: 'Venus',
      symbol: '♀',
      position: Math.floor((dayOfYear * 1.62) % 360),
      sign: signs[Math.floor((dayOfYear * 1.62 / 30) % 12)],
      meaning: 'Governs love, beauty, and values. Affects relationships, aesthetics, and what you find pleasurable.'
    },
    {
      name: 'Mars',
      symbol: '♂',
      position: Math.floor((dayOfYear * 0.524) % 360),
      sign: signs[Math.floor((dayOfYear * 0.524 / 30) % 12)],
      meaning: 'Rules action, desire, and energy. Influences your drive, passion, and how you assert yourself.'
    },
    {
      name: 'Jupiter',
      symbol: '♃',
      position: Math.floor((dayOfYear * 0.083) % 360),
      sign: signs[Math.floor((dayOfYear * 0.083 / 30) % 12)],
      meaning: 'Represents expansion, growth, and wisdom. Brings opportunities for learning and abundance.'
    }
  ];
}

// Moon phase calculation
function calculateMoonPhase(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let c = 0, e = 0, jd = 0, b = 0;
  
  if (month < 3) {
    year--;
    month += 12;
  }
  
  ++month;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  b = parseInt(jd);
  jd -= b;
  b = Math.round(jd * 8);
  
  const phases = [
    { name: 'New Moon', icon: '🌑', meaning: 'Time for new beginnings and setting intentions. Plant seeds for future growth.' },
    { name: 'Waxing Crescent', icon: '🌒', meaning: 'Energy builds. Take action on your intentions and stay committed to your goals.' },
    { name: 'First Quarter', icon: '🌓', meaning: 'Overcome challenges. Make decisions and push through obstacles with determination.' },
    { name: 'Waxing Gibbous', icon: '🌔', meaning: 'Refine and adjust. Perfect your plans and prepare for culmination.' },
    { name: 'Full Moon', icon: '🌕', meaning: 'Peak energy and illumination. Celebrate achievements and release what no longer serves you.' },
    { name: 'Waning Gibbous', icon: '🌖', meaning: 'Share wisdom. Reflect on lessons learned and express gratitude.' },
    { name: 'Last Quarter', icon: '🌗', meaning: 'Let go and forgive. Release old patterns and make space for renewal.' },
    { name: 'Waning Crescent', icon: '🌘', meaning: 'Rest and restore. Surrender to the cycle and prepare for rebirth.' }
  ];
  
  const phase = phases[b % 8];
  const illumination = Math.round(jd * 100);
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const moonSign = signs[Math.floor((date.getDate() + date.getMonth() * 2.5) % 12)];
  
  return {
    ...phase,
    illumination,
    sign: moonSign
  };
}