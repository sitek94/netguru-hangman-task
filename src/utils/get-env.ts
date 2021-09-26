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
