export type Language = 'ru' | 'en';

export const translations = {
  ru: {
    nav: {
      work: 'Проекты',
      services: 'Услуги',
      manifesto: 'Манифест',
      stack: 'Манифест',
      capabilities: 'Возможности',
      discuss: 'Обсудить',
      startProject: 'Начать проект',
      menu: 'Меню',
    },
    hero: {
      tagline: 'Design Engineering Studio',
      digital: 'АБСОЛЮТНОЕ',
      typewriter: ['ДИЗАЙН', 'САЙТЫ', 'БУДУЩЕЕ', 'ЦИФРА', 'ИСКУССТВО'],
      mastery: 'МАСТЕРСТВО',
      badge: '• Showreel • Play • 2026 •',
      viewWork: 'Смотреть Проекты',
      mission: 'Мы объединяем радикальный дизайн с надежной инженерией, создавая цифровые продукты, которые не просто существуют, а доминируют в пространстве внимания.',
      hud: {
        loc: 'MSQ / MSK',
        est: 'EST. 2025',
        scroll: 'SCROLL_DOWN [ v ]',
        coords: '53.90° N, 27.56° E'
      }
    },
    designCanvas: {
      openUniverse: 'Открыть Вселенную',
    },
    services: {
      title: 'НАШ ОПЫТ',
      manifest: '[SERVICES_MANIFEST_V2.0]',
      subtitle: 'МЫ СОЗДАЕМ ЦИФРОВЫЕ ПРОДУКТЫ, ОПРЕДЕЛЯЮЩИЕ ИНДУСТРИЮ.',
      items: {
        uiux: {
          title: 'UI/UX Дизайн',
          desc: 'Мы создаем интерфейсы, которые ощущаются естественно, выглядят потрясающе и работают безупречно на любых устройствах.',
        },
        web: {
          title: 'Веб-Опыт',
          desc: 'Иммерсивные сайты, которые рассказывают историю вашего бренда через анимацию и взаимодействие.',
        },
        code: {
          title: 'Креативный Код',
          desc: 'WebGL, Three.js и React для максимальной производительности.',
        },
        app: {
          title: 'Мобильные App',
          desc: 'Нативные приложения с кроссплатформенной эффективностью.',
        },
        viz: {
          title: '3D Визуал',
          desc: 'Рендеры продуктов и абстрактное искусство для веба.',
        }
      }
    },
    capabilities: {
      headline_1: 'МЫ ГОВОРИМ',
      headline_2: 'НА ЯЗЫКЕ ЦИФР',
      desc: 'Мы не просто делаем сайты. Мы проектируем цифровые среды, где эстетика бренда встречается с технической точностью.',
      items: {
        brand: { title: 'Бренд Айдентика', desc: 'Визуальные системы, которые говорят громче слов. Мы создаем логотипы, типографику и цветовые палитры, которые запоминаются.' },
        dev: { title: 'Креативная Разработка', desc: 'No-code, Low-code или Full-code. Мы используем правильные инструменты, создавая опыт на 60fps.' },
        perf: { title: 'Производительность', desc: 'Оптимизировано для скорости. Наши сайты набирают 90+ в Lighthouse, Google любит их так же, как и пользователи.' },
        systems: { title: 'Масштабируемые Системы', desc: 'Мы создаем дизайн-системы, а не просто страницы. Компоненты, которые растут вместе с вашим бизнесом.' },
        mobile: { title: 'Mobile First', desc: 'Адаптивные макеты, которые подстраиваются под любой стеклянный прямоугольник. От 4k мониторов до часов.' },
        integrations: { title: 'Интеграции', desc: 'Бесшовная интеграция с вашей маркетинговой экосистемой. CRM, Email и Социальные сети.' },
      }
    },
    showcase: {
      title: 'ИЗБРАННОЕ',
      subtitle: 'Подборка наших лучших цифровых проектов, отмеченных лидерами индустрии.',
      marquee: 'Дизайн Без Границ • Креативный Инжиниринг •',
      open: 'Открыть',
      viewCase: 'Смотреть Кейс',
      allProjects: 'Все Проекты',
      archiveTitle: 'АРХИВ',
      found: 'ПРОЕКТОВ НАЙДЕНО',
      filter: 'Фильтр',
      notFound: 'Проекты не найдены',
      clearFilters: 'Очистить фильтры',
      all: 'Все',
    },
    process: {
      methodology: 'Наша Методология',
      title: 'ПРОЦЕСС',
      step: 'Этап',
      steps: {
        analysis: { title: 'Анализ', desc: 'Мы деконструируем ДНК вашего бренда, позицию на рынке и потребности пользователей, чтобы создать прочный фундамент.' },
        strategy: { title: 'Стратегия', desc: 'Картирование пути пользователя, технической архитектуры и контент-стратегии для максимального воздействия.' },
        design: { title: 'Дизайн', desc: 'Высокоточные макеты, motion-прототипы и модели взаимодействия, которые вдыхают жизнь в концепцию.' },
        dev: { title: 'Разработка', desc: 'Чистый код, интеграция CMS и тщательное тестирование для производительности 60fps на всех устройствах.' },
        launch: { title: 'Запуск', desc: 'Деплой, SEO-оптимизация, настройка аналитики и полная передача проекта.' },
      }
    },
    manifesto: {
      title: 'МАНИФЕСТ',
      subtitle: 'НАШ ПОДХОД',
      principles: [
        {
          title: 'Радикальная Простота',
          desc: 'Мы убираем лишний шум, чтобы обнажить суть. Простота — это не отсутствие сложности, а ее высшая форма.'
        },
        {
          title: 'Код как Искусство',
          desc: 'Программирование — наш холст. Мы создаем архитектуру с точностью, которая ощущается как магия.'
        },
        {
          title: 'Эмоциональный Отклик',
          desc: 'Если проект не вызывает чувств, это просто данные. Мы проектируем для людей, а не для экранов.'
        },
        {
          title: 'Вне Времени',
          desc: 'Мы не следуем трендам. Мы строим цифровые монументы, которые остаются актуальными годами.'
        }
      ],
      techLabel: 'ТЕХНОЛОГИЧЕСКИЙ СТЕК'
    },
    pricing: {
      tag: 'ПРАЙС-ЛИСТ',
      title1: 'ИНВЕСТИЦИИ В',
      title2: 'ВАШ ЦИФРОВОЙ РОСТ',
      desc: 'Прозрачное ценообразование для проектов любой сложности. Мы создаем инструменты, которые окупаются.',
      cta: 'Обсудить проект',
      duration: 'Срок',
      days: 'дней',
      from: 'от',
      tabs: {
        main: 'Решения',
        packages: 'Пакеты',
        addons: 'Доп. услуги',
        details: 'Подробнее'
      },
      table: {
        type: 'Тип проекта',
        features: 'Что включено',
        duration: 'Сроки',
        price: 'Стоимость'
      },
      order: 'Заказать',
      select: 'Выбрать пакет',
      popular: 'Популярно',
      footerNote: 'Все цены указаны ориентировочно. Финальная стоимость зависит от сложности ТЗ.',
      solutions: {
        landing: { title: 'Landing Page', desc: 'Высококонверсионная страница для продукта или услуги.' },
        business: { title: 'Сайт-визитка', desc: 'Представительский сайт для компании или специалиста (3-7 страниц).' },
        corp: { title: 'Корпоративный сайт', desc: 'Полноценное цифровое представительство бренда.' },
        shop: { title: 'Интернет-магазин', desc: 'Полноценная e-commerce платформа.' }
      },
      packages_data: {
        starter: { title: 'Стартовый', desc: 'Для малого бизнеса и стартапов.' },
        business: { title: 'Бизнес', desc: 'Оптимально для растущих компаний.' },
        premium: { title: 'Премиум', desc: 'Для крупных проектов и e-commerce.' }
      },
      features: {
        landing: 'Лендинг или визитка',
        corp: 'Корпоративный сайт',
        shop: 'Магазин или сложный портал',
        design: 'Индивидуальный дизайн',
        resp: 'Адаптивность',
        forms: 'Формы захвата',
        seo: 'Базовое SEO',
        grid: 'Уникальная сетка',
        copy: 'Копирайтинг',
        inter: 'Интерактивные элементы',
        sys: 'Дизайн-система',
        cms: 'Headless CMS',
        anim: 'Продвинутая анимация',
        crm: 'CRM',
        catalog: 'Каталог',
        pay: 'Платежи',
        account: 'Личный кабинет',
        filters: 'Фильтры',
        hosting: 'Домен + хостинг (3 мес)',
        training: 'Обучение работе с сайтом',
        compSeo: 'Комплексное SEO',
        support3: '3 месяца техподдержки',
        webgl: 'WebGL анимации',
        support6: '6 месяцев поддержки',
        app: 'Мобильное приложение'
      },
      addons_data: {
        copy: 'Копирайтинг',
        multi: 'Мультиязычность',
        seo: 'SEO-оптимизация',
        photo: 'Обработка фото',
        page: 'Доп. страница',
        redesign: 'Редизайн',
        mobile: 'Моб. адаптация',
        changes: 'Внесение изменений',
        support: 'Техподдержка (1 месяц)'
      },
      units: {
        chars: '1000 симв.',
        lang: 'за язык',
        base: 'базовая',
        pcs: '10 шт.',
        page: 'за стр.',
        project: 'проект',
        hour: 'час',
        month: 'мес.'      },
      notes: {
        title: 'Условия работы',
        payment: { title: 'Оплата', desc: '50% предоплата, 50% после сдачи (возможна рассрочка)' },
        urgency: { title: 'Срочность', desc: 'Ускоренное выполнение (+30% к стоимости)' },
        revisions: { title: 'Правки', desc: '2 раунда включены (для проектов от 800 BYN), далее 50-80 BYN/час' },
        warranty: { title: 'Гарантия', desc: 'Исправление ошибок в течение 30 дней' }
      },
      details_data: {
        copy: 'Структура, продающие тексты, адаптация тона под нишу.',
        multi: 'Переключатель языков, дубли страниц, настройка URL и метатегов.',
        seo: 'Подбор ключей, метатеги, robots.txt, sitemap, аналитика.',
        photo: 'Цветокоррекция, ретушь, оптимизация веса без потери качества.',
        page: 'Проектирование, дизайн и верстка новой страницы в общем стиле.',
        redesign: 'Анализ текущего сайта, обновление UX/UI, перенос контента.',
        mobile: 'Исправление верстки, адаптация меню и форм под смартфоны.',
        changes: 'Мелкие доработки: тексты, фото, блоки, настройка модулей.',
        support: 'Мониторинг, устранение багов, обновление плагинов.'
      }
    },
    footer: {
      idea: 'ЕСТЬ ИДЕЯ?',
      tellUs: 'РАССКАЖИТЕ.',
      start: 'Начать Проект',
      socials: 'Соцсети',
      sitemap: 'Карта сайта',
      rights: 'Все права защищены',
      contact: 'Контакты',
    },
    contact: {
      startJourney: 'Начните свой путь',
      buildFuture: 'МЫ СТРОИМ БУДУЩЕЕ.',
      desc: 'Принимаем амбициозные проекты на 2026 год. Ребрендинг или цифровой продукт — мы готовы.',
      contacts: 'Контакты',
      office: 'Офис',
      form: {
        name: '01. Как вас зовут?',
        namePh: 'Иван Петров',
        email: '02. Ваш email?',
        emailPh: 'ivan@company.com',
        budget: '03. Бюджет проекта (BYN)',
        message: '04. Расскажите о проекте',
        messagePh: 'Мы хотим революционизировать...',
        send: 'Отправить',
        sending: 'Отправка...',
      },
      success: {
        title: 'Отправлено',
        desc: 'Спасибо за обращение,',
        desc2: 'Мы рассмотрим вашу заявку и ответим в течение 24 часов.',
        back: 'Вернуться на сайт',
      }
    },
    project: {
      selected: 'Избранный Кейс',
      desc: 'Создание цифрового шедевра для будущего в сфере',
      category: 'Категория',
      timeline: 'Сроки',
      tech: 'Технологии',
      weeks: 'Недели',
      seeLive: 'Смотреть Live',
      next: 'Далее',
      backToArchive: 'Вернуться в Архив',
      mainDesc: {
        title: 'Переосмысление цифрового ландшафта через иммерсивное взаимодействие и смелую типографику.',
        p1: 'Цель состояла в том, чтобы создать цифровой опыт, отражающий физическое качество архитектуры бренда. Мы использовали WebGL для создания плавной, невесомой системы навигации, позволяющей пользователям исследовать проекты в 3D-пространстве.',
        p2: 'Убрав стандартные условности UI, мы сосредоточились на самом контенте — позволив изображениям вести повествование. Каждое взаимодействие было тщательно проработано для обеспечения производительности 60 кадров в секунду на всех устройствах.'
      },
      client: 'Клиент',
      year: 'Год',
      servicesLabel: 'Услуги',
      link: 'Ссылка',
      visitSite: 'Посетить сайт',
      inDev: 'В разработке',
      overview: 'Обзор',
      gallery: 'Галерея',
      swipe: 'Свайп / Скролл',
      prevProject: 'Пред. Проект',
      nextProject: 'След. Проект',
      swipeClick: 'СВАЙП ИЛИ КЛИК',
      prev: 'НАЗАД',
    },
    preloader: {
      system: 'Статус Системы',
      init: 'Инициализация...',
      ready: 'Готово',
      assets: 'Загрузка Ассетов...',
      opt: 'Оптимизация WebGL...',
    }
  },
  en: {
    nav: {
      work: 'Work',
      services: 'Services',
      manifesto: 'Manifesto',
      stack: 'Manifesto',
      capabilities: 'Capabilities',
      discuss: 'Let\'s Talk',
      startProject: 'Start Project',
      menu: 'Menu',
    },
    hero: {
      tagline: 'Design Engineering Studio',
      digital: 'ABSOLUTE',
      typewriter: ['DESIGN', 'WEBSITES', 'FUTURE', 'DIGITAL', 'ART'],
      mastery: 'MASTERY',
      badge: '• Showreel • Play • 2026 •',
      viewWork: 'View Projects',
      mission: 'We fuse radical design with robust engineering to create digital products that don\'t just exist—they dominate attention space.',
      hud: {
        loc: 'MSQ / MSK',
        est: 'EST. 2025',
        scroll: 'SCROLL_DOWN [ v ]',
        coords: '53.90° N, 27.56° E'
      }
    },
    designCanvas: {
      openUniverse: 'Open Universe',
    },
    services: {
      title: 'OUR EXPERTISE',
      manifest: '[SERVICES_MANIFEST_V2.0]',
      subtitle: 'WE CREATE DIGITAL PRODUCTS THAT DEFINE THE INDUSTRY.',
      items: {
        uiux: {
          title: 'UI/UX Design',
          desc: 'We create interfaces that feel natural, look stunning, and work flawlessly on any device.',
        },
        web: {
          title: 'Web Experience',
          desc: 'Immersive websites that tell your brand story through animation and interaction.',
        },
        code: {
          title: 'Creative Code',
          desc: 'WebGL, Three.js, and React for maximum performance.',
        },
        app: {
          title: 'Mobile App',
          desc: 'Native applications with cross-platform efficiency.',
        },
        viz: {
          title: '3D Visuals',
          desc: 'Product renders and abstract art for the web.',
        }
      }
    },
    capabilities: {
      headline_1: 'WE SPEAK',
      headline_2: 'FLUENT DIGITAL',
      desc: 'We don\'t just make websites. We design digital environments where brand aesthetics meet technical precision.',
      items: {
        brand: { title: 'Brand Identity', desc: 'Visual systems that speak louder than words. We create logos, typography, and color palettes that stick.' },
        dev: { title: 'Creative Development', desc: 'No-code, Low-code, or Full-code. We use the right tools to create 60fps experiences.' },
        perf: { title: 'Performance', desc: 'Optimized for speed. Our sites score 90+ on Lighthouse; Google loves them as much as users do.' },
        systems: { title: 'Scalable Systems', desc: 'We build design systems, not just pages. Components that grow with your business.' },
        mobile: { title: 'Mobile First', desc: 'Responsive layouts that adapt to any glass rectangle. From 4k monitors to watches.' },
        integrations: { title: 'Integrations', desc: 'Seamless integration with your marketing ecosystem. CRM, Email, and Social Media.' },
      }
    },
    showcase: {
      title: 'SELECTED',
      subtitle: 'A selection of our best digital projects, recognized by industry leaders.',
      marquee: 'Design Without Limits • Creative Engineering •',
      open: 'Open',
      viewCase: 'View Case',
      allProjects: 'All Projects',
      archiveTitle: 'ARCHIVE',
      found: 'PROJECTS FOUND',
      filter: 'Filter',
      notFound: 'No projects found',
      clearFilters: 'Clear filters',
      all: 'All',
    },
    process: {
      methodology: 'Our Methodology',
      title: 'PROCESS',
      step: 'Step',
      steps: {
        analysis: { title: 'Analysis', desc: 'We deconstruct your brand DNA, market position, and user needs to build a solid foundation.' },
        strategy: { title: 'Strategy', desc: 'Mapping user journeys, technical architecture, and content strategy for maximum impact.' },
        design: { title: 'Design', desc: 'High-fidelity mockups, motion prototypes, and interaction models that breathe life into the concept.' },
        dev: { title: 'Development', desc: 'Clean code, CMS integration, and rigorous testing for 60fps performance on all devices.' },
        launch: { title: 'Launch', desc: 'Deployment, SEO optimization, analytics setup, and full project handover.' },
      }
    },
    manifesto: {
      title: 'MANIFESTO',
      subtitle: 'OUR APPROACH',
      principles: [
        {
          title: 'Radical Simplicity',
          desc: 'We strip away the noise to reveal the core essence. Simplicity is not the absence of complexity, but its highest form.'
        },
        {
          title: 'Code as Art',
          desc: 'Programming is our canvas. We build architecture with precision that feels like magic.'
        },
        {
          title: 'Emotional Impact',
          desc: 'If it doesn\'t make you feel something, it\'s just data. We design for humans, not just screens.'
        },
        {
          title: 'Future-Proof',
          desc: 'We don\'t follow trends. We build digital monuments that stand the test of time.'
        }
      ],
      techLabel: 'TECH STACK'
    },
    pricing: {
      tag: 'PRICING',
      title1: 'INVESTMENT IN',
      title2: 'YOUR DIGITAL GROWTH',
      desc: 'Transparent pricing for projects of any complexity. We create tools that pay off.',
      cta: 'Discuss Project',
      duration: 'Timeline',
      days: 'days',
      from: 'from',
      tabs: {
        main: 'Solutions',
        packages: 'Packages',
        addons: 'Add-ons',
        details: 'Details'
      },
      table: {
        type: 'Project Type',
        features: 'What\'s Included',
        duration: 'Timeline',
        price: 'Investment'
      },
      order: 'Order',
      select: 'Select Package',
      popular: 'Most Popular',
      footerNote: 'All prices are estimates. Final cost depends on project complexity.',
      solutions: {
        landing: { title: 'Landing Page', desc: 'High-converting page for a product or service.' },
        business: { title: 'Business Card', desc: 'Representative site for a company or specialist (3-7 pages).' },
        corp: { title: 'Corporate Site', desc: 'Full digital representation of the brand.' },
        shop: { title: 'Online Store', desc: 'Full e-commerce platform.' }
      },
      packages_data: {
        starter: { title: 'Starter', desc: 'For small businesses and startups.' },
        business: { title: 'Business', desc: 'Optimal for growing companies.' },
        premium: { title: 'Premium', desc: 'For large projects and e-commerce.' }
      },
      features: {
        landing: 'Landing or Business Card',
        corp: 'Corporate Website',
        shop: 'Store or Complex Portal',
        design: 'Custom Design',
        resp: 'Responsiveness',
        forms: 'Lead Forms',
        seo: 'Basic SEO',
        grid: 'Unique Grid',
        copy: 'Copywriting',
        inter: 'Interactive Elements',
        sys: 'Design System',
        cms: 'Headless CMS',
        anim: 'Advanced Animation',
        crm: 'CRM',
        catalog: 'Catalog',
        pay: 'Payments',
        account: 'Personal Account',
        filters: 'Filters',
        hosting: 'Domain + Hosting (3 mo)',
        training: 'Site Management Training',
        compSeo: 'Complex SEO',
        support3: '3 Months Support',
        webgl: 'WebGL Animations',
        support6: '6 Months Support',
        app: 'Mobile App'
      },
      addons_data: {
        copy: 'Copywriting',
        multi: 'Multilingual',
        seo: 'SEO Optimization',
        photo: 'Photo Processing',
        page: 'Extra Page',
        redesign: 'Redesign',
        mobile: 'Mobile Adaptation',
        changes: 'Making changes',
        support: 'Technical Support (1 month)'
      },
      units: {
        chars: '1000 chars',
        lang: 'per lang',
        base: 'basic',
        pcs: '10 pcs',
        page: 'per page',
        project: 'project',
        hour: 'hour',
        month: 'mo.'
      },
      notes: {
        title: 'Terms & Conditions',
        payment: { title: 'Payment', desc: '50% upfront, 50% upon completion (installments available)' },
        urgency: { title: 'Urgency', desc: 'Expedited delivery (+30% to the cost)' },
        revisions: { title: 'Revisions', desc: '2 rounds included (for projects over 800 BYN), then 50-80 BYN/hour' },
        warranty: { title: 'Warranty', desc: 'Technical bug fixes for 30 days after launch' }
      },
      details_data: {
        copy: 'Structure, sales texts, tone adaptation to the niche.',
        multi: 'Language switcher, page duplicates, URL and meta tags setup.',
        seo: 'Keyword selection, meta tags, robots.txt, sitemap, analytics.',
        photo: 'Color correction, retouching, weight optimization without quality loss.',
        page: 'Planning, design and layout of a new page in the general style.',
        redesign: 'Analysis of the current site, UX/UI update, content transfer.',
        mobile: 'Layout correction, adaptation of menus and forms for smartphones.',
        changes: 'Minor improvements: texts, photos, blocks, module setup.',
        support: 'Monitoring, bug fixing, plugin and security updates.'
      }
    },
    footer: {
      idea: 'HAVE AN IDEA?',
      tellUs: 'TELL US.',
      start: 'Start Project',
      socials: 'Socials',
      sitemap: 'Sitemap',
      rights: 'All rights reserved',
      contact: 'Contact',
    },
    contact: {
      startJourney: 'Start your journey',
      buildFuture: 'WE BUILD THE FUTURE.',
      desc: 'Accepting ambitious projects for 2026. Rebranding or digital product — we are ready.',
      contacts: 'Contacts',
      office: 'Office',
      form: {
        name: '01. What is your name?',
        namePh: 'John Doe',
        email: '02. Your email?',
        emailPh: 'john@company.com',
        budget: '03. Project Budget (BYN)',
        message: '04. Tell us about the project',
        messagePh: 'We want to revolutionize...',
        send: 'Send',
        sending: 'Sending...',
      },
      success: {
        title: 'Sent',
        desc: 'Thank you for reaching out,',
        desc2: 'We will review your request and get back to you within 24 hours.',
        back: 'Back to site',
      }
    },
    project: {
      selected: 'Selected Case',
      desc: 'Creating a digital masterpiece for the future in',
      category: 'Category',
      timeline: 'Timeline',
      tech: 'Technologies',
      weeks: 'Weeks',
      seeLive: 'See Live',
      next: 'Next',
      backToArchive: 'Back to Archive',
      mainDesc: {
        title: 'Reimagining the digital landscape through immersive interaction and bold typography.',
        p1: 'The goal was to create a digital experience that reflects the physical quality of the brand architecture. We used WebGL to create a smooth, weightless navigation system allowing users to explore projects in 3D space.',
        p2: 'Removing standard UI conventions, we focused on the content itself — allowing images to lead the narrative. Every interaction was meticulously crafted to ensure 60fps performance across all devices.'
      },
      client: 'Client',
      year: 'Year',
      servicesLabel: 'Services',
      link: 'Link',
      visitSite: 'Visit Site',
      inDev: 'In Development',
      overview: 'Overview',
      gallery: 'Photo Gallery',
      swipe: 'Swipe / Scroll',
      prevProject: 'Prev Project',
      nextProject: 'Next Project',
      swipeClick: 'SWIPE OR CLICK',
      prev: 'PREV',
    },
    preloader: {
      system: 'System Status',
      init: 'Initializing...',
      ready: 'Ready',
      assets: 'Loading Assets...',
      opt: 'Optimizing WebGL...',
    }
  }
};