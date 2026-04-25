const REDIRECTION_KEY = "autoreport_clientCreationRedirect";

interface RedirectionContext {
  returnTo: string;
  quoteId?: string;
  reservationId?: string;
  metadata?: Record<string, string>;
}

export function initiateClientCreationRedirect(context: RedirectionContext): void {
  localStorage.setItem(REDIRECTION_KEY, JSON.stringify(context));
}

export function getRedirectionContext(): RedirectionContext | null {
  try {
    const stored = localStorage.getItem(REDIRECTION_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as RedirectionContext;
  } catch {
    return null;
  }
}

export function clearClientCreationRedirect(): void {
  localStorage.removeItem(REDIRECTION_KEY);
}

export function performReturnRedirect(newUserId?: string): string | null {
  const context = getRedirectionContext();
  if (!context) return null;
  clearClientCreationRedirect();
  return context.returnTo || null;
}
