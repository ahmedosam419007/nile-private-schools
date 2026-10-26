export type SectionId = 'top' | 'about' | 'stages' | 'features' | 'admission' | 'contact'
export type PageSectionId = Exclude<SectionId, 'top'>

export interface PageSection {
  id: PageSectionId
  title: string
}

export interface NavItem {
  id: PageSectionId
  label: string
}

export interface Department {
  id: 'public-relations' | 'reception' | 'accounts' | 'student-affairs'
  nameAr: string
  nameEn: string
  phone: string
  phoneHref: string
  whatsappHref: string
}

export const school = {
  name: {
    ar: 'مدارس النيل الخاصة للغات',
    en: 'Nile Private Language Schools',
  },
  tagline: {
    // DRAFT: Arabic rendering of the official English tagline; the school must approve it.
    ar: 'من ضفاف النيل… تحلّق أحلام أبنائنا.',
    en: "From the banks of the Nile… our children's dreams take flight.",
  },
  address: {
    // DRAFT: Arabic address rendering; the school must confirm the official wording.
    ar: 'مدينة العاشر من رمضان، الحي 11، القطاع 76',
    en: '10th of Ramadan City, 11 District, Sector 76',
  },
  logo: {
    src: '/images/logo.jpg',
    alt: 'شعار مدارس النيل الخاصة للغات',
  },
  buildingImage: '/images/building.png',
  links: {
    admissionForm:
      'https://docs.google.com/forms/d/e/1FAIpQLSfle6dcnbcAZ5u6oJw9AHd-o-h1_52E_o_041X7dIKepDurig/viewform?usp=header',
    location: 'https://maps.app.goo.gl/2QxTpLRWvxRYJxHK7',
    facebook: 'https://www.facebook.com/share/19r3eg76eP/',
  },
} as const

export const pageSections = [
  { id: 'about', title: 'عن المدرسة' },
  { id: 'stages', title: 'المراحل' },
  { id: 'features', title: 'المميزات' },
  { id: 'admission', title: 'التقديم' },
  { id: 'contact', title: 'تواصل معنا' },
] as const satisfies readonly PageSection[]

export const navItems: readonly NavItem[] = Object.freeze(
  pageSections.map((section) =>
    Object.freeze({
      id: section.id,
      label: section.title,
    }),
  ),
)

export const departments = [
  {
    id: 'public-relations',
    nameAr: 'علاقات عامة',
    nameEn: 'Public Relations',
    phone: '01050987480',
    phoneHref: 'tel:+201050987480',
    whatsappHref: 'https://wa.me/201050987480',
  },
  {
    id: 'reception',
    nameAr: 'استقبال',
    nameEn: 'Reception',
    phone: '01050991845',
    phoneHref: 'tel:+201050991845',
    whatsappHref: 'https://wa.me/201050991845',
  },
  {
    id: 'accounts',
    nameAr: 'حسابات',
    nameEn: 'Accounts',
    phone: '01080015715',
    phoneHref: 'tel:+201080015715',
    whatsappHref: 'https://wa.me/201080015715',
  },
  {
    id: 'student-affairs',
    nameAr: 'شئون طلاب',
    nameEn: 'Student Affairs',
    phone: '01030944405',
    phoneHref: 'tel:+201030944405',
    whatsappHref: 'https://wa.me/201030944405',
  },
] as const satisfies readonly Department[]

export const ui = {
  actions: {
    applyNow: 'قدّم الآن',
    contactUs: 'تواصل معنا',
  },
  header: {
    homeLink: 'العودة إلى بداية الصفحة',
    navigation: 'التنقل الرئيسي',
    mobileNavigation: 'التنقل على الهاتف',
    openMenu: 'فتح قائمة التنقل',
    closeMenu: 'إغلاق قائمة التنقل',
  },
} as const

export interface BilingualText {
  readonly ar: string
  readonly en: string
}

export interface AboutHighlight extends BilingualText {
  readonly id: 'languages' | 'environment' | 'care'
}

export interface AboutSectionCopy {
  readonly eyebrow: BilingualText
  readonly heading: BilingualText
  readonly paragraphs: readonly BilingualText[]
  readonly highlightsLabel: string
  readonly highlights: readonly AboutHighlight[]
}

