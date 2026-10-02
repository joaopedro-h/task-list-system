declare function loadTasks(): Promise<void>;

declare function completeTask(): Promise<void>;

declare function sessionExpired(): void;

declare const taskList: HTMLElement;

declare let currentView: "pending" | "in_progress" | "completed";

declare function refreshCurrentView(): Promise<void>;