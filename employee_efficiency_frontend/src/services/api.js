import axios from 'axios';

/**
 * PUBLIC_INTERFACE
 * getApiBaseUrl
 * Returns the API base URL from environment or defaults to http://localhost:3001
 */
export function getApiBaseUrl() {
  /** This reads REACT_APP_API_BASE_URL if provided by environment. */
  return process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Accept': 'application/json',
  },
});

// PUBLIC_INTERFACE
export function uploadCSV(formData) {
  /** Upload CSV file to backend. Expects 'file' field in formData. */
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

// PUBLIC_INTERFACE
export function fetchPreview(paramsQueryString = '') {
  /** Fetch data preview for uploaded/cleaned data. */
  const path = paramsQueryString ? `/data/preview?${paramsQueryString}` : '/data/preview';
  return api.get(path);
}

// PUBLIC_INTERFACE
export function fetchEDA(paramsQueryString = '') {
  /** Fetch EDA summary stats and chart data. */
  const path = paramsQueryString ? `/eda/summary?${paramsQueryString}` : '/eda/summary';
  return api.get(path);
}

// PUBLIC_INTERFACE
export function fetchScatter(paramsQueryString = '') {
  /** Fetch scatter plot data for two selected fields. */
  const path = paramsQueryString ? `/eda/scatter?${paramsQueryString}` : '/eda/scatter';
  return api.get(path);
}

// PUBLIC_INTERFACE
export function runANOVA(paramsQueryString = '') {
  /** Execute ANOVA with current filters. */
  const path = paramsQueryString ? `/anova/run?${paramsQueryString}` : '/anova/run';
  return api.get(path);
}

// PUBLIC_INTERFACE
export function trainModel(payload) {
  /** Train a model with given algorithm and features. */
  return api.post('/model/train', payload);
}

// PUBLIC_INTERFACE
export function runClustering(payload) {
  /** Run clustering (e.g., KMeans) with clusters and features. */
  return api.post('/cluster/run', payload);
}

// PUBLIC_INTERFACE
export function fetchRecommendations(paramsQueryString = '') {
  /** Get recommendations based on current data/filters. */
  const path = paramsQueryString ? `/recommendations?${paramsQueryString}` : '/recommendations';
  return api.get(path);
}

// PUBLIC_INTERFACE
export async function downloadReportPDF() {
  /** Download report PDF from backend. Returns Blob. */
  const response = await api.get('/report/pdf', { responseType: 'blob' });
  return response.data;
}

export default api;
