export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

type Subscriber = (items: ToastItem[]) => void;

class ToastStore {
  private items: ToastItem[] = [];
  private subscribers = new Set<Subscriber>();

  private notify() {
    this.subscribers.forEach((fn) => fn([...this.items]));
  }

  subscribe(fn: Subscriber): () => void {
    this.subscribers.add(fn);
    fn([...this.items]);
    return () => this.subscribers.delete(fn);
  }

  add(item: Omit<ToastItem, "id">, duration = 4500): string {
    const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    this.items = [...this.items, { ...item, id }];
    this.notify();
    if (duration > 0) setTimeout(() => this.dismiss(id), duration);
    return id;
  }

  dismiss(id: string) {
    this.items = this.items.filter((t) => t.id !== id);
    this.notify();
  }

  success(title: string, description?: string) {
    return this.add({ type: "success", title, description });
  }
  error(title: string, description?: string) {
    return this.add({ type: "error", title, description }, 6000);
  }
  info(title: string, description?: string) {
    return this.add({ type: "info", title, description });
  }
  warning(title: string, description?: string) {
    return this.add({ type: "warning", title, description });
  }
}

// Singleton — safe to import in both client and server modules
// (server-side it's a no-op since no subscribers run on the server)
export const toast = new ToastStore();
