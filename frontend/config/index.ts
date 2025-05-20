import packageJson from "../package.json";

const getEnvVariable = (
  envVar: string | undefined,
  defaultValue?: string,
): string => {
  if (!envVar) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable not defined`);
  }
  return envVar;
};

function getVersion() {
  // @ts-expect-error: Accessing version property from packageJson
  return packageJson.version || "";
}

function getAuthor() {
  // @ts-expect-error: Accessing author property from packageJson
  return packageJson.author || "";
}

export const config = {
  appName: getEnvVariable(process.env.NEXT_PUBLIC_APP_NAME, "DefaultAppName"),
  version: typeof window === "undefined" ? getVersion() : "",
  author: typeof window === "undefined" ? getAuthor() : "",
};
