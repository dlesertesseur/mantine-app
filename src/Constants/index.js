//const SERVER = "http://192.168.0.15";
//const PORT = "8080";
//const API_BASE = "/connexa/api/v1";

const SERVER = process.env.REACT_APP_SERVER;
const PORT = process.env.REACT_APP_PORT;
const API_BASE = process.env.REACT_APP_API_BASE;

const LOCAL_SERVER = "http://192.168.0.11";

export const TOOLBAR_HIGHT = 42;
export const VIEW_HEADER_HIGHT = 48;
export const DIVIDER_HIGHT = 20;
export const PIXEL_METER_RELATION = 25.0;
export const BLOCK_SNAP_SIZE = 1.0;

export const GUIDELINE_OFFSET = 5;

export const API = {
  auth: {
    signUp: SERVER + ":" + PORT + API_BASE + "/users",
    signIn: SERVER + ":" + PORT + API_BASE + "/authentication",
    changePassword: SERVER + ":" + PORT + API_BASE + "/user/changePassword",
    authorizations: SERVER + ":" + PORT + API_BASE + "/authorizations/",
    findByEmail: SERVER + ":" + PORT + API_BASE + "/authorizations/organizations/",
    byUserId: SERVER + ":" + PORT + API_BASE + "/authorizations/",
    findRolesByEmail: SERVER + ":" + PORT + API_BASE + "/authorizations/organizations/{email}/organizations/{organizationId}/roles",
    findAllRolesByUserId: SERVER + ":" + PORT + API_BASE + "/authorizations/",
    unassignRole: SERVER + ":" + PORT + API_BASE + "/authorizations/",
    assignRole: SERVER + ":" + PORT + API_BASE + "/authorizations",
  },

  user: {
    create: SERVER + ":" + PORT + API_BASE + "/users",
    update: SERVER + ":" + PORT + API_BASE + "/users/",
    delete: SERVER + ":" + PORT + API_BASE + "/users/",
    allUsers: SERVER + ":" + PORT + API_BASE + "/users",
    findUserByEmail: SERVER + ":" + PORT + API_BASE + "/users/",
    findAllUserByPage: SERVER + ":" + PORT + API_BASE + "/users/",
  },

  userRole: {
    create: SERVER + ":" + PORT + API_BASE + "/user-role-relations/user/{userId}/role/",
    delete: SERVER + ":" + PORT + API_BASE + "/user-role-relations/user/{userId}/role/",
    findAllRolesByUser: SERVER + ":" + PORT + API_BASE + "/user-role-relations/user/",
  },

  parameter: {
    create: SERVER + ":" + PORT + API_BASE + "/parameters",
    update: SERVER + ":" + PORT + API_BASE + "/parameters/",
    delete: SERVER + ":" + PORT + API_BASE + "/parameters/",
    findAll: SERVER + ":" + PORT + API_BASE + "/parameters",
    findByName: SERVER + ":" + PORT + API_BASE + "/parameters",
  },

  application: {
    create: SERVER + ":" + PORT + API_BASE + "/applications/",
    update: SERVER + ":" + PORT + API_BASE + "/applications/",
    delete: SERVER + ":" + PORT + API_BASE + "/applications/",
    findAll: SERVER + ":" + PORT + API_BASE + "/applications",
    findById: SERVER + ":" + PORT + API_BASE + "/applications/",
  },

  applicationTranslation: {
    create: SERVER + ":" + PORT + API_BASE + "/applications-translations",
    update: SERVER + ":" + PORT + API_BASE + "/applications-translations",
    delete: SERVER + ":" + PORT + API_BASE + "/applications-translations/",
    findAllByApplicationId: SERVER + ":" + PORT + API_BASE + "/applications-translations/",
  },

  organization: {
    create: SERVER + ":" + PORT + API_BASE + "/organizations",
    update: SERVER + ":" + PORT + API_BASE + "/organizations",
    delete: SERVER + ":" + PORT + API_BASE + "/organizations/",
    findAll: SERVER + ":" + PORT + API_BASE + "/organizations",
    findById: SERVER + ":" + PORT + API_BASE + "/organizations/",
    findRolesByEmailAndOrganization: SERVER + ":" + PORT + API_BASE + "/organizations/{email}/organizations/{organizationId}/roles",
  },

  project: {
    create: SERVER + ":" + PORT + API_BASE + "/projects/{0}/",
    update: SERVER + ":" + PORT + API_BASE + "/projects/",
    delete: SERVER + ":" + PORT + API_BASE + "/projects/",
    findAll: SERVER + ":" + PORT + API_BASE + "/projects",
    findByName: SERVER + ":" + PORT + API_BASE + "/projects",
    findAllByIdOrganizationId: SERVER + ":" + PORT + API_BASE + "/projects/",
  },

  role: {
    create: SERVER + ":" + PORT + API_BASE + "/roles",
    update: SERVER + ":" + PORT + API_BASE + "/roles/",
    delete: SERVER + ":" + PORT + API_BASE + "/roles/",
    findAll: SERVER + ":" + PORT + API_BASE + "/roles",
    findByName: SERVER + ":" + PORT + API_BASE + "/roles",
    findById: SERVER + ":" + PORT + API_BASE + "/roles/",
    findAllApplicationsByRole: SERVER + ":" + PORT + API_BASE + "/application-role-relations/role/",
    findAllRolesInContext: SERVER + ":" + PORT + API_BASE + "/roles/context/",
  },

  roleTranslation: {
    create: SERVER + ":" + PORT + API_BASE + "/roles-translations",
    update: SERVER + ":" + PORT + API_BASE + "/roles-translations",
    delete: SERVER + ":" + PORT + API_BASE + "/roles-translations/",
    findAllByRoleId: SERVER + ":" + PORT + API_BASE + "/roles-translations/",
  },

  applicationRole: {
    create: SERVER + ":" + PORT + API_BASE + "/application-role-relations/application/",
    delete: SERVER + ":" + PORT + API_BASE + "/application-role-relations/application/",
  },

  site: {
    create: SERVER + ":" + PORT + API_BASE + "/sites/",
    update: SERVER + ":" + PORT + API_BASE + "/sites/",
    delete: SERVER + ":" + PORT + API_BASE + "/sites/",
    findAllByIdProjectId: SERVER + ":" + PORT + API_BASE + "/sites/projects/",
    findAllSitesByPage: SERVER + ":" + PORT + API_BASE + "/sites/",
    findSiteById: SERVER + ":" + PORT + API_BASE + "/sites/",
    findAllSites: SERVER + ":" + PORT + API_BASE + "/sites/unpaged",
  },

  brand: {
    create: SERVER + ":" + PORT + API_BASE + "/brands/",
    update: SERVER + ":" + PORT + API_BASE + "/brands/",
    delete: SERVER + ":" + PORT + API_BASE + "/brands/",
    findAll: SERVER + ":" + PORT + API_BASE + "/brands",
  },

  category: {
    create: SERVER + ":" + PORT + API_BASE + "/categories/",
    update: SERVER + ":" + PORT + API_BASE + "/categories",
    delete: SERVER + ":" + PORT + API_BASE + "/categories/",
    getRootOfCategories: SERVER + ":" + PORT + API_BASE + "/categories/",
    getChildrenOfCategory: SERVER + ":" + PORT + API_BASE + "/categories/",
    getAllCategories: SERVER + ":" + PORT + API_BASE + "/categories/full/",
  },

  product: {
    create: SERVER + ":" + PORT + API_BASE + "/products",
    update: SERVER + ":" + PORT + API_BASE + "/products",
    delete: SERVER + ":" + PORT + API_BASE + "/products/",
    findAllByIdProjectId: SERVER + ":" + PORT + API_BASE + "/products/projects/",
    findAllCountries: SERVER + ":" + PORT + API_BASE + "/countries",
    findAllProductsPage: SERVER + ":" + PORT + API_BASE + "/products/",
    findAllProducts: SERVER + ":" + PORT + API_BASE + "/products/unpaged",
    findProductById: SERVER + ":" + PORT + API_BASE + "/products/",
    uploadImage: SERVER + ":" + PORT + API_BASE + "/product-images/",
    deleteImage: SERVER + ":" + PORT + API_BASE + "/product-images/",
  },

  category_product_relation: {
    findAllProductsByCategoryIdPage: SERVER + ":" + PORT + API_BASE + "/category-product-relation/",
    categorizeProductsByProjectIdCategortyId: SERVER + ":" + PORT + API_BASE + "/category-product-relation/",
    uncategorizeProductsByProjectId: SERVER + ":" + PORT + API_BASE + "/category-product-relation/",
  },

  country: {
    getImage: SERVER + ":" + PORT + "/countries/",
  },

  locale: {
    findAll: SERVER + ":" + PORT + API_BASE + "/locales/",
  },

  measurement: {
    findAllMeasurementTypes: SERVER + ":" + PORT + API_BASE + "/measurement-types",
    findAllMeasurementUnitsByType: SERVER + ":" + PORT + API_BASE + "/measurement-units/",
  },

  productImages: {
    upload: SERVER + ":" + PORT + API_BASE + "/product-images/",
    findAllImagesByProductId: SERVER + ":" + PORT + API_BASE + "/product-images/",
    baseUrl: SERVER + ":" + PORT,
    delete: SERVER + ":" + PORT + API_BASE + "/product-images/",
  },

  context: {
    create: SERVER + ":" + PORT + API_BASE + "/contexts",
    update: SERVER + ":" + PORT + API_BASE + "/contexts/",
    delete: SERVER + ":" + PORT + API_BASE + "/contexts/",
    findAll: SERVER + ":" + PORT + API_BASE + "/contexts",
    findByName: SERVER + ":" + PORT + API_BASE + "/contexts",
  },

  graphic: { 
    findStructure: LOCAL_SERVER + ":" + PORT + API_BASE + "/structure",
    findScene: LOCAL_SERVER + ":" + PORT + API_BASE + "/scene", 
    findActors: LOCAL_SERVER + ":" + PORT + API_BASE + "/actors", 
    findTarget: LOCAL_SERVER + ":" + PORT + API_BASE + "/target",
    findPath: LOCAL_SERVER + ":" + PORT + API_BASE + "/findPath",
    findOperator: LOCAL_SERVER + ":" + PORT + API_BASE + "/work-orders",
  },

  surface: { 
    findZone: SERVER + ":" + PORT + API_BASE + "/storage-zones", 
    findRacksByZoneId: SERVER + ":" + PORT + API_BASE + "/sites", 
    findRackId: SERVER + ":" + PORT + API_BASE + "/racks", 
    findLayout: SERVER + ":" + PORT + API_BASE + "/site-drawings", 
    findFloor: SERVER + ":" + PORT + API_BASE + "/floors", 
    savePosAndRot: SERVER + ":" + PORT + API_BASE + "/sites", 
    saveLayout: SERVER + ":" + PORT + API_BASE + "/site-drawings/", 
    findLayoutByFloorId: SERVER + ":" + PORT + API_BASE + "/site-drawings", 
  },

  floor: { 
    findAll: SERVER + ":" + PORT + API_BASE + "/floors/all",
    findById: SERVER + ":" + PORT + API_BASE + "/floors",
    create: SERVER + ":" + PORT + API_BASE + "/floors/",
    update: SERVER + ":" + PORT + API_BASE + "/floors",
    delete: SERVER + ":" + PORT + API_BASE + "/floors/",
    findAllImages: SERVER + ":" + PORT + API_BASE + "/sites",
    uploadImage: SERVER + ":" + PORT + API_BASE + "/sites",
    urlBase: SERVER + ":" + PORT,
  },

  rack: {
    create: SERVER + ":" + PORT + API_BASE + "/sites/",
    update: SERVER + ":" + PORT + API_BASE + "/sites/",
    findAllHeaders: SERVER + ":" + PORT + API_BASE + "/sites", 
    findById: SERVER + ":" + PORT + API_BASE + "/sites", 
  },

  layout: { 
    findAllById: SERVER + ":" + PORT + API_BASE + "/site-drawings",
    findById: SERVER + ":" + PORT + API_BASE + "/site-drawings",
    create: SERVER + ":" + PORT + API_BASE + "/site-drawings/",
    update: SERVER + ":" + PORT + API_BASE + "/site-drawings/",
    delete: SERVER + ":" + PORT + API_BASE + "/site-drawings/",
  },

  layoutMarkers: { 
    findAllById: SERVER + ":" + PORT + API_BASE + "/sites",
    findById: SERVER + ":" + PORT + API_BASE + "/sites",
    create: SERVER + ":" + PORT + API_BASE + "/sites/",
    update: SERVER + ":" + PORT + API_BASE + "/sites/",
    delete: SERVER + ":" + PORT + API_BASE + "/sites/",
    save: SERVER + ":" + PORT + API_BASE + "/sites/",
  },

};

export const ERRORS = {
  auth: {
    OK: 1000,
    SIGNIN_ERROR: 1001,
    SIGNUP_ERROR: 1002,
    CHANGE_PASSWORD_ERROR: 1003,
  },
  crud: {
    OK: 2000,
    ERROR: 2001,
  },
};

export const CONTEXTS = {
  organizatrionId: 2,
};

export const actions = {
  created: "CREATED",
  updated: "UPDATED",
  deleted: "DELETED",
  readed: "READED",
};
