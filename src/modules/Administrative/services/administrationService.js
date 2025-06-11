const API_BASE_CATEGORIES = "/api/lab-categories";
const API_BASE_TEMPLATES = "/api/lab-templates";

export const administrationService = {
  // Lab Categories CRUD Operations
  getAllCategories: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_CATEGORIES}?${queryString}`);
    return response.json();
  },

  getCategoryById: async (id) => {
    const response = await fetch(`${API_BASE_CATEGORIES}/${id}`);
    return response.json();
  },

  createCategory: async (categoryData) => {
    const response = await fetch(API_BASE_CATEGORIES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...categoryData,
        createdAt: new Date().toISOString(),
      }),
    });
    return response.json();
  },

  updateCategory: async (id, categoryData) => {
    const response = await fetch(`${API_BASE_CATEGORIES}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...categoryData,
        updatedAt: new Date().toISOString(),
      }),
    });
    return response.json();
  },

  deleteCategory: async (id) => {
    const response = await fetch(`${API_BASE_CATEGORIES}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

  // Lab Templates CRUD Operations
  getAllTemplates: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_TEMPLATES}?${queryString}`);
    return response.json();
  },

  getTemplateById: async (id) => {
    const response = await fetch(`${API_BASE_TEMPLATES}/${id}`);
    return response.json();
  },

  createTemplate: async (templateData) => {
    const response = await fetch(API_BASE_TEMPLATES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...templateData,
        createdAt: new Date().toISOString(),
      }),
    });
    return response.json();
  },

  updateTemplate: async (id, templateData) => {
    const response = await fetch(`${API_BASE_TEMPLATES}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...templateData,
        updatedAt: new Date().toISOString(),
      }),
    });
    return response.json();
  },

  deleteTemplate: async (id) => {
    const response = await fetch(`${API_BASE_TEMPLATES}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};