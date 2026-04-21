export type AppEnv = {
  PORT: number;
  NODE_ENV: "development" | "staging" | "production" | "test";
  JWT_SECRET: string;
  FEATURE_X_ENABLED: boolean;
};

const ALLOWED_NODE_ENVS = [
  "development",
  "staging",
  "production",
  "test",
] as const;

const TRUE_VALUES = ["true", "1", "yes", "on"];
const FALSE_VALUES = ["false", "0", "no", "off"];

function parseBoolean(value: string): boolean | null {
  const normalized = value.trim().toLowerCase();
  if (TRUE_VALUES.includes(normalized)) return true;
  if (FALSE_VALUES.includes(normalized)) return false;
  return null;
}

function isMissing(value: string | undefined): boolean {
  return value === undefined || value.trim() === "";
}

export function validateEnv(env: Record<string, string | undefined>): AppEnv {
  const errors: string[] = [];

  const portRaw = env.PORT;
  let port = 0;
  if (isMissing(portRaw)) {
    errors.push("PORT es requerido.");
  } else {
    const trimmed = portRaw!.trim();
    const parsed = Number(trimmed);
    if (!/^\d+$/.test(trimmed) || !Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
      errors.push(
        `PORT debe ser un entero entre 1 y 65535 (recibido: "${portRaw}").`,
      );
    } else {
      port = parsed;
    }
  }

  const nodeEnvRaw = env.NODE_ENV;
  let nodeEnv: AppEnv["NODE_ENV"] = "development";
  if (isMissing(nodeEnvRaw)) {
    errors.push("NODE_ENV es requerido.");
  } else {
    const trimmed = nodeEnvRaw!.trim() as AppEnv["NODE_ENV"];
    if (!ALLOWED_NODE_ENVS.includes(trimmed)) {
      errors.push(
        `NODE_ENV debe ser uno de: ${ALLOWED_NODE_ENVS.join(", ")} (recibido: "${nodeEnvRaw}").`,
      );
    } else {
      nodeEnv = trimmed;
    }
  }

  const jwtSecret = env.JWT_SECRET;
  if (isMissing(jwtSecret)) {
    errors.push("JWT_SECRET es requerido y no puede estar vacío.");
  }

  const featureRaw = env.FEATURE_X_ENABLED;
  let featureEnabled = false;
  if (isMissing(featureRaw)) {
    errors.push("FEATURE_X_ENABLED es requerido.");
  } else {
    const parsed = parseBoolean(featureRaw!);
    if (parsed === null) {
      errors.push(
        `FEATURE_X_ENABLED debe ser booleano (true/false, 1/0, yes/no, on/off) (recibido: "${featureRaw}").`,
      );
    } else {
      featureEnabled = parsed;
    }
  }

  if (errors.length > 0) {
    const message = [
      "",
      "Error de configuración: variables de entorno inválidas o faltantes.",
      "",
      ...errors.map((e) => `  - ${e}`),
      "",
      "Revisa tu archivo .env (usa .env.example como referencia).",
      "",
    ].join("\n");
    throw new Error(message);
  }

  return {
    PORT: port,
    NODE_ENV: nodeEnv,
    JWT_SECRET: jwtSecret!,
    FEATURE_X_ENABLED: featureEnabled,
  };
}