// DRAFT: school must confirm the About copy in both languages before launch.
export const aboutSection = {
  eyebrow: {
    ar: 'عن المدرسة',
    en: 'ABOUT THE SCHOOL',
  },
  heading: {
    ar: 'بيئة تعليمية تصنع الثقة قبل النتائج',
    en: 'An education that builds confidence before results.',
  },
  paragraphs: [
    {
      ar: 'في مدارس النيل الخاصة للغات، يبدأ التعلّم من العلاقة الإنسانية: معلّم يعرف طالبه، وبيئة تشعره بالأمان، ومنهج يوقظ فضوله بدل أن يكتفي بتحفيظه.',
      en: 'At Nile Private Language Schools, learning begins with a human connection: a teacher who knows each child, an environment that feels safe, and a curriculum that awakens curiosity.',
    },
    {
      ar: 'نجمع بين أصالة القيم وروح العالم المفتوح؛ فتتعلّم لغات متعددة، وتمارس التفكير النقدي، وتكتشف موهبتها داخل تجربة مدرسية تُشبه الحياة.',
      en: 'We bring together rooted values and an open, international outlook — languages, critical thinking, and the confidence to explore.',
    },
    {
      ar: 'من الروضة حتى الثانوية، نرافق كل طالب خطوة بخطوة، ونشرك الأسرة في الرحلة، لنصنع معًا مدرسة تُشبه البيت وتُهيّئ للمستقبل.',
      en: 'From kindergarten to secondary school, we walk alongside every student and family, shaping a school that feels like home and prepares for the future.',
    },
  ],
  highlightsLabel: 'أبرز ما يميز المدرسة',
  highlights: [
    {
      id: 'languages',
      ar: 'لغات متعددة',
      en: 'Multiple languages',
    },
    {
      id: 'environment',
      ar: 'بيئة تعليمية',
      en: 'A learning environment',
    },
    {
      id: 'care',
      ar: 'رعاية مستمرة',
      en: 'Continuous care',
    },
  ],
} as const satisfies AboutSectionCopy

export type StageId = 'kindergarten' | 'primary' | 'preparatory' | 'secondary'

export interface StageCopy {
  readonly id: StageId
  readonly nameAr: string
  readonly nameEn: string
  readonly description: string
}

export interface StagesSectionCopy {
  readonly eyebrow: BilingualText
  readonly heading: BilingualText
  readonly intro: BilingualText
  readonly cardLabel: string
  readonly carouselLabel: string
  readonly previousLabel: string
  readonly nextLabel: string
  readonly items: readonly StageCopy[]
}

// DRAFT: school must confirm the exact stage list (KG, primary, preparatory, secondary) and every description below.
export const stagesSection = {
  eyebrow: {
    ar: 'المراحل',
    en: 'OUR STAGES',
  },
  heading: {
    ar: 'رحلة متّصلة من الروضة إلى الثانوية',
    en: 'One journey, from kindergarten to secondary.',
  },
  intro: {
    ar: 'لكل مرحلة لغتها ووتيرتها، ويجمعها هدف واحد: أن يتعلّم الطالب كيف يفكّر، ويجرّب، ويكبر بثقة.',
    en: 'Each stage has its own rhythm, yet one purpose connects them all: learning how to think, try, and grow with confidence.',
  },
  cardLabel: 'المرحلة',
  carouselLabel: 'المراحل الدراسية',
  previousLabel: 'المرحلة السابقة',
  nextLabel: 'المرحلة التالية',
  items: [
    {
      id: 'kindergarten',
      nameAr: 'روضة',
      nameEn: 'KINDERGARTEN',
      description: 'بداية لطيفة تقوم على اللعب والاستكشاف، وعلى اللغة التي يسمعها الطفل كل يوم.',
    },
    {
      id: 'primary',
      nameAr: 'المرحلة الابتدائية',
      nameEn: 'PRIMARY',
      description: 'أساس متين في القراءة والحساب واللغات، مع متابعة تصنع الثقة وتُبقي الفضول حيًّا.',
    },
    {
      id: 'preparatory',
      nameAr: 'المرحلة الإعدادية',
      nameEn: 'PREPARATORY',
      description: 'تفكير أوسع ومشروعات تربط الدرس بالعالم، ومساحة أكبر للمسؤولية والاختيار.',
    },
    {
      id: 'secondary',
      nameAr: 'المرحلة الثانوية',
      nameEn: 'SECONDARY',
      description: 'مسار جدّي نحو الجامعة، يوازن بين الطموح الأكاديمي والرعاية الشخصية.',
    },
  ],
} as const satisfies StagesSectionCopy

export type FeatureIconName =
  | 'languages'
  | 'teachers'
  | 'support'
  | 'activities'
  | 'care'
  | 'location'

export interface FeatureCopy {
  readonly icon: FeatureIconName
  readonly title: string
  readonly titleEn: string
  readonly description: string
}

export interface FeaturesSectionCopy {
  readonly eyebrow: BilingualText
  readonly heading: BilingualText
  readonly intro: BilingualText
  readonly items: readonly FeatureCopy[]
}

