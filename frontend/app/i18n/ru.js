// export default {
//   // --- Home Page ---
//   home: {
//     greeting: "Привет! Я Даниэль,",
//     roles: ["Профессионал", "Остеопат"],
//     description: "Лорем ипсум долор сит амет, консектетур адиписицинг элит.",
//     bookNow: "Забронировать сейчас",
//   },

//   // --- About Page ---
//   about: {
//     title: "Обо мне",
//     name: { first: "Даниэль", last: "Салем" },
//     description:
//       "Лорем ипсум долор сит амет, консектетур адиписицинг элит. Этот текст описывает меня и мои услуги.",
//     stats: {
//       yearsExperience: "Лет опыта",
//       clients: "Клиенты",
//     },
//     testimonials: [
//       { message: "Отличный сервис!", name: "Джон Доу" },
//       { message: "Профессиональная работа!", name: "Сара Ли" },
//     ],
//     journeyTitle: {
//       normal: "Образование &",
//       accent: "Опыт",
//     },
//     journey: [
//       {
//         years: "2025 - Настоящее время",
//         role: "Инженер-программист",
//         institution: "Tech Inc",
//       },
//       {
//         years: "2020 - 2025",
//         role: "Инженер-программист",
//         institution: "Tech Inc",
//       },
//       {
//         years: "2015 - 2020",
//         role: "Инженер-программист",
//         institution: "Tech Inc",
//       },
//       {
//         years: "2010 - 2015",
//         role: "Инженер-программист",
//         institution: "Tech Inc",
//       },
//     ],
//   },

//   // --- Services Page ---
//   services: {
//     title: {
//       normal: "Индивидуальный",
//       accent: "Остеопатический уход",
//       rest: "для вашего тела",
//     },
//     list: [
//       {
//         id: "massage",
//         icon: "/assets/services/massage.svg",
//         title: "Массажная терапия",
//         description:
//           "Глубокий терапевтический массаж для снятия напряжения, улучшения кровообращения и уменьшения боли.",
//       },
//       {
//         id: "stretching",
//         icon: "/assets/services/stretching.svg",
//         title: "Терапия растяжки",
//         description:
//           "Проведённые специалистом занятия по растяжке для улучшения гибкости и предотвращения травм.",
//       },
//       {
//         id: "activity",
//         icon: "/assets/services/activity.svg",
//         title: "Физическая активность",
//         description:
//           "Индивидуальные программы физической активности для улучшения силы и подвижности.",
//       },
//       {
//         id: "osteopathy",
//         icon: "/assets/services/bone.svg",
//         title: "Остеопатическое лечение",
//         description:
//           "Холистический подход, направленный на баланс суставов, мышц и нервной системы.",
//       },
//     ],
//   },

//   // --- Gallery Page ---
//   gallery: {
//     title: {
//       accent: "Скоро",
//       rest: "",
//     },
//     description:
//       "Мы сейчас работаем над этим разделом, чтобы предложить вам что-то отличное.",
//   },

//   // --- Contact Page ---
//   contact: {
//     title: {
//       normal: "Связаться",
//       accent: "с нами",
//     },
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     fields: {
//       firstname: "Имя",
//       lastname: "Фамилия",
//       email: "Email",
//       service: "Меня интересует",
//       servicePlaceholder: "Выберите услугу",
//       message: "Сообщение",
//     },
//     sendBtn: "Отправить сообщение",
//   },

//   auth: {
//     // --- Login ---
//     login: {
//       title: "Добро пожаловать",
//       description: "Пожалуйста, войдите в свой аккаунт",
//       email: "Эл. почта",
//       emailPlaceholder: "youremail@gmail.com",
//       emailSpaceError: "Адрес электронной почты не может содержать пробелы",
//       password: "Пароль",
//       loginBtn: "Войти",
//       loggingIn: "Вход в систему...",
//       forgotPasswordText: "Забыли пароль?",
//       forgotPasswordLink: "Сбросить здесь",
//       signupText: "Нет аккаунта?",
//       signupLink: "Зарегистрироваться",
//       serverError: "Сервер не отвечает",
//     },

//     // --- SignUp ---
//     signup: {
//       title: "Создать аккаунт",
//       description: "Пожалуйста, заполните свои данные для регистрации",
//       firstname: "Имя",
//       lastname: "Фамилия",
//       email: "Эл. почта",
//       emailPlaceholder: "youremail@gmail.com",
//       emailSpaceError: "Адрес электронной почты не может содержать пробелы",
//       phone: "Телефон",
//       phonePlaceholder: "0501234567",
//       password: "Пароль",
//       confirmPassword: "Подтвердите пароль",
//       passwordMismatch: "Пароли не совпадают",
//       signUpBtn: "Зарегистрироваться",
//       loginText: "Уже есть аккаунт?",
//       loginLink: "Войти",
//       serverError: "Сервер не отвечает",
//     },

//     // --- Dashboard Page ---
//     dashboard: {
//       title: "Панель управления",
//       treatmentHistory: {
//         title: "История лечения",
//         noTreatments: "Лечение не найдено.",
//         error: "Ошибка при загрузке лечения",
//       },
//       booking: {
//         title: "Забронировать лечение",
//         servicePlaceholder: "Выберите услугу",
//         datePlaceholder: "Выберите дату",
//         timePlaceholder: "Выберите время",
//         bookBtn: "Забронировать",
//         fillAllFieldsError: "Пожалуйста, заполните все поля",
//         successMessage: "Бронирование успешно создано!",
//       },
//       modals: {
//         deleteBooking: {
//           title: "Удалить бронирование",
//           message: "Вы уверены, что хотите удалить это бронирование?",
//           cancelBtn: "Отмена",
//           confirmBtn: "Удалить",
//         },
//         bookingSuccess: {
//           message: "Ваше бронирование прошло успешно!",
//           closeBtn: "Закрыть",
//         },
//       },
//     },
//   },

//   // --- Forgot Password (Standalone Page) ---
//   forgotPassword: {
//     title: "Забыли пароль",
//     description:
//       "Введите ваш эл. адрес, и мы отправим ссылку для сброса пароля.",
//     emailLabel: "Эл. почта",
//     emailPlaceholder: "youremail@gmail.com",
//     emailError: "Адрес электронной почты не может содержать пробелы",
//     serverError: "Что-то пошло не так. Пожалуйста, попробуйте позже.",
//     successMessage:
//       "Если этот адрес существует, ссылка для сброса была отправлена.",
//     sendBtn: "Отправить ссылку для сброса",
//     sendingBtn: "Отправка...",
//     backToLogin: "Вернуться к входу",
//     rememberedText: "Запомнили пароль? ",
//   },

//   // --- Navbar ---
//   nav: {
//     home: "Главная",
//     about: "Обо мне",
//     services: "Услуги",
//     gallery: "Галерея",
//     contact: "Контакты",
//   },
// };
