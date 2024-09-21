const mongoose = require("mongoose");

const engineTypeSchema = new mongoose.Schema(
  {
    typeName: { type: String, required: true },
  },
  {
    collection: "engine_types",
    timestamps: true,
  }
);

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    categoryPhoto: { type: String },
    addedDate: { type: Date, default: Date.now },
  },
  {
    collection: "categories",
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: Boolean, default: true, nullable: true },
    description: { type: String, required: true },
    count: { type: Number, nullable: true },
    specifications: { type: String, required: true },
    quality: { type: String, nullable: true },
    engine: [{ type: mongoose.Types.ObjectId, ref: "EngineType" }],
    advantages: { type: String },
    color: { type: String, nullable: true },
    file: { type: String, nullable: true },
    partner: {
      type: mongoose.Types.ObjectId,
      ref: "Partner",
      nullable: true,
    },
    saeStatus: { type: String, nullable: true },
    line: { type: String, nullable: true },
    useType: { type: String, nullable: true },
    category: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
  },
  {
    collection: "products",
  }
);

const physChemCompositionSetSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    compName: { type: String, nullable: true },
    description: { type: String, nullable: true },
    testResult: { type: String, nullable: true },
  },
  {
    collection: "phys_chem_composition_sets",
  }
);

const productPhotoSchema = new mongoose.Schema(
  {
    volume: { type: String, required: true },
    volumePhoto: { type: String },
    volumePrice: { type: Number, nullable: true },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    first: { type: Boolean, default: false },
  },
  {
    collection: "product_photos",
  }
);

const physChemComponentSchema = new mongoose.Schema(
  {
    compositionSet: {
      type: mongoose.Types.ObjectId,
      ref: "PhysChemCompositionSet",
      required: true,
    },
    name: { type: String, nullable: true },
    percentage: { type: mongoose.Types.Decimal128, nullable: true },
    description: { type: String, nullable: true },
  },
  {
    collection: "phys_chem_components",
  }
);

const mainPageSchema = new mongoose.Schema(
  {
    banner: { type: Boolean },
    contacts: { type: Boolean },
    categoryBlock: { type: Boolean },
    hitOfSell: { type: Boolean },
    newsellers: { type: Boolean },
    hotSale: { type: Boolean },
  },
  {
    collection: "main_page",
  }
);

const bannerSchema = new mongoose.Schema(
  {
    bannerText: { type: String, required: true },
    bannerImage: { type: String, required: true },
    bannerButton: { type: String },
    bannerButtonLink: { type: String },
  },
  {
    collection: "banners",
  }
);

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String },
  },
  {
    collection: "faqs",
  }
);

const feedbackSchema = new mongoose.Schema(
  {
    clientName: { type: String },
    feedbackText: { type: String },
    publishDate: { type: Date },
  },
  {
    collection: "feedbacks",
  }
);

const clientRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String },
    requestText: { type: String },
    status: { type: String, enum: ["new", "done"], nullable: true },
    addedDate: { type: Date, default: Date.now },
  },
  {
    collection: "client_requests",
  }
);

const aboutCompanySchema = new mongoose.Schema(
  {
    mainAbout: { type: String },
    history: { type: String },
    ages: { type: String },
    historyPhoto: { type: String },
    address: { type: String },
    addedDate: { type: Date, default: Date.now },
  },
  {
    collection: "about_company",
  }
);

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String },
    littleText: { type: String },
    photo: { type: String },
    about: {
      type: mongoose.Types.ObjectId,
      ref: "AboutCompany",
      nullable: true,
    },
    addedDate: { type: Date, default: Date.now },
  },
  {
    collection: "achievements",
  }
);

const missionSchema = new mongoose.Schema(
  {
    littleText: { type: String },
    photo: { type: String },
    about: {
      type: mongoose.Types.ObjectId,
      ref: "AboutCompany",
      nullable: true,
    },
    addedDate: { type: Date, default: Date.now },
  },
  {
    collection: "missions",
  }
);

const phoneNumbersSchema = new mongoose.Schema(
  {
    contactNumber: { type: String },
    status: { type: Boolean, default: true },
    addedDate: { type: Date, default: Date.now },
  },
  {
    collection: "phone_numbers",
  }
);

const emailSchema = new mongoose.Schema(
  {
    email: { type: String },
    status: { type: Boolean, default: true },
    addedDate: { type: Date, default: Date.now },
  },
  {
    collection: "emails",
  }
);

const topSaleSchema = new mongoose.Schema(
  {
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  {
    collection: "top_sales",
  }
);

const topSale1Schema = new mongoose.Schema(
  {
    productSale: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  {
    collection: "top_sales1",
  }
);

const currencySchema = new mongoose.Schema(
  {
    currencyRate: { type: Number },
  },
  {
    collection: "currencies",
  }
);

const partnerSchema = new mongoose.Schema(
  {
    partnerName: { type: String },
    partnerLogo: { type: String },
    partnerCity: { type: String },
    partnerUrl: { type: String, nullable: true },
    partnerInfo: { type: String, nullable: true },
  },
  {
    collection: "partners",
  }
);

module.exports = {
  EngineType: mongoose.model("EngineType", engineTypeSchema),
  Category: mongoose.model("Category", categorySchema),
  Product: mongoose.model("Product", productSchema),
  PhysChemCompositionSet: mongoose.model(
    "PhysChemCompositionSet",
    physChemCompositionSetSchema
  ),
  ProductPhoto: mongoose.model("ProductPhoto", productPhotoSchema),
  PhysChemComponent: mongoose.model(
    "PhysChemComponent",
    physChemComponentSchema
  ),
  MainPage: mongoose.model("MainPage", mainPageSchema),
  Banner: mongoose.model("Banner", bannerSchema),
  FAQ: mongoose.model("FAQ", faqSchema),
  Feedback: mongoose.model("Feedback", feedbackSchema),
  ClientRequest: mongoose.model("ClientRequest", clientRequestSchema),
  AboutCompany: mongoose.model("AboutCompany", aboutCompanySchema),
  Achievement: mongoose.model("Achievement", achievementSchema),
  Mission: mongoose.model("Mission", missionSchema),
  PhoneNumber: mongoose.model("PhoneNumber", phoneNumbersSchema),
  Email: mongoose.model("Email", emailSchema),
  TopSale: mongoose.model("TopSale", topSaleSchema),
  TopSale1: mongoose.model("TopSale1", topSale1Schema),
  Currency: mongoose.model("Currency", currencySchema),
  Partner: mongoose.model("Partner", partnerSchema),
};
