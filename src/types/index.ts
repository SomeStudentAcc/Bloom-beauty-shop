export interface IBanner {
  id: string;
  type: string;
  category: string;
  title_ru: string;
  title_uz: string;
  title_en: string;
  file_uz: string;
  file_ru: string;
  file_en: string;
  url: string;
  position: number;
}

export interface ISlider {
  id: string;
  brand: string;
  category: string;
  name: string;
  name_en: string;
  name_uz: string;
  description: string;
  description_en: string;
  description_uz: string;
  image: string;
  image_en: string;
  image_uz: string;
  mobile_image: string;
  mobile_image_en: string;
  mobile_image_uz: string;
  position: number;
  promotion_id: number;
  url: string;
}

export interface INewProduct {
  id: string;
  group_id: string;
  url: string;
  article: string;
  name_ru: string;
  name_en: string;
  name_uz: string;
  brand_ru: string;
  price: string; // or number if you plan to parse it
  old_price: string; // or number if you plan to parse it
  discount: string; // or number if you plan to parse it
  discount_percentage: number;
  quantity: number;
  position: number | null;
  is_dermal: number; // typically 0 or 1, could use boolean if preferred
  is_aged: number;
  is_new: number;
  is_top: number;
  is_bestseller: number;
  is_exclusive: number;
  is_discount: number;
  imageUrl: string;
  feedbackCount: number | null;
  feedbackRate: number | null;
}

export interface IBrand {
  id: string;
  url: string;
  name: string;
  logo: string;
  position: number | null;
}

export interface IGroup {
  id: string;
  parent_id: string;
  url: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  seo_title_ru: string;
  seo_title_uz: string;
  seo_title_en: string;
  seo_keywords_ru: string;
  seo_keywords_uz: string;
  seo_keywords_en: string;
  seo_description_ru: string;
  seo_description_uz: string;
  seo_description_en: string;
  footer_ru: string;
  footer_uz: string;
  footer_en: string;
  icon: string | null;
  image: string;
  position: number;
  is_main: number;
}

export interface IBlog {
  id: string;
  url: string;
  image: string;
  web_image: string | null;
  title_ru: string;
  title_uz: string;
  title_en: string;
  description_ru: string;
  description_uz: string;
  description_en: string;
  date: string; // ISO string format like "2025-02-26 12:00:00"
}

export interface IBranches {
  id: string;
  region_id: string;
  name_ru: string;
  name_uz: string;
  name_en: string;
  phone: string;
  address_ru: string;
  address_uz: string;
  address_en: string;
  work_ru: string;
  work_uz: string;
  work_en: string;
  latitude: string;
  longitude: string;
}
export interface IRegion {
  id: string;
  name: string;
  name_uz: string;
  name_en: string;
  position: number;
}

export interface IDistrict {
  id: number;
  parent_id: number;
  name: string;
  name_uz: string;
  name_en: string | null;
  position: number | null;
}

export interface IGetData {
  banners: IBanner[];
  sliders: ISlider[];
  newProducts: INewProduct[];
  brands: IBrand[];
  groups: IGroup[];
  topProducts: INewProduct[];
  blogs: IBlog[];
  branches: IBranches[];
  regions: IRegion[];
  districts: IDistrict[];
  orderStatuses: string[]
}

export interface IGetMainProducts {
  products: INewProduct[];
}

export interface IProductSingle {
  id: string;
  group_id: string;
  url: string;
  article: string;
  bar_code: string;
  name_ru: string;
  name_uz: string;
  name_en: string;
  brand_id: string;
  brand_ru: string;
  brand_uz: string | null;
  brand_en: string | null;
  direction_ru: string;
  direction_uz: string;
  direction_en: string;
  consist_ru: string;
  consist_uz: string;
  consist_en: string;
  mode_ru: string;
  mode_uz: string;
  mode_en: string;
  description_ru: string;
  description_uz: string;
  description_en: string;
  color_ru: string;
  color_uz: string;
  color_en: string;
  old_price: string;
  price: string;
  price_usd: string;
  discount: string;
  discount_percentage: number;
  quantity: number;
  gender: string;
  size: string;
  weight: number | null;
  unit: string;
  author: string;
  genre: string | null;
  published: string;
  package_count: number | null;
  pages_count: number | null;
  supplier: string;
  manufacturer: string;
  incoming_date: string;
  youtube_link: string;
  seo_title_uz: string;
  seo_title_ru: string;
  seo_title_en: string;
  seo_keywords_uz: string;
  seo_keywords_ru: string;
  seo_keywords_en: string;
  seo_description_uz: string;
  seo_description_ru: string;
  seo_description_en: string;
  position: number | null;
  sells: number | null;
  is_new: number;
  is_top: number;
  is_bestseller: number;
  is_exclusive: number;
  is_discount: number;
  is_billz_discount: number;
  is_aged: number;
  is_dermal: number;
  is_active: number;
  delete: number;
  sync_date: string;
  feedbackCount: number | null;
  feedbackRate: number | null;
}

