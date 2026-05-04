import fs from "fs";
import path from "path";

const CREDENTIALS_FILE = path.resolve(process.cwd(), "server/data/credentials.json");

interface SimulatorCredentials {
  username: string;
  password: string;
}

function ensureDir() {
  const dir = path.dirname(CREDENTIALS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getSimulatorCredentials(): SimulatorCredentials {
  try {
    if (fs.existsSync(CREDENTIALS_FILE)) {
      const raw = fs.readFileSync(CREDENTIALS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // fall through to env vars
  }
  return {
    username: process.env.SIMULATOR_USERNAME || "",
    password: process.env.SIMULATOR_PASSWORD || "",
  };
}

export function setSimulatorCredentials(creds: SimulatorCredentials): void {
  ensureDir();
  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(creds, null, 2), "utf-8");
}
