import pinoHttp from "pino-http";
import { logger } from "./logger";

export const httpLogger = pinoHttp({
  logger,

  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },

  customSuccessMessage: function (req, res) {
    return `${req.method} ${req.url} completed`;
  },

  customErrorMessage: function (req, res, err) {
    return `${req.method} ${req.url} failed`;
  },

  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        ip: req.ip,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});
