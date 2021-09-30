/**
 * Simple helper and type guard to check if the ENV variable is actually defined
 */
export const getEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ENV variable: "${name}"`);
  }

  return value;
};

export const getBoolEnv = (name: string): boolean => {
  const value = getEnv(name);

  if (value !== 'true' && value !== 'false') {
    throw new Error(`"${name}" ENV variable has to be a boolean`);
  }

  return value === 'true';
};