// DRAFT: school must confirm each feature claim and its wording before launch.
export const featuresSection = {
  eyebrow: {
    ar: 'ما يميزنا',
    en: 'WHY NILE',
  },
  heading: {
    ar: 'تفاصيل صغيرة تصنع فرقًا كبيرًا',
    en: 'The details that make a Nile education.',
  },
  intro: {
    ar: 'لا تُقاس جودة المدرسة بالمنهج وحده، بل بما يحدث بين الحصص: في الملعب، وفي المكتبة، وفي الطريق إلى المدرسة.',
    en: 'A school is more than its curriculum. It is what happens between lessons: on the field, in the library, and on the way in.',
  },
  items: [
    {
      icon: 'languages',
      title: 'لغات متعددة',
      titleEn: 'LANGUAGES',
      description: 'الإنجليزية لغة تعلّم يومية، ولغات أخرى تفتح للطالب نوافذ أوسع على العالم.',
    },
    {
      icon: 'teachers',
      title: 'معلمون مؤهلون',
      titleEn: 'QUALIFIED TEACHERS',
      description: 'اختيار دقيق وخبرة تربوية، ومعلم يعرف اسم كل طالب ومسار تقدّمه.',
    },
    {
      icon: 'support',
      title: 'دعم فردي',
      titleEn: 'PERSONAL SUPPORT',
      description: 'مجموعات صغيرة ومتابعة أقرب، ومساحة آمنة للسؤال والخطأ والمحاولة من جديد.',
    },
    {
      icon: 'activities',
      title: 'أنشطة متكاملة',
      titleEn: 'BEYOND THE CLASSROOM',
      description: 'رياضة وفنون ومشروعات ومسرح؛ لأن الشخصية تُبنى خارج الكتاب أيضًا.',
    },
    {
      icon: 'care',
      title: 'أمان ورعاية',
      titleEn: 'SAFETY & CARE',
      description: 'بيئة منظمة وآمنة، ورعاية يومية تبدأ من البوابة ولا تنتهي داخل الفصل.',
    },
    {
      icon: 'location',
      title: 'موقع يسهل الوصول إليه',
      titleEn: 'LOCATION',
      description: 'في مدينة العاشر من رمضان؛ عنوان واضح ووصول مباشر إلى المدرسة.',
    },
  ],
} as const satisfies FeaturesSectionCopy

export interface AdmissionSectionCopy {
  readonly eyebrow: BilingualText
  readonly heading: BilingualText
  readonly description: BilingualText
  readonly note: string
  readonly secondaryLabel: string
}

// DRAFT: admissions wording is written by the site team; the school must approve it before launch.
export const admissionSection = {
  eyebrow: {
    ar: 'التقديم',
    en: 'ADMISSIONS',
  },
  heading: {
    ar: 'من هنا تبدأ رحلة ابنك',
    en: 'Where the journey begins.',
  },
  description: {
    ar: 'املأ نموذج التقديم الإلكتروني، ثم يتواصل معك فريق القبول لاستكمال الأوراق وتحديد موعد الزيارة.',
    en: 'Complete the online form, and our admissions team will contact you to finish the paperwork and arrange a visit.',
  },
  note: 'يُفتح نموذج التقديم في نافذة جديدة.',
  secondaryLabel: 'لديك سؤال؟ تحدّث إلى فريق القبول',
} as const satisfies AdmissionSectionCopy

export interface ContactSectionActions {
  readonly call: string
  readonly whatsapp: string
  readonly map: string
  readonly facebook: string
}

export interface ContactSectionCopy {
  readonly eyebrow: BilingualText
  readonly heading: BilingualText
  readonly intro: BilingualText
  readonly departmentsLabel: string
  readonly addressLabel: string
  readonly actions: ContactSectionActions
}

// DRAFT: contact wording is written by the site team; only phones, address and links are confirmed.
export const contactSection = {
  eyebrow: {
    ar: 'تواصل معنا',
    en: 'CONTACT US',
  },
  heading: {
    ar: 'قريبون منك، وجاهزون للإجابة',
    en: 'Close to you, ready to answer.',
  },
  intro: {
    ar: 'اختر القسم الأقرب إلى استفسارك، أو زرنا في المدرسة؛ فريقنا يسعد بمساعدتك.',
    en: 'Choose the department closest to your question, or visit us on campus — our team is glad to help.',
  },
  departmentsLabel: 'أقسام المدرسة',
  addressLabel: 'عنوان المدرسة',
  actions: {
    call: 'اتصال',
    whatsapp: 'واتساب',
    map: 'الموقع على الخريطة',
    facebook: 'فيسبوك',
  },
} as const satisfies ContactSectionCopy

export interface FooterCopy {
  readonly quickLinksLabel: string
  readonly contactLabel: string
  readonly followLabel: string
  readonly facebookLabel: string
  readonly backToTopLabel: string
  readonly note: string
}

// DRAFT: footer labels and the closing note are written by the site team and await school approval.
export const footerSection = {
  quickLinksLabel: 'روابط سريعة',
  contactLabel: 'أرقام التواصل',
  followLabel: 'تابعنا',
  facebookLabel: 'فيسبوك',
  backToTopLabel: 'العودة إلى الأعلى',
  note: 'تعليم لغات من الروضة إلى الثانوية، في مدينة العاشر من رمضان.',
} as const satisfies FooterCopy
