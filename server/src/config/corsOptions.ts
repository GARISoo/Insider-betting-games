import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin: string, callback: (arg0: Error, arg1: boolean) => void) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"), false)
    }
  },

  optionsSuccessStatus: 200,
};

export default corsOptions;
