export const validateConfig = () => {
  const required = ['VITE_API_KEY', 'VITE_JWT_SECRET', 'VITE_DB_PASSWORD'];
  required.forEach(key => {
    if (!import.meta.env[key]) {
      throw new Error(`Config Error: Variable ${key} is missing.`);
    }
  });
};