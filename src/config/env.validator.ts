export const validateConfig = () => {
  const required = ['API_KEY', 'JWT_SECRET', 'APP_NAME'];
  required.forEach(key => {
    if (!import.meta.env[key]) {
      throw new Error(`Config Error: Variable ${key} is missing.`);
    }
  });
};