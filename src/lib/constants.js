// ─────────────────────────────────────────────────────────
// BIBLE VERSES — 31 versículos, uno por día del mes
// ─────────────────────────────────────────────────────────
export const BIBLE_VERSES = [
  { ref: 'Josué 1:9',          text: 'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.' },
  { ref: 'Filipenses 4:13',    text: 'Todo lo puedo en Cristo que me fortalece.' },
  { ref: 'Jeremías 29:11',     text: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz y no de mal, para daros el fin que esperáis.' },
  { ref: 'Proverbios 16:3',    text: 'Encomienda a Jehová tus obras, y tus pensamientos serán afirmados.' },
  { ref: 'Salmos 23:1',        text: 'Jehová es mi pastor; nada me faltará.' },
  { ref: 'Mateo 6:33',         text: 'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.' },
  { ref: 'Romanos 8:28',       text: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.' },
  { ref: 'Proverbios 3:5-6',   text: 'Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.' },
  { ref: 'Isaías 40:31',       text: 'Los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.' },
  { ref: 'Salmos 46:10',       text: 'Estad quietos, y conoced que yo soy Dios; seré exaltado entre las naciones; enaltecido seré en la tierra.' },
  { ref: 'Juan 16:33',         text: 'En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.' },
  { ref: 'Proverbios 4:23',    text: 'Sobre toda cosa guardada, guarda tu corazón; porque de él mana la vida.' },
  { ref: 'Gálatas 6:9',        text: 'No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos.' },
  { ref: 'Salmos 37:4',        text: 'Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón.' },
  { ref: '2 Timoteo 1:7',      text: 'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.' },
  { ref: 'Mateo 11:28',        text: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.' },
  { ref: 'Salmos 119:105',     text: 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.' },
  { ref: 'Efesios 3:20',       text: 'Y a Aquel que es poderoso para hacer todas las cosas mucho más abundantemente de lo que pedimos o entendemos, según el poder que actúa en nosotros.' },
  { ref: 'Proverbios 22:29',   text: '¿Has visto hombre solícito en su trabajo? Delante de los reyes estará; no estará delante de los de baja condición.' },
  { ref: 'Romanos 12:2',       text: 'No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta.' },
  { ref: 'Salmos 27:1',        text: 'Jehová es mi luz y mi salvación; ¿a quién temeré? Jehová es la fortaleza de mi vida; ¿de quién me he de atemorizar?' },
  { ref: 'Colosenses 3:23',    text: 'Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.' },
  { ref: 'Filipenses 4:6-7',   text: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones.' },
  { ref: 'Deuteronomio 31:8',  text: 'Y Jehová va delante de ti; él estará contigo, no te dejará, ni te desamparará; no temas ni te intimides.' },
  { ref: 'Santiago 1:5',       text: 'Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.' },
  { ref: 'Salmos 90:17',       text: 'Sea la luz de Jehová nuestro Dios sobre nosotros, y la obra de nuestras manos confirma sobre nosotros; sí, la obra de nuestras manos confirma.' },
  { ref: 'Marcos 11:24',       text: 'Por tanto, os digo que todo lo que pidiereis orando, creed que lo recibiréis, y os vendrá.' },
  { ref: 'Proverbios 11:14',   text: 'Donde no hay dirección sabia, caerá el pueblo; mas en la multitud de consejeros hay seguridad.' },
  { ref: 'Isaías 41:10',       text: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.' },
  { ref: 'Juan 15:5',          text: 'Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, este lleva mucho fruto; porque separados de mí nada podéis hacer.' },
  { ref: 'Lamentaciones 3:23', text: 'Nuevas son cada mañana; grande es tu fidelidad.' },
]

export function getVerseOfDay() {
  const day = new Date().getDate() // 1-31
  return BIBLE_VERSES[(day - 1) % BIBLE_VERSES.length]
}

// ─────────────────────────────────────────────────────────
// PLAN DE ESTUDIO BÍBLICO
// Diseñado para Raymond: emprendedor, esposo, padre,
// cristiano en crecimiento — enfocado en identidad,
// sabiduría práctica, fe y liderazgo.
// ─────────────────────────────────────────────────────────
export const BIBLE_STUDY_PLAN = [
  {
    phase: 1,
    title: 'Fundamentos de identidad',
    subtitle: 'Quién eres en Cristo · ~4 semanas',
    color: 'accent',
    description: 'Antes de construir un negocio o liderar una familia, necesitas saber quién eres. Esta fase establece tu identidad en Dios.',
    books: [
      {
        book: 'Salmos',
        chapters: 'Sal 1, 8, 23, 27, 37, 46, 91, 103, 139',
        weeks: '1 semana',
        focus: 'Confianza en Dios, identidad como hijo amado, protección divina',
        questions: [
          '¿Qué dice Dios sobre quién eres tú?',
          '¿En qué áreas de tu vida no confías completamente en Dios?',
          '¿Cómo cambia tu día saber que Dios te conoce profundamente (Sal 139)?',
        ],
        tip: 'Lee un salmo por día en voz alta. Deja que las palabras entren a tu corazón antes de salir al mundo.',
      },
      {
        book: 'Efesios',
        chapters: 'Capítulos 1–6 completos',
        weeks: '1 semana',
        focus: 'Tu posición en Cristo, la armadura de Dios, relaciones sanas',
        questions: [
          '¿Qué significa estar "sentado en lugares celestiales" (Ef 2:6) mientras trabajas en Spark?',
          '¿Cómo aplicas la armadura de Dios (Ef 6) en tu vida de negocios?',
          '¿Qué le debes cambiar a tu rol como esposo según Ef 5?',
        ],
        tip: 'Enfócate en Ef 1:3-14 — lista todo lo que Dios dice que eres. Guárdala y léela cuando el emprendimiento se ponga difícil.',
      },
      {
        book: 'Juan',
        chapters: 'Capítulos 1–21 completos',
        weeks: '2 semanas',
        focus: 'Conocer a Jesús de cerca — su carácter, sus milagros, su amor',
        questions: [
          '¿Qué característica de Jesús en Juan más te impacta y por qué?',
          '¿Qué significa "permanecer en la vid" (Juan 15) para tu vida diaria?',
          '¿Cómo respondió Jesús al fracaso y la traición? ¿Cómo respondes tú?',
        ],
        tip: 'Juan es el evangelio del amor. Léelo despacio. No es para estudiar, es para conocer a una persona.',
      },
    ],
  },
  {
    phase: 2,
    title: 'Sabiduría para el emprendedor',
    subtitle: 'Finanzas, decisiones y trabajo · ~3 semanas',
    color: 'yellow',
    description: 'La Biblia tiene más versículos sobre dinero y trabajo que sobre fe y oración juntos. Esta fase te da sabiduría práctica.',
    books: [
      {
        book: 'Proverbios',
        chapters: '1 capítulo por día (31 capítulos = 1 mes)',
        weeks: '1 mes',
        focus: 'Sabiduría, finanzas, palabras, relaciones, disciplina',
        questions: [
          '¿Qué proverbio de hoy aplica directamente a tu negocio o finanzas?',
          '¿Hay alguna advertencia en el capítulo de hoy que estás ignorando?',
          '¿Qué dice este proverbio sobre cómo tratas a tus clientes o equipo?',
        ],
        tip: 'Lee el capítulo de Proverbios que corresponde al día del mes. Día 10 → Proverbios 10. Hazlo por vida.',
      },
      {
        book: 'Eclesiastés',
        chapters: 'Capítulos 1–12 completos',
        weeks: '1 semana',
        focus: 'El verdadero significado del trabajo, el dinero y el éxito',
        questions: [
          '¿Estás construyendo algo que importa o solo persiguiendo "vanidad"?',
          '¿Cómo equilibras el trabajo duro con el disfrute de la vida (Ecl 3)?',
          '¿Qué te dice Ecl 12:13 sobre el propósito final de todo?',
        ],
        tip: 'Eclesiastés es el libro más honesto de la Biblia. Salomón lo tenía todo y aun así se sentía vacío. Que eso te dé perspectiva.',
      },
      {
        book: 'Lucas',
        chapters: 'Parábolas: Lucas 12, 15, 16, 18, 19',
        weeks: '1 semana',
        focus: 'Las enseñanzas de Jesús sobre el dinero, la mayordomía y las prioridades',
        questions: [
          '¿Eres mayordomo fiel con lo que Dios te ha dado (Lucas 16:10)?',
          '¿Tu relación con el dinero te acerca o te aleja de Dios?',
          '¿Qué haría Zaqueo (Lucas 19) que tú también deberías hacer?',
        ],
        tip: 'Jesús habló más de dinero que de cielo o infierno. Tómalo en serio como emprendedor.',
      },
    ],
  },
  {
    phase: 3,
    title: 'Liderazgo y familia',
    subtitle: 'Esposo, padre y líder · ~3 semanas',
    color: 'green',
    description: 'Tu negocio más importante es tu hogar. Esta fase te equipa para liderar tu familia con propósito.',
    books: [
      {
        book: 'Rut',
        chapters: 'Capítulos 1–4 completos',
        weeks: '3 días',
        focus: 'Lealtad, amor incondicional, redención en la familia',
        questions: [
          '¿Cómo demuestras lealtad a tu esposa en el día a día?',
          '¿Qué tipo de hombre es Boaz? ¿En qué te pareces y en qué no?',
          '¿Hay alguien en tu familia que necesita que tú seas su "redentor"?',
        ],
        tip: 'Lee Rut en una sola sentada — son solo 4 capítulos. Es la historia de amor más hermosa de la Biblia.',
      },
      {
        book: '1 Samuel',
        chapters: 'Capítulos 1–20 (David y Saúl)',
        weeks: '2 semanas',
        focus: 'Liderazgo, carácter bajo presión, amistad, humildad',
        questions: [
          '¿En qué te pareces más a Saúl (inseguro, reactivo) o a David (humilde, dependiente de Dios)?',
          '¿Tienes un "Jonatán" — un amigo que te dice la verdad con amor?',
          '¿Cómo respondes cuando alguien te hace daño? ¿Como David con Saúl?',
        ],
        tip: 'David era imperfecto pero tenía un corazón para Dios. Dios no busca perfección, busca disponibilidad.',
      },
      {
        book: 'Nehemías',
        chapters: 'Capítulos 1–13 completos',
        weeks: '1 semana',
        focus: 'Visión, liderazgo bajo oposición, construir con propósito',
        questions: [
          '¿Cuál es el "muro" que Dios te está llamando a construir en tu vida?',
          '¿Cómo manejas la crítica y la oposición cuando persigues tus metas?',
          '¿Oras antes de tomar decisiones importantes como Nehemías (Neh 2:4)?',
        ],
        tip: 'Nehemías es el mejor libro de liderazgo de la Biblia. Léelo como manual de emprendimiento con Dios.',
      },
    ],
  },
  {
    phase: 4,
    title: 'Fe que mueve montañas',
    subtitle: 'Confianza radical en Dios · ~3 semanas',
    color: 'purple',
    description: 'Esta fase es para los momentos difíciles — cuando el negocio no va, cuando la fe flaquea, cuando necesitas recordar que Dios es fiel.',
    books: [
      {
        book: 'Job',
        chapters: 'Job 1–3, 38–42 (resumen)',
        weeks: '1 semana',
        focus: 'Sufrimiento, confianza en Dios cuando no entiendes, restauración',
        questions: [
          '¿Hay algo en tu vida ahora mismo que no entiendes y te frustra?',
          '¿Puedes confiar en Dios incluso cuando no ves el plan?',
          '¿Qué te dice Job 42 sobre la fidelidad de Dios al final?',
        ],
        tip: 'Job no recibió respuestas, recibió a Dios. A veces eso es suficiente.',
      },
      {
        book: 'Hebreos',
        chapters: 'Capítulos 11–13 (el capítulo de la fe)',
        weeks: '4 días',
        focus: 'Fe en acción, perseverancia, los héroes de la fe',
        questions: [
          '¿Cuál de los héroes de Hebreos 11 más te inspira y por qué?',
          '¿Qué "peso" necesitas soltar para correr mejor tu carrera (Heb 12:1)?',
          '¿Cómo defines la fe en tu vida práctica de hoy?',
        ],
        tip: 'Hebreos 11 es el "salón de la fama" de Dios. Todas esas personas tenían miedo también.',
      },
      {
        book: 'Apocalipsis',
        chapters: 'Capítulos 1–3 y 21–22',
        weeks: '1 semana',
        focus: 'Las cartas a las iglesias, el final de la historia, la esperanza',
        questions: [
          '¿A cuál de las 7 iglesias (Ap 2–3) te pareces más en este momento?',
          '¿Cómo cambia tu perspectiva del trabajo y el dinero saber cómo termina la historia?',
          '¿Qué significa para ti que Dios hará "nuevas todas las cosas" (Ap 21:5)?',
        ],
        tip: 'No leas Apocalipsis para asustarte. Léelo para recordar que Dios ya ganó.',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────
// GYM ROUTINES — Plan Emilio Born
// ─────────────────────────────────────────────────────────
export const GYM_ROUTINES = {
  push: {
    name: 'PUSH',
    muscles: ['Pecho', 'Hombros', 'Tríceps'],
    days: 'Lunes y Jueves',
    exercises: [
      { name: 'Push Ups (Calentamiento)', sets: '2 × 12', url: 'https://youtube.com/shorts/2FbTKhNjSps' },
      { name: 'Press de Pecho', sets: '4 × 10 (última: Dropset)', url: 'https://www.youtube.com/shorts/Mzdnb0dw9o8' },
      { name: 'Press Inclinado Smith', sets: '3 × 10', url: 'https://www.youtube.com/shorts/wkPZQ1TWjWU' },
      { name: 'Press Militar', sets: '4 × 10 (última: Dropset)', url: 'https://www.youtube.com/shorts/E0Wtsu-sQ3s' },
      { name: 'Elevaciones Laterales/Frontales', sets: '3 × 10', url: 'https://www.youtube.com/shorts/PoqY8On156o' },
      { name: 'Extensión Tríceps', sets: '3 series al FALLO', url: 'https://youtube.com/shorts/PNnUyjki1_4' },
    ],
  },
  pull: {
    name: 'PULL',
    muscles: ['Espalda', 'Bíceps'],
    days: 'Martes y Viernes',
    exercises: [
      { name: 'Remo Mancuernas (Calentamiento)', sets: '2 × 12', url: null },
      { name: 'Lat Push Down', sets: '3 × 15', url: 'https://youtube.com/shorts/58imzX9aTN4' },
      { name: 'Jalones Dorsales', sets: '3 × 12', url: 'https://youtube.com/shorts/5kIuGtQ5Juo' },
      { name: 'Remo Smith Machine', sets: '3 × 10', url: 'https://youtube.com/shorts/9ears0wFJ-U' },
      { name: 'Remo Sentado', sets: '3 × 10', url: 'https://www.youtube.com/shorts/iOhnMFaHrnE' },
      { name: 'Curl Spider', sets: '3 series al FALLO', url: 'https://youtube.com/shorts/IHAYnzbmx04' },
    ],
  },
  leg: {
    name: 'LEG',
    muscles: ['Cuádriceps', 'Isquios', 'Pantorrillas'],
    days: 'Miércoles y Sábado',
    exercises: [
      { name: 'Sentadillas (Calentamiento)', sets: '2 × 12', url: null },
      { name: 'Sentadillas Smith Machine', sets: '3 × 12', url: 'https://youtube.com/shorts/ftukTKzvbhU' },
      { name: 'Bulgarian Squat', sets: '4 × 15', url: 'https://www.youtube.com/shorts/bW4tEo7Ntno' },
      { name: 'Prensa de Pierna', sets: '4 × 15', url: 'https://youtube.com/shorts/ha3xb6v56zo' },
      { name: 'Curl Femoral Sentado', sets: '3 × 10', url: 'https://www.youtube.com/shorts/Q3UuXoHwKx0' },
      { name: 'Elevación de Talones', sets: '4 × 20', url: 'https://www.youtube.com/shorts/kH7q3wLF-60' },
    ],
  },
  abs: {
    name: 'ABS',
    muscles: ['Core'],
    days: 'Lunes, Miércoles y Viernes',
    exercises: [
      { name: 'Bicicleta Abdomen', sets: '3 × 50 cruces', url: 'https://youtube.com/shorts/0EV7O7X288I' },
      { name: 'Crunch', sets: '3 × 25', url: 'https://youtube.com/shorts/oC604LrfdQ4' },
      { name: 'Elevaciones de Piernas Alternas', sets: '3 × 45 seg', url: 'https://youtube.com/shorts/P-nNcNt7v7s' },
      { name: 'Plank', sets: '3 × 45 seg', url: 'https://youtube.com/shorts/0EV7O7X288I' },
    ],
  },
}

// day 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
export const DAY_ROUTINE = { 1: 'push', 2: 'pull', 3: 'leg', 4: 'push', 5: 'pull', 6: 'leg' }
export const ABS_DAYS = [1, 3, 5]

export const WEEKLY_GYM = [
  { day: 'L', routine: 'PUSH', abs: true },
  { day: 'M', routine: 'PULL', abs: false },
  { day: 'X', routine: 'LEG', abs: true },
  { day: 'J', routine: 'PUSH', abs: false },
  { day: 'V', routine: 'PULL', abs: true },
  { day: 'S', routine: 'LEG', abs: false },
]

// ─────────────────────────────────────────────────────────
// PODCASTS
// ─────────────────────────────────────────────────────────
export const PODCASTS = [
  { name: 'Vilma OS',                          category: 'Marketing Digital',   url: 'https://open.spotify.com/show/0GejOPh15VUdbxgD1panVL', emoji: '📣' },
  { name: 'Stock Market Options Trading',       category: 'Trading opciones (EN)',url: 'https://open.spotify.com/show/3s4Y0OZIZMH0vyKbDiciu3', emoji: '📈' },
  { name: 'Serious Sellers en Español',         category: 'Amazon FBA',          url: 'https://open.spotify.com/show/2XcEJPpHOk7h1j0BqTncXr', emoji: '🛒' },
  { name: 'The Options Insider Radio',          category: 'Trading opciones (EN)',url: 'https://open.spotify.com/show/6RyF1eL9umLDkkApVl8Fdu', emoji: '📊' },
  { name: 'Emprendeduros',                      category: 'Emprendimiento',       url: 'https://open.spotify.com/show/6rOWpOXqFl9duQ43v1SsLz', emoji: '🚀' },
  { name: 'Serious Sellers Podcast',            category: 'Amazon FBA (EN)',      url: 'https://open.spotify.com/show/31CTCHQGSghLavsf0otYQq', emoji: '📦' },
  { name: 'Pastora Yesenia Then',               category: 'Fe y Espiritualidad',  url: 'https://open.spotify.com/show/47SvLma45kOiCjWgO25eRU', emoji: '✝️' },
  { name: 'Itnig: Historias de Startups',       category: 'Startups & IA',        url: 'https://open.spotify.com/show/75ao7vbM0cH7SKIsyYN3iZ', emoji: '💡' },
]

// Rota por día del año — cambia cada día y nunca es el mismo dos días seguidos
export const getPodcastOfDay = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now - start) / 86400000)
  return PODCASTS[dayOfYear % PODCASTS.length]
}

// ─────────────────────────────────────────────────────────
// CHECKLIST ITEMS
// ─────────────────────────────────────────────────────────
export const CHECKLIST_MORNING = [
  { key: 'wake_water',    label: 'Despertar + desayuno',                time: '6:00' },
  { key: 'prayer_bible',  label: 'Oración + Biblia + versículo',        time: '6:20' },
  { key: 'gratitude',     label: 'Gratitud · 3 cosas escritas',         time: '6:40' },
  { key: 'main_block',    label: 'Bloque principal de negocios (2h)',    time: '7:00' },
  { key: 'reading',       label: 'Lectura 30 min',                      time: '9:00' },
  { key: 'lunch',         label: 'Almuerzo',                            time: '9:30' },
  { key: 'gym',           label: 'GYM · Plan Emilio Born',              time: '10:00' },
  { key: 'shower_pack',   label: 'Ducha',                               time: '11:30' },
  { key: 'podcast_ready', label: 'Audiolibro/Podcast listo para Spark', time: '' },
  { key: 'spark_out',     label: 'Salir a Spark Driver',                time: '12:00' },
]

export const CHECKLIST_NIGHT = [
  { key: 'dinner_no_phone', label: 'Cena sin teléfono (en familia)',           time: '7:30' },
  { key: 'night_block',     label: 'Bloque de noche (negocios ligeros)',       time: '8:00' },
  { key: 'couple_time',     label: 'Tiempo de pareja / Tiempo libre',          time: '9:00' },
  { key: 'review_night',    label: 'Revisión del día + 3 prioridades mañana', time: '10:05' },
  { key: 'sleep',           label: 'DORMIR · teléfono en modo avión',          time: '10:20' },
]

export const WEEKLY_HABIT_KEYS = [
  { key: 'prayer_bible',  label: 'Oración + Biblia' },
  { key: 'gym',           label: 'Gym' },
  { key: 'main_block',    label: 'Bloque negocio 2h' },
  { key: 'reading',       label: 'Lectura 30 min' },
  { key: 'night_block',   label: 'Bloque de noche' },
  { key: 'review_night',  label: 'Revisión nocturna' },
  { key: 'couple_time',   label: 'Tiempo de pareja' },
]

// ─────────────────────────────────────────────────────────
// PROJECT OF THE DAY
// ─────────────────────────────────────────────────────────
export const PROJECT_OF_DAY = {
  1: { project: 'Mercado + AICrafterLab', task: 'GoTrade 30min · Generar contenido', color: 'accent' },
  2: { project: 'Mercado + Amazon FBA',   task: 'GoTrade 30min · Investigar productos', color: 'green' },
  3: { project: 'Mercado + AICrafterLab', task: 'GoTrade 30min · Generar contenido', color: 'accent' },
  4: { project: 'Mercado + Amazon FBA',   task: 'GoTrade 30min · Investigar productos', color: 'green' },
  5: { project: 'Mercado + AICrafterLab', task: 'GoTrade 30min · Generar contenido', color: 'accent' },
  6: { project: 'Mercado + Amazon FBA',   task: 'GoTrade 30min · Investigar productos', color: 'green' },
  0: { project: 'Descanso',               task: 'Iglesia · Familia · Recarga',        color: 'yellow' },
}

// ─────────────────────────────────────────────────────────
// MEAL PLAN
// ─────────────────────────────────────────────────────────
export const MEAL_COMBOS = {
  A: {
    label: 'Combo A',
    days: 'Lunes y Jueves',
    desayuno: { title: 'Avena con proteína y mantequilla de maní', items: ['100g Avena', '40g Proteína en polvo', '50g Frutas', '20g Mantequilla de maní'] },
    almuerzo: { title: 'Carne con arroz y vegetales', items: ['250g Yuca o arroz', '180g Carne magra o pavo', '80g Vegetales', '50g Aguacate'] },
    cena:     { title: 'Pollo con batata y aguacate', items: ['200g Batata o granos', '180g Pavo o pollo', '80g Vegetales', '50g Aguacate'] },
  },
  B: {
    label: 'Combo B',
    days: 'Martes y Viernes',
    desayuno: { title: 'Huevos con pan y frutas', items: ['2 Pan integral', '6 claras + 2 huevos enteros', '150g Frutas', '50g Aguacate'] },
    almuerzo: { title: 'Pescado con papa y ensalada', items: ['250g Papa o batata', '180g Pescado', '80g Ensalada mixta', '50g Aguacate'] },
    cena:     { title: 'Lomo de cerdo con arroz', items: ['200g Arroz o yuca', '180g Lomo de cerdo magro', '80g Ensalada', '50g Aguacate'] },
  },
  C: {
    label: 'Combo C',
    days: 'Miércoles y Sábado',
    desayuno: { title: 'Yogur griego con frutas', items: ['60g Avena', '250g Yogur griego natural', '150g Fresas o frutas', '15g Mantequilla de almendra'] },
    almuerzo: { title: 'Pasta con carne y vegetales', items: ['200g Pasta', '180g Carne magra o pollo', '80g Vegetales', '50g Aguacate'] },
    cena:     { title: 'Carne con batata y aguacate', items: ['200g Papa o batata', '180g Carne o pescado', '50g Vegetales', '50g Aguacate'] },
  },
}

export const DAY_COMBO = { 1: 'A', 2: 'B', 3: 'C', 4: 'A', 5: 'B', 6: 'C', 0: null }

export const VITAMINS = [
  { name: 'Vitamina E',          dose: '400 UI',  when: 'Con el desayuno' },
  { name: 'Omega-3',             dose: '2 g',     when: 'Después del gym' },
  { name: 'Ashwagandha',         dose: '600 mg',  when: 'Después del gym' },
  { name: 'Magnesio',            dose: '500 mg',  when: 'Después del gym' },
  { name: 'Vitamina C',          dose: '1 g',     when: 'Después del gym' },
  { name: 'Colágeno Hidrolizado', dose: '10 g',   when: 'Antes de dormir' },
]

// ─────────────────────────────────────────────────────────
// BOOKS
// ─────────────────────────────────────────────────────────
export const BOOKS = [
  { id: 1,  title: 'Hábitos Atómicos',                  author: 'James Clear',     owned: false, current: false },
  { id: 2,  title: 'Padre Rico Padre Pobre',            author: 'R. Kiyosaki',     owned: false, current: false },
  { id: 3,  title: 'Buy Back Your Time',                author: 'Dan Martell',     owned: true,  current: true  },
  { id: 4,  title: 'Sanando las Heridas de tu Infancia', author: 'John Townsend',  owned: true,  current: false },
  { id: 5,  title: 'La Psicología del Dinero',          author: 'Morgan Housel',   owned: false, current: false },
  { id: 6,  title: 'Cómo Ganar Amigos e Influir...',   author: 'Dale Carnegie',   owned: false, current: false },
  { id: 7,  title: 'Una Vida con Propósito',            author: 'Rick Warren',     owned: false, current: false },
  { id: 8,  title: 'El Hombre Más Rico de Babilonia',  author: 'George Clason',   owned: false, current: false },
  { id: 9,  title: 'Las 21 Leyes del Liderazgo',       author: 'John Maxwell',    owned: false, current: false },
  { id: 10, title: 'La Semana Laboral de 4 Horas',     author: 'Tim Ferriss',     owned: false, current: false },
]

// ─────────────────────────────────────────────────────────
// BOOK RECOMMENDATIONS — curated for Raymond's goals
// Categories: negocio, trading, amazon, fe, personal
// ─────────────────────────────────────────────────────────
export const BOOK_RECOMMENDATIONS = [
  // Negocio / Marketing / IA
  { title: '$100M Offers',                      author: 'Alex Hormozi',        category: 'negocio',   reason: 'Crea ofertas irresistibles para AICrafterLab' },
  { title: '$100M Leads',                       author: 'Alex Hormozi',        category: 'negocio',   reason: 'Sistema de generación de clientes para tu agencia' },
  { title: 'Building a StoryBrand',             author: 'Donald Miller',       category: 'negocio',   reason: 'Clarifica el mensaje de marketing de AICrafterLab' },
  { title: 'Expert Secrets',                    author: 'Russell Brunson',     category: 'negocio',   reason: 'Posiciónate como experto en IA y automatización' },
  { title: 'The E-Myth Revisited',              author: 'Michael Gerber',      category: 'negocio',   reason: 'Sistematiza tu agencia para que funcione sin ti' },
  { title: 'Never Split the Difference',        author: 'Chris Voss',          category: 'negocio',   reason: 'Negociación de contratos con clientes' },
  { title: 'Dotcom Secrets',                    author: 'Russell Brunson',     category: 'negocio',   reason: 'Funnels de ventas para servicios digitales' },
  // Trading / Finanzas
  { title: 'Options as a Strategic Investment', author: 'Lawrence McMillan',   category: 'trading',   reason: 'La biblia del trading de opciones' },
  { title: 'Trading in the Zone',               author: 'Mark Douglas',        category: 'trading',   reason: 'Mentalidad ganadora para el trading' },
  { title: 'The Intelligent Investor',          author: 'Benjamin Graham',     category: 'trading',   reason: 'Base sólida de inversión a largo plazo' },
  { title: 'Market Wizards',                    author: 'Jack Schwager',        category: 'trading',   reason: 'Historias de los mejores traders del mundo' },
  { title: 'How to Make Money in Stocks',       author: 'William O\'Neil',     category: 'trading',   reason: 'Sistema CAN SLIM para selección de acciones' },
  // Amazon FBA
  { title: 'The Amazon Jungle',                 author: 'Jason Boyce',         category: 'amazon',    reason: 'Estrategia completa para vender en Amazon' },
  { title: 'Product Research 101',              author: 'Renae Clark',         category: 'amazon',    reason: 'Cómo encontrar productos ganadores en Amazon' },
  { title: 'Launch',                            author: 'Jeff Walker',         category: 'amazon',    reason: 'Sistema de lanzamiento de productos digitales' },
  // Fe y crecimiento personal
  { title: 'El Propósito de Todo',              author: 'Rick Warren',         category: 'fe',        reason: 'Profundiza tu propósito desde la fe' },
  { title: 'Boundaries',                        author: 'Henry Cloud',         category: 'fe',        reason: 'Límites saludables en relaciones y negocios' },
  { title: 'Mere Christianity',                 author: 'C.S. Lewis',          category: 'fe',        reason: 'Base intelectual de la fe cristiana' },
  { title: 'The Compound Effect',               author: 'Darren Hardy',        category: 'personal',  reason: 'Pequeñas acciones consistentes = grandes resultados' },
  { title: 'Deep Work',                         author: 'Cal Newport',         category: 'personal',  reason: 'Trabaja con foco profundo en tus bloques de 2h' },
  { title: 'Can\'t Hurt Me',                    author: 'David Goggins',       category: 'personal',  reason: 'Disciplina mental extrema para tus metas' },
  { title: 'The Miracle Morning',               author: 'Hal Elrod',           category: 'personal',  reason: 'Optimiza tu rutina de mañana al máximo' },
  { title: 'Extreme Ownership',                 author: 'Jocko Willink',       category: 'personal',  reason: 'Responsabilidad total como líder y empresario' },
  { title: 'Ikigai',                            author: 'Héctor García',       category: 'personal',  reason: 'Encuentra tu razón de ser a largo plazo' },
  { title: 'El Poder del Ahora',               author: 'Eckhart Tolle',        category: 'personal',  reason: 'Maneja el estrés y la ansiedad del emprendimiento' },
]

export const BOOK_CATEGORIES = {
  negocio:  { label: 'Negocio & Marketing', color: 'accent' },
  trading:  { label: 'Trading & Finanzas',  color: 'purple' },
  amazon:   { label: 'Amazon FBA',          color: 'green'  },
  fe:       { label: 'Fe & Espiritualidad', color: 'yellow' },
  personal: { label: 'Desarrollo Personal', color: 'surface'},
}

// ─────────────────────────────────────────────────────────
// ALARMS REFERENCE
// ─────────────────────────────────────────────────────────
export const ALARMS = [
  {
    category: 'Rutina Diaria (Lun–Sab)',
    items: [
      { time: '6:00am',  label: 'Despertar + desayuno' },
      { time: '6:20am',  label: 'Oración + Biblia' },
      { time: '6:40am',  label: 'Gratitud — 3 cosas' },
      { time: '7:00am',  label: 'BLOQUE PRINCIPAL — ver proyecto del día' },
      { time: '9:00am',  label: 'Lectura 30 min' },
      { time: '9:30am',  label: 'Almuerzo' },
      { time: '10:00am', label: 'GYM — ver rutina del día' },
      { time: '11:30am', label: 'Ducha' },
      { time: '11:50am', label: 'Audiolibro/Podcast listo' },
      { time: '12:00pm', label: 'Salir a Spark Driver' },
      { time: '8:00pm',  label: 'Bloque de noche (según día)' },
      { time: '9:00pm',  label: 'Tiempo de pareja / Tiempo libre' },
      { time: '10:05pm', label: 'Revisión del día + 3 prioridades mañana' },
      { time: '10:20pm', label: 'DORMIR — modo avión' },
    ],
  },
  {
    category: 'Domingo',
    items: [
      { time: '7:00am',  label: 'Despertar domingo' },
      { time: '7:05am',  label: 'Oración extendida 30 min' },
      { time: '8:00am',  label: 'Lectura 45 min' },
      { time: '8:45am',  label: 'Prepararse para la iglesia' },
      { time: '9:00am',  label: 'IGLESIA — Comunidad Cristiana Ever' },
      { time: '6:30pm',  label: 'Revisión semanal O salida familiar' },
      { time: '10:30pm', label: 'DORMIR domingo' },
    ],
  },
  {
    category: 'Familia y Relaciones',
    items: [
      { time: 'Semanal',    label: 'Llamar a papá o mamá (pausa Spark)' },
      { time: 'C/2 semanas', label: 'Actividad familiar — esposa e hija' },
      { time: 'C/10-15 días', label: 'Llamada/mensaje a hermana' },
      { time: 'Primer Dom',  label: 'REVISIÓN MENSUAL — 30 min' },
    ],
  },
  {
    category: 'Finanzas y Negocios',
    items: [
      { time: 'Lun 6:30am', label: 'Revisar finanzas 15 min — ingresos/gastos' },
      { time: 'Vie 8:00pm', label: 'Indicadores de negocio — avance semanal' },
      { time: 'Día 1 del mes', label: 'Registro mensual de ingresos' },
    ],
  },
]
