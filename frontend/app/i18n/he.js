// frontend/app/i18n/he.js
export default {
  // --- Home Page ---
  home: {
    greeting: "שלום! אני דניאל,",
    roles: ["אוסטאופת מקצועי", "מומחה בריאות"],
    description: "לורם איפסום דולור סיט אמט קונסקטetur אדיפיסינג אליט.",
    bookNow: "הזמן עכשיו",
  },

  // --- About Page ---
  about: {
    title: "עליי",
    name: { first: "דניאל", last: "סאלם" },
    description:
      "לורם איפסום דולור סיט אמט, קונסקטetur אדיפיסינג אליט. הטקסט הזה מתאר אותי ואת השירותים שלי.",
    stats: {
      yearsExperience: "שנות ניסיון",
      clients: "לקוחות",
    },
    testimonials: [
      { message: "שירות מצוין!", name: "ג'ון דו" },
      { message: "עבודה מקצועית!", name: "שרה לי" },
    ],
    journeyTitle: {
      normal: " השכלה",
      accent: "וניסיון",
    },
    journey: [
      {
        years: "2025 - היום",
        role: "מהנדס תוכנה",
        institution: "Tech Inc",
      },
      {
        years: "2020 - 2025",
        role: "מהנדס תוכנה",
        institution: "Tech Inc",
      },
      {
        years: "2015 - 2020",
        role: "מהנדס תוכנה",
        institution: "Tech Inc",
      },
      {
        years: "2010 - 2015",
        role: "מהנדס תוכנה",
        institution: "Tech Inc",
      },
    ],
  },

  // --- Services Page ---
  services: {
    title: {
      normal: "טיפול",
      accent: "אוסטאופתי מותאם אישית",
      rest: "לגוף שלך",
    },
    list: [
      {
        id: "massage",
        icon: "/assets/services/massage.svg",
        title: "עיסוי טיפולי",
        description:
          "עיסוי טיפולי עמוק לשחרור מתחים, שיפור זרימת הדם והפחתת כאבים.",
      },
      {
        id: "stretching",
        icon: "/assets/services/stretching.svg",
        title: "טיפול במתיחות",
        description: "מפגשי מתיחות מודרכים לשיפור הגמישות ומניעת פציעות.",
      },
      {
        id: "activity",
        icon: "/assets/services/activity.svg",
        title: "פעילות גופנית",
        description: "תוכניות פעילות גופנית מותאמות אישית לשיפור כוח וניידות.",
      },
      {
        id: "osteopathy",
        icon: "/assets/services/bone.svg",
        title: "טיפול אוסטאופתי",
        description:
          "גישה הוליסטית המתמקדת במפרקים, שרירים ואיזון מערכת העצבים.",
      },
    ],
  },

  // --- Gallery Page ---
  gallery: {
    title: {
      accent: "בקרוב",
      rest: "",
    },
    description: "אנחנו עובדים כרגע על החלק הזה כדי להביא לכם משהו מעולה.",
  },

  // --- Contact Page ---
  contact: {
    title: {
      normal: "צור",
      accent: "קשר",
    },
    description: "לורם איפסום דולור סיט אמט קונסקטורר אדיפיסינג אליט.",
    fields: {
      firstname: "שם פרטי",
      lastname: "שם משפחה",
      email: "אימייל",
      service: "אני מתעניין ב־",
      servicePlaceholder: "בחר שירות",
      message: "הודעה",
    },
    sendBtn: "שלח הודעה",
  },

  auth: {
    // --- Login ---
    login: {
      title: "ברוך הבא",
      description: "אנא התחבר לחשבונך",
      email: "דואר אלקטרוני",
      password: "סיסמה",
      loginBtn: "התחבר",
      loggingIn: "מתחבר...",
      forgotPasswordText: "שכחת סיסמה?",
      forgotPasswordLink: "אפס כאן",
      signupText: "אין לך חשבון?",
      signupLink: "הרשם",
    },

    // --- SignUp ---
    signup: {
      title: "צור חשבון",
      description: "אנא מלא את הפרטים שלך כדי להירשם",
      firstname: "שם פרטי",
      lastname: "שם משפחה",
      email: "דואר אלקטרוני",
      phone: "מספר טלפון",
      password: "סיסמה",
      confirmPassword: "אשר סיסמה",
      signUpBtn: "הרשם",
      loginText: "כבר יש לך חשבון?",
      loginLink: "התחבר",
    },

    // --- Dashboard Page ---
    dashboard: {
      title: "לוח בקרה",
      treatmentHistory: {
        title: "היסטוריית טיפולים",
        noTreatments: "לא נמצאו טיפולים.",
        error: "שגיאה בטעינת הטיפולים",
      },
      booking: {
        title: "הזמן טיפול",
        servicePlaceholder: "בחר שירות",
        datePlaceholder: "בחר תאריך",
        timePlaceholder: "בחר שעה",
        bookBtn: "הזמן",
        fillAllFieldsError: "אנא מלא את כל השדות",
        successMessage: "הזמנה נוצרה בהצלחה!",
      },
      modals: {
        deleteBooking: {
          title: "מחיקת הזמנה",
          message: "האם אתה בטוח שברצונך למחוק הזמנה זו?",
          cancelBtn: "ביטול",
          confirmBtn: "מחק",
        },
        bookingSuccess: {
          message: "ההזמנה שלך בוצעה בהצלחה!",
          closeBtn: "סגור",
        },
      },
    },

    // --- Forgot Password ---
    forgotPassword: {
      title: "שכחת סיסמה",
      description: "הזן את הדואר האלקטרוני שלך ונשלח לך קישור לאיפוס הסיסמה.",
      email: "דואר אלקטרוני",
      sendBtn: "שלח קישור לאיפוס",
      sending: "שולח...",
      backToLogin: "חזרה להתחברות",
    },
  },

  // --- Forgot Password (Standalone Page) ---
  forgotPassword: {
    title: "שכחת סיסמה",
    description: "הזן את הדואר האלקטרוני שלך ונשלח לך קישור לאיפוס הסיסמה.",
    emailLabel: "דואר אלקטרוני",
    emailPlaceholder: "youremail@gmail.com",
    emailError: "כתובת המייל לא יכולה להכיל רווחים",
    serverError: "משהו השתבש. אנא נסה שוב מאוחר יותר.",
    successMessage: "אם המייל קיים, נשלח קישור לאיפוס הסיסמה.",
    sendBtn: "שלח קישור לאיפוס",
    sendingBtn: "שולח...",
    backToLogin: "חזרה להתחברות",
  },

  // --- Navbar ---
  nav: {
    home: "בית",
    about: "עליי",
    services: "שירותים",
    gallery: "גלריה",
    contact: "צור קשר",
  },
};
