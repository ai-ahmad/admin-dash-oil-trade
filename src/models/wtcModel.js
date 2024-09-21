const mongoose = require("mongoose");


const engineTypeSchema = new mongoose.Schema(
  {
    typeName: { type: String, required: true, maxlength: 335 },
  },
  { collection: "engineTypes" }
);

const EngineType = mongoose.model("EngineType", engineTypeSchema);


const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, maxlength: 255 },
    categoryPhoto: { type: String, required: true },
    addedDate: { type: Date, default: Date.now },
  },
  { collection: "categories" }
);

const Category = mongoose.model("Category", categorySchema);


const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 255 },
    status: { type: Boolean, default: true },
    description: { type: String, required: true },
    count: { type: Number, default: 0 },
    specifications: { type: String, required: true, maxlength: 255 },
    kachestvo: { type: String, maxlength: 255 },
    engine: [{ type: mongoose.Schema.Types.ObjectId, ref: "EngineType" }],
    advantages: { type: String, required: true },
    color: { type: String, maxlength: 100 },
    file: { type: String }, // Adjust path handling for files
    partner: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    saeStatus: { type: String, maxlength: 255 },
    line: { type: String, maxlength: 255 },
    useType: { type: String, maxlength: 255 },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { collection: "products" }
);

const Product = mongoose.model("Product", productSchema);


const physChemCompositionSetSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    compName: { type: String, maxlength: 255 },
    description: { type: String, maxlength: 255 },
    testResult: { type: String, maxlength: 255 },
  },
  { collection: "physChemCompositionSets" }
);

const PhysChemCompositionSet = mongoose.model(
  "PhysChemCompositionSet",
  physChemCompositionSetSchema
);


const productPhotoSchema = new mongoose.Schema(
  {
    volume: { type: String, maxlength: 255 },
    volumePhoto: { type: String },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    first: { type: Boolean, default: false },
  },
  { collection: "productPhotos" }
);

const ProductPhoto = mongoose.model("ProductPhoto", productPhotoSchema);


const physChemComponentSchema = new mongoose.Schema(
  {
    compositionSet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhysChemCompositionSet",
    },
    name: { type: String },
    percentage: { type: mongoose.Decimal128 },
    description: { type: String },
  },
  { collection: "physChemComponents" }
);

const PhysChemComponent = mongoose.model(
  "PhysChemComponent",
  physChemComponentSchema
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
  { collection: "mainPages" }
);

const MainPage = mongoose.model("MainPage", mainPageSchema);


const bannerSchema = new mongoose.Schema(
  {
    bannerText: { type: String, required: true },
    bannerImage: { type: String },
    bannerButton: { type: String, required: true },
    bannerButtonLink: { type: String, required: true },
  },
  { collection: "banners" }
);

const Banner = mongoose.model("Banner", bannerSchema);


const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, maxlength: 550 },
    answer: { type: String, required: true },
  },
  { collection: "faqs" }
);

const FAQ = mongoose.model("FAQ", faqSchema);


const feedbackSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, maxlength: 550 },
    feedbackText: { type: String, required: true },
    publishDate: { type: Date, default: Date.now },
  },
  { collection: "feedbacks" }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);


const clientRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, maxlength: 550 },
    phoneNumber: { type: String, required: true, maxlength: 550 },
    email: { type: String, required: true },
    requestText: { type: String, required: true },
    status: { type: String, enum: ["new", "done"], default: "new" },
    addedDate: { type: Date, default: Date.now },
  },
  { collection: "clientRequests" }
);

const ClientRequest = mongoose.model("ClientRequest", clientRequestSchema);


const aboutCompanySchema = new mongoose.Schema(
  {
    mainAbout: { type: String, required: true },
    history: { type: String, required: true },
    address: { type: String, required: true, maxlength: 550 },
    addedDate: { type: Date, default: Date.now },
  },
  { collection: "aboutCompanies" }
);

const AboutCompany = mongoose.model("AboutCompany", aboutCompanySchema);


const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 225 },
    littleText: { type: String, required: true },
    photo: { type: String },
    about: { type: mongoose.Schema.Types.ObjectId, ref: "AboutCompany" },
    addedDate: { type: Date, default: Date.now },
  },
  { collection: "achievements" }
);

const Achievement = mongoose.model("Achievement", achievementSchema);