export interface IGetSingleProductImages {
  product_id: string;
  image: string;
  url: string;
}

export interface IProductBalance {
  name: string;
  quantity: number;
}

export interface IGetSingleProduct {
  product: IProductSingle;
  images: IGetSingleProductImages[];
  balance: IProductBalance[];
  recommended: INewProduct[];
}

export interface ICategory {
  id: string;
  is_main: number;
  name_en: string;
  name_ru: string;
  name_uz: string;
  parent_id: string;
  position: null;
  url: string;
}

export interface IGetProducts {
  products: INewProduct[];
  brands: string[];
  discounts: string[];
  categories: ICategory[];
  pageCount: number;
}

export interface IBlogSingle {
  id: string;
  url: string;
  image: string;
  web_image: string | null;
  title_ru: string;
  description_ru: string;
  text_ru: string;
  title_uz: string;
  description_uz: string;
  text_uz: string;
  title_en: string;
  description_en: string;
  text_en: string;
  seo_title_ru: string;
  seo_title_uz: string;
  seo_title_en: string;
  seo_keywords_ru: string;
  seo_keywords_uz: string;
  seo_keywords_en: string;
  seo_description_ru: string;
  seo_description_uz: string;
  seo_description_en: string;
  author: string;
  date: string; // ISO datetime string (e.g. "2025-02-26 12:00:00")
  is_active: number; // 1 or 0
  created: string;
  created_at: string; // ISO datetime string (e.g. "2025-02-26 11:58:09")
  updated: string | null;
  updated_at: string | null;
}

export interface IBlogImage {
  id: string;
  document_id: string;
  document_type: string; // or you can narrow it down with: 'blog' | 'news' | ...
  name: string;
  type: string; // e.g. 'image/jpeg'
  file: string; // filename or path
  size: number; // in bytes
  is_active: number; // 1 or 0
  created: string;
  created_at: string; // ISO datetime string
}

export interface IGetBlog {
  blog: IBlogSingle;
  images: IBlogImage[];
}

export interface IUser {
  balance: number;
  birthdate: string;
  code: string;
  date: string;
  gender: number;
  id: number;
  name: string;
  phone: string;
}

export interface IActiveOrderItem {
  amount: number;
  comment: string | null;
  discount: string;
  ext_id: string | null;
  id: string;
  is_synced: number;
  name: string;
  office_id: string;
  order_id: string;
  price: string;
  product_id: string;
  synced_at: string | null;
  system: string;
}

export interface IActiveOrder {
  account_id: number;
  address: string;
  branch_id: string;
  cancel_comment: string | null;
  cancel_reason: string | null;
  card_id: string | null;
  certificate_amount: number;
  certificate_code: string | null;
  comment: string;
  courier_id: number | null;
  courier_state: string | null;
  created: string;
  created_at: string;
  delivery_date: string;
  delivery_point: number;
  delivery_price: number;
  discount: string;
  distance: number;
  district_id: number;
  edited: string | null;
  edited_at: string | null;
  fargo_id: string | null;
  has_feedback: number;
  id: string;
  is_deleted: number;
  is_delivery: boolean;
  is_express: number;
  is_paid: number;
  is_synced: number;
  items: IActiveOrderItem[];
  latitude: string;
  longitude: string;
  name: string;
  order_id: string | null;
  paid_amount: number;
  paymentUrl: string;
  payment_type: string;
  phone: string;
  point: string;
  promo_code_id: string | null;
  promotion_id: string | null;
  region_id: number;
  status: number;
  system: string;
  total: number;
  transaction_id: string | null;
}
