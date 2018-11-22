const { JWT_TTL, JWT_SECRET } = process.env;

export default {
  ttl:    JWT_TTL,
  secret: JWT_SECRET,
};