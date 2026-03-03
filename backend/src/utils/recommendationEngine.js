const THRESHOLDS = {
  HIGH_SUGAR: 20,
  HIGH_SODIUM: 700,
  HIGH_FAT: 20,
};

const buildRecommendations = (menuItems, profile) => {
  const allergyTokens = (profile.allergies || '')
    .toLowerCase()
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const recommended = [];
  const avoid = [];

  menuItems.forEach((item) => {
    const reasons = [];

    if (profile.diabetes && item.sugar > THRESHOLDS.HIGH_SUGAR) {
      reasons.push('High sugar (not ideal for diabetes)');
    }

    if (profile.highBloodPressure && item.sodium > THRESHOLDS.HIGH_SODIUM) {
      reasons.push('High sodium (not ideal for high blood pressure)');
    }

    if (
      profile.highCholesterol &&
      (item.fat > THRESHOLDS.HIGH_FAT || item.fried)
    ) {
      reasons.push('High fat/fried (not ideal for high cholesterol)');
    }

    if (
      allergyTokens.length > 0 &&
      item.ingredients.some((ingredient) =>
        allergyTokens.includes(ingredient.toLowerCase())
      )
    ) {
      reasons.push('Contains allergy ingredient');
    }

    if (reasons.length > 0) {
      avoid.push({ ...item, reasons });
    } else {
      recommended.push(item);
    }
  });

  const explanation =
    recommended.length > 0
      ? 'These recommendations are filtered using your health profile and allergy inputs.'
      : 'All items were filtered out. Consider adjusting your profile constraints or explore healthier alternatives.';

  return { recommended, avoid, explanation };
};

module.exports = { buildRecommendations, THRESHOLDS };