const missionSchema = new mongoose.Schema(
  {
    littleText: { type: String, required: true },
    photo: { type: String },
    about: { type: mongoose.Schema.Types.ObjectId, ref: "AboutCompany" },
    addedDate: { type: Date, default: Date.now },
  },
  { collection: "missions" }
);

const Mission = mongoose.model("Mission", missionSchema);


const phoneNumbersSchema = new mongoose.Schema(
  {
    contactNumber: { type: String, required: true, maxlength: 12 },
    status: { type: Boolean, default: true },
    addedDate: { type: Date, default: Date.now },
  },
  { collection: "phoneNumbers" }
);

const PhoneNumbers = mongoose.model("PhoneNumbers", phoneNumbersSchema);


const emailSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, maxlength: 120 },
    status: { type: Boolean, default: true },
    addedDate: { type: Date, default: Date.now },
  },
  { collection: "emails" }
);

const Email = mongoose.model("Email", emailSchema);


const topSaleSchema = new mongoose.Schema(
  {
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { collection: "topSales" }
);

const TopSale = mongoose.model("TopSale", topSaleSchema);


const currencySchema = new mongoose.Schema(
  {
    currencyRate: { type: Number, required: true },
  },
  { collection: "currencies" }
);

const Currency = mongoose.model("Currency", currencySchema);


const partnerSchema = new mongoose.Schema(
  {
    partnerName: { type: String, required: true, maxlength: 255 },
    partnerLogo: { type: String },
    partnerUrl: { type: String, maxlength: 255, default: null },
  },
  { collection: "partners" }
);

const Partner = mongoose.model("Partner", partnerSchema);


const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    text: { type: String, required: true },
    status: { type: String, enum: ["Активный", "Архив"], required: true },
    publishDate: { type: Date, default: Date.now },
  },
  { collection: "news" }
);

const News = mongoose.model("News", newsSchema);


const newsImageSchema = new mongoose.Schema(
  {
    news: { type: mongoose.Schema.Types.ObjectId, ref: "News" },
    image: { type: String },
    publishDate: { type: Date, default: Date.now },
  },
  { collection: "newsImages" }
);

const NewsImage = mongoose.model("NewsImage", newsImageSchema);


const brandSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true, maxlength: 550 },
    brandDesc: { type: String, required: true },
    brandPhoto: { type: String },
  },
  { collection: "brands" }
);

const Brand = mongoose.model("Brand", brandSchema);


const laboratorySchema = new mongoose.Schema(
  {
    labName: { type: String, required: true, maxlength: 550 },
    labPhoto: { type: String },
  },
  { collection: "laboratories" }
);

const Laboratory = mongoose.model("Laboratory", laboratorySchema);


const laboratoryEquipmentSchema = new mongoose.Schema(
  {
    equipmentName: { type: String, required: true, maxlength: 550 },
    equipmentPhoto: { type: String },
  },
  { collection: "laboratoryEquipments" }
);

const LaboratoryEquipment = mongoose.model(
  "LaboratoryEquipment",
  laboratoryEquipmentSchema
);


const laboratoryServicesSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true, maxlength: 550 },
    servicePhoto: { type: String },
  },
  { collection: "laboratoryServices" }
);

const LaboratoryServices = mongoose.model(
  "LaboratoryServices",
  laboratoryServicesSchema
);


const laboratoryServiceRequestSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true, maxlength: 550 },
    clientName: { type: String, required: true, maxlength: 550 },
    phoneNumber: { type: String, required: true, maxlength: 550 },
    email: { type: String, required: true },
    status: { type: String, enum: ["new", "done"], default: "new" },
    addedDate: { type: Date, default: Date.now },
  },
  { collection: "laboratoryServiceRequests" }
);

const LaboratoryServiceRequest = mongoose.model(
  "LaboratoryServiceRequest",
  laboratoryServiceRequestSchema
);

module.exports = {
  EngineType,
  Category,
  Product,
  PhysChemCompositionSet,
  ProductPhoto,
  PhysChemComponent,
  MainPage,
  Banner,
  FAQ,
  Feedback,
  ClientRequest,
  AboutCompany,
  Achievement,
  Mission,
  PhoneNumbers,
  Email,
  TopSale,
  Currency,
  Partner,
  News,
  NewsImage,
  Brand,
  Laboratory,
  LaboratoryEquipment,
  LaboratoryServices,
  LaboratoryServiceRequest,
};
