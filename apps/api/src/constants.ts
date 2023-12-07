export const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
export const JWT_MAX_AGE = Number.parseInt(process.env.JWT_MAX_AGE) || 24 * 60 * 60;
