/** Hardcoded site config used when DB is empty or read fails */
export const DEFAULT_CONFIG = {
  customer_email: 'Athos.xu@adgpay.com',
  partnership_email: 'Athos.xu@adgpay.com',
  office_address:
    'UNIT 3586, LEVEL 35, INFINITUS PLAZA, 199 DES VOEUS RD CENTRAL, SHEUNG WAN, HONG KONG',
}

/** Seed / fallback list for multilingual system_config_items */
export const DEFAULT_CONFIG_ITEMS = [
  {
    name_zh: '客户邮箱',
    name_en: 'Customer Email',
    name_tw: '客戶郵箱',
    value_zh: DEFAULT_CONFIG.customer_email,
    value_en: DEFAULT_CONFIG.customer_email,
    value_tw: DEFAULT_CONFIG.customer_email,
    sort_order: 1,
  },
  {
    name_zh: '合作邮箱',
    name_en: 'Partnership Email',
    name_tw: '合作郵箱',
    value_zh: DEFAULT_CONFIG.partnership_email,
    value_en: DEFAULT_CONFIG.partnership_email,
    value_tw: DEFAULT_CONFIG.partnership_email,
    sort_order: 2,
  },
  {
    name_zh: '办公地址',
    name_en: 'Office Address',
    name_tw: '辦公地址',
    value_zh: DEFAULT_CONFIG.office_address,
    value_en: DEFAULT_CONFIG.office_address,
    value_tw: DEFAULT_CONFIG.office_address,
    sort_order: 3,
  },
]
