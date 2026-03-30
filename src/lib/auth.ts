// ─── Session token helpers (Web Crypto HMAC-SHA256) ───────────────────────────
//
// Token format: base64url(payload) + "." + base64url(signature)
// Payload: JSON { sub, iat, exp }
//
// No external dependencies — runs in the Next.js Edge runtime used by middleware.

const SESSION_COOKIE = "pb_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

// ─── HMAC key ─────────────────────────────────────────────────────────────────

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set and at least 32 characters");
  }
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// ─── Base64url helpers ────────────────────────────────────────────────────────

function toBase64url(buf: ArrayBuffer | Uint8Array): string {
  return Buffer.from(buf instanceof Uint8Array ? buf : new Uint8Array(buf))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function fromBase64url(str: string): ArrayBuffer {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const buf = Buffer.from(padded, "base64");
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

// ─── Token creation / verification ───────────────────────────────────────────

interface SessionPayload {
  sub: string; // user id / email
  iat: number;
  exp: number;
}

export async function createSessionToken(subject: string): Promise<string> {
  const key = await getKey();
  const payload: SessionPayload = {
    sub: subject,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };
  const payloadB64 = toBase64url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  return `${payloadB64}.${toBase64url(sig)}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const key = await getKey();
    const dot = token.lastIndexOf(".");
    if (dot === -1) return null;

    const payloadB64 = token.slice(0, dot);
    const sigBytes   = fromBase64url(token.slice(dot + 1));

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(payloadB64)
    );
    if (!valid) return null;

    const payload: SessionPayload = JSON.parse(
      new TextDecoder().decode(fromBase64url(payloadB64))
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────

export { SESSION_COOKIE, SESSION_MAX_AGE };

export function isDemoCredentials(email: string, password: string): boolean {
  const demoEmail    = process.env.DEMO_EMAIL    ?? "demo@pulseboard.io";
  const demoPassword = process.env.DEMO_PASSWORD ?? "demo";
  return email === demoEmail && password === demoPassword;
}
