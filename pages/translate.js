const translations ={
  "priceMessage": "Price: {{price}}",
  "caloriesMessage": "Calories: {{calories}}",
  "unableToOrder": "Sorry, we are currently unable to process your order.",
  "exclusiveRewards": "Exclusive Rewards",
  "justForYou": "Just For You",
  "noAnnouncements": "There are no announcements at the moment.",
  "chooseButton": "Choose",
  "priceMessage": "Price: {{price}}",
  "caloriesMessage": "Calories: {{calories}}",
  "descriptionMessage": "Description: {{description}}",
  "orderButton": "Order",
  "orderFailed": "Order Failed",
  "loading": "Loading...",
  "error": "Error:",
  "loading": "Loading...",
  "videoerror": "Error loading video. Please try again later.",
  "videoTagNotSupported": "Your browser does not support the video tag."
}


export default function translate(key, replacements = {}) {
  let translation = translations[key] || '';

  // Replace placeholders like {{price}} with values from `replacements`
  for (const [placeholder, value] of Object.entries(replacements)) {
    const pattern = `{{${placeholder}}}`;
    translation = translation.replace(new RegExp(pattern, 'g'), value);
  }

  return translation;
}
