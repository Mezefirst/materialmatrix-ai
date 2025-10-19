export type Language = 'en' | 'sv' | 'fr' | 'ar' | 'am'

export interface Translations {
  landing: {
    title: string
    subtitle: string
    description: string
    features: {
      title: string
      aiPrediction: {
        title: string
        description: string
      }
      optimization: {
        title: string
        description: string
      }
      sustainability: {
        title: string
        description: string
      }
      polymer: {
        title: string
        description: string
      }
    }
    cta: {
      getStarted: string
      learnMore: string
    }
    stats: {
      materials: string
      elements: string
      predictions: string
      accuracy: string
    }
  }
  nav: {
    home: string
    features: string
    about: string
    language: string
  }
  app: {
    materialTailoringPlatform: string
    aiPoweredMaterialDesign: string
    newMaterial: string
    export: string
    viewResults: string
    findByProperty: string
    elementsAlloys: string
    polymers: string
    periodicTable: string
    materialDatabase: string
    materialBuilder: string
    materialName: string
    enterMaterialName: string
    category: string
    confidence: string
    saveMaterial: string
    savePolymer: string
    savedMaterials: string
    edit: string
    results: string
    getRecommendations: string
    analyzeComposition: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    landing: {
      title: 'Material Tailoring Platform',
      subtitle: 'AI-Powered Material Design & Optimization',
      description: 'Design, simulate, and optimize novel materials with advanced AI predictions, multi-objective optimization, and comprehensive sustainability analysis.',
      features: {
        title: 'Powerful Features for Material Innovation',
        aiPrediction: {
          title: 'AI Property Prediction',
          description: 'Instantly predict mechanical, electrical, and chemical properties with confidence scores using advanced machine learning models.'
        },
        optimization: {
          title: 'Multi-Objective Optimization',
          description: 'Balance performance, cost, sustainability, and availability to find the optimal material composition for your needs.'
        },
        sustainability: {
          title: 'Sustainability Analysis',
          description: 'Comprehensive environmental impact assessment including recyclability, carbon footprint, toxicity, and resource availability.'
        },
        polymer: {
          title: 'Polymer Development',
          description: 'Design custom polymers from monomers with controlled architecture, crosslinking, and thermal property predictions.'
        }
      },
      cta: {
        getStarted: 'Get Started',
        learnMore: 'Learn More'
      },
      stats: {
        materials: 'Materials',
        elements: 'Elements',
        predictions: 'AI Predictions',
        accuracy: 'Accuracy'
      }
    },
    nav: {
      home: 'Home',
      features: 'Features',
      about: 'About',
      language: 'Language'
    },
    app: {
      materialTailoringPlatform: 'Material Tailoring Platform',
      aiPoweredMaterialDesign: 'AI-Powered Material Design & Optimization',
      newMaterial: 'New',
      export: 'Export',
      viewResults: 'View Results',
      findByProperty: 'Find by Property',
      elementsAlloys: 'Elements & Alloys',
      polymers: 'Polymers',
      periodicTable: 'Periodic Table',
      materialDatabase: 'Material Database',
      materialBuilder: 'Material Builder',
      materialName: 'Material Name',
      enterMaterialName: 'Enter material name...',
      category: 'category',
      confidence: 'Confidence',
      saveMaterial: 'Save Material',
      savePolymer: 'Save Polymer',
      savedMaterials: 'Saved Materials',
      edit: 'Edit',
      results: 'Results',
      getRecommendations: 'Get Recommendations',
      analyzeComposition: 'Analyze Composition'
    }
  },
  sv: {
    landing: {
      title: 'Materialanpassningsplattform',
      subtitle: 'AI-driven materialdesign och optimering',
      description: 'Designa, simulera och optimera nya material med avancerade AI-prediktioner, multi-objektiv optimering och omfattande hållbarhetsanalys.',
      features: {
        title: 'Kraftfulla funktioner för materialinnovation',
        aiPrediction: {
          title: 'AI-egenskapsprediktion',
          description: 'Förutsäg omedelbart mekaniska, elektriska och kemiska egenskaper med konfidenspoäng med hjälp av avancerade maskininlärningsmodeller.'
        },
        optimization: {
          title: 'Multi-objektiv optimering',
          description: 'Balansera prestanda, kostnad, hållbarhet och tillgänglighet för att hitta den optimala materialsammansättningen för dina behov.'
        },
        sustainability: {
          title: 'Hållbarhetsanalys',
          description: 'Omfattande miljöpåverkansbedömning inklusive återvinningsbarhet, koldioxidavtryck, toxicitet och resurstillgänglighet.'
        },
        polymer: {
          title: 'Polymerutveckling',
          description: 'Designa anpassade polymerer från monomerer med kontrollerad arkitektur, tvärbindning och termiska egenskapsprediktioner.'
        }
      },
      cta: {
        getStarted: 'Kom igång',
        learnMore: 'Läs mer'
      },
      stats: {
        materials: 'Material',
        elements: 'Element',
        predictions: 'AI-prediktioner',
        accuracy: 'Noggrannhet'
      }
    },
    nav: {
      home: 'Hem',
      features: 'Funktioner',
      about: 'Om',
      language: 'Språk'
    },
    app: {
      materialTailoringPlatform: 'Materialanpassningsplattform',
      aiPoweredMaterialDesign: 'AI-driven materialdesign och optimering',
      newMaterial: 'Ny',
      export: 'Exportera',
      viewResults: 'Visa resultat',
      findByProperty: 'Sök efter egenskap',
      elementsAlloys: 'Element och legeringar',
      polymers: 'Polymerer',
      periodicTable: 'Periodiska systemet',
      materialDatabase: 'Materialdatabas',
      materialBuilder: 'Materialbyggare',
      materialName: 'Materialnamn',
      enterMaterialName: 'Ange materialnamn...',
      category: 'kategori',
      confidence: 'Förtroende',
      saveMaterial: 'Spara material',
      savePolymer: 'Spara polymer',
      savedMaterials: 'Sparade material',
      edit: 'Redigera',
      results: 'Resultat',
      getRecommendations: 'Få rekommendationer',
      analyzeComposition: 'Analysera sammansättning'
    }
  },
  fr: {
    landing: {
      title: 'Plateforme de conception de matériaux',
      subtitle: 'Conception et optimisation de matériaux alimentées par l\'IA',
      description: 'Concevez, simulez et optimisez de nouveaux matériaux avec des prédictions d\'IA avancées, une optimisation multi-objectifs et une analyse complète de durabilité.',
      features: {
        title: 'Fonctionnalités puissantes pour l\'innovation matérielle',
        aiPrediction: {
          title: 'Prédiction de propriétés par IA',
          description: 'Prédisez instantanément les propriétés mécaniques, électriques et chimiques avec des scores de confiance en utilisant des modèles d\'apprentissage automatique avancés.'
        },
        optimization: {
          title: 'Optimisation multi-objectifs',
          description: 'Équilibrez performance, coût, durabilité et disponibilité pour trouver la composition matérielle optimale pour vos besoins.'
        },
        sustainability: {
          title: 'Analyse de durabilité',
          description: 'Évaluation complète de l\'impact environnemental incluant la recyclabilité, l\'empreinte carbone, la toxicité et la disponibilité des ressources.'
        },
        polymer: {
          title: 'Développement de polymères',
          description: 'Concevez des polymères personnalisés à partir de monomères avec une architecture contrôlée, une réticulation et des prédictions de propriétés thermiques.'
        }
      },
      cta: {
        getStarted: 'Commencer',
        learnMore: 'En savoir plus'
      },
      stats: {
        materials: 'Matériaux',
        elements: 'Éléments',
        predictions: 'Prédictions IA',
        accuracy: 'Précision'
      }
    },
    nav: {
      home: 'Accueil',
      features: 'Fonctionnalités',
      about: 'À propos',
      language: 'Langue'
    },
    app: {
      materialTailoringPlatform: 'Plateforme de conception de matériaux',
      aiPoweredMaterialDesign: 'Conception et optimisation de matériaux alimentées par l\'IA',
      newMaterial: 'Nouveau',
      export: 'Exporter',
      viewResults: 'Voir les résultats',
      findByProperty: 'Rechercher par propriété',
      elementsAlloys: 'Éléments et alliages',
      polymers: 'Polymères',
      periodicTable: 'Tableau périodique',
      materialDatabase: 'Base de données de matériaux',
      materialBuilder: 'Constructeur de matériaux',
      materialName: 'Nom du matériau',
      enterMaterialName: 'Entrez le nom du matériau...',
      category: 'catégorie',
      confidence: 'Confiance',
      saveMaterial: 'Enregistrer le matériau',
      savePolymer: 'Enregistrer le polymère',
      savedMaterials: 'Matériaux enregistrés',
      edit: 'Modifier',
      results: 'Résultats',
      getRecommendations: 'Obtenir des recommandations',
      analyzeComposition: 'Analyser la composition'
    }
  },
  ar: {
    landing: {
      title: 'منصة تصميم المواد',
      subtitle: 'تصميم وتحسين المواد بالذكاء الاصطناعي',
      description: 'صمم وحاكي وحسّن مواد جديدة باستخدام تنبؤات الذكاء الاصطناعي المتقدمة، والتحسين متعدد الأهداف، وتحليل الاستدامة الشامل.',
      features: {
        title: 'ميزات قوية للابتكار في المواد',
        aiPrediction: {
          title: 'التنبؤ بالخصائص بالذكاء الاصطناعي',
          description: 'تنبأ فورًا بالخصائص الميكانيكية والكهربائية والكيميائية مع درجات الثقة باستخدام نماذج التعلم الآلي المتقدمة.'
        },
        optimization: {
          title: 'التحسين متعدد الأهداف',
          description: 'وازن بين الأداء والتكلفة والاستدامة والتوفر للعثور على تركيبة المواد المثلى لاحتياجاتك.'
        },
        sustainability: {
          title: 'تحليل الاستدامة',
          description: 'تقييم شامل للأثر البيئي بما في ذلك إمكانية إعادة التدوير، وبصمة الكربون، والسمية، وتوافر الموارد.'
        },
        polymer: {
          title: 'تطوير البوليمرات',
          description: 'صمم بوليمرات مخصصة من المونومرات مع بنية محكمة، وربط متقاطع، وتنبؤات بالخصائص الحرارية.'
        }
      },
      cta: {
        getStarted: 'ابدأ الآن',
        learnMore: 'اعرف المزيد'
      },
      stats: {
        materials: 'المواد',
        elements: 'العناصر',
        predictions: 'تنبؤات الذكاء الاصطناعي',
        accuracy: 'الدقة'
      }
    },
    nav: {
      home: 'الرئيسية',
      features: 'الميزات',
      about: 'حول',
      language: 'اللغة'
    },
    app: {
      materialTailoringPlatform: 'منصة تصميم المواد',
      aiPoweredMaterialDesign: 'تصميم وتحسين المواد بالذكاء الاصطناعي',
      newMaterial: 'جديد',
      export: 'تصدير',
      viewResults: 'عرض النتائج',
      findByProperty: 'البحث بالخاصية',
      elementsAlloys: 'العناصر والسبائك',
      polymers: 'البوليمرات',
      periodicTable: 'الجدول الدوري',
      materialDatabase: 'قاعدة بيانات المواد',
      materialBuilder: 'منشئ المواد',
      materialName: 'اسم المادة',
      enterMaterialName: 'أدخل اسم المادة...',
      category: 'الفئة',
      confidence: 'الثقة',
      saveMaterial: 'حفظ المادة',
      savePolymer: 'حفظ البوليمر',
      savedMaterials: 'المواد المحفوظة',
      edit: 'تحرير',
      results: 'النتائج',
      getRecommendations: 'الحصول على توصيات',
      analyzeComposition: 'تحليل التركيب'
    }
  },
  am: {
    landing: {
      title: 'የቁሳቁስ ዲዛይን መድረክ',
      subtitle: 'በ AI የተጎለበተ የቁሳቁስ ዲዛይን እና ማሻሻያ',
      description: 'የላቀ AI ትንበያዎች፣ ባለብዙ-ዓላማ ማሻሻያ እና አጠቃላይ ዘላቂነት ትንታኔዎችን በመጠቀም አዲስ ቁሳቁሶችን ይንደፉ፣ ይምሰሉ እና ያሻሽሉ።',
      features: {
        title: 'ለቁሳቁስ ፈጠራ ኃይለኛ ባህሪያት',
        aiPrediction: {
          title: 'AI ንብረት ትንበያ',
          description: 'የላቀ ማሽን ለርኒንግ ሞዴሎችን በመጠቀም የሜካኒካል፣ የኤሌክትሪክ እና የኬሚካል ባህሪያትን በራስ መተማመን ውጤቶች ወዲያውኑ ይተንብዩ።'
        },
        optimization: {
          title: 'ባለብዙ-ዓላማ ማሻሻያ',
          description: 'ለፍላጎትዎ ተስማሚ የሆነውን የቁሳቁስ ውህድ ለማግኘት አፈጻጸም፣ ወጪ፣ ዘላቂነት እና ተገኝነት ይሚዛኑ።'
        },
        sustainability: {
          title: 'የዘላቂነት ትንተና',
          description: 'እንደገና ጥቅም ላይ የመዋል ችሎታ፣ የካርቦን አሸራ፣ መርዛማነት እና የሀብት ተገኝነትን ጨምሮ አጠቃላይ የአካባቢ ተፅእኖ ግምገማ።'
        },
        polymer: {
          title: 'ፖሊመር ልማት',
          description: 'ከሞኖመሮች ጋር የታዘዙ ፖሊመሮችን በተቆጣጠረ አርክቴክቸር፣ የተሻገረ ማገናኛ እና የሙቀት ንብረት ትንበያዎች ይንደፉ።'
        }
      },
      cta: {
        getStarted: 'ይጀምሩ',
        learnMore: 'የበለጠ ይወቁ'
      },
      stats: {
        materials: 'ቁሳቁሶች',
        elements: 'ንጥረ ነገሮች',
        predictions: 'AI ትንበያዎች',
        accuracy: 'ትክክለኛነት'
      }
    },
    nav: {
      home: 'ዋና ገጽ',
      features: 'ባህሪያት',
      about: 'ስለ',
      language: 'ቋንቋ'
    },
    app: {
      materialTailoringPlatform: 'የቁሳቁስ ዲዛይን መድረክ',
      aiPoweredMaterialDesign: 'በ AI የተጎለበተ የቁሳቁስ ዲዛይን እና ማሻሻያ',
      newMaterial: 'አዲስ',
      export: 'ወደ ውጭ መላክ',
      viewResults: 'ውጤቶችን ይመልከቱ',
      findByProperty: 'በንብረት ይፈልጉ',
      elementsAlloys: 'ንጥረ ነገሮች እና ውህዶች',
      polymers: 'ፖሊመሮች',
      periodicTable: 'ጊዜያዊ ሰንጠረዥ',
      materialDatabase: 'የቁሳቁስ የውሂብ ጎታ',
      materialBuilder: 'የቁሳቁስ ገንቢ',
      materialName: 'የቁሳቁስ ስም',
      enterMaterialName: 'የቁሳቁስ ስም ያስገቡ...',
      category: 'ምድብ',
      confidence: 'እምነት',
      saveMaterial: 'ቁሳቁስ አስቀምጥ',
      savePolymer: 'ፖሊመር አስቀምጥ',
      savedMaterials: 'የተቀመጡ ቁሳቁሶች',
      edit: 'አርትዕ',
      results: 'ውጤቶች',
      getRecommendations: 'ምክሮችን ያግኙ',
      analyzeComposition: 'ውህደትን ይተንትኑ'
    }
  }
}

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.en
}
