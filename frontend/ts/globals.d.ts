declare function loadTasks(): Promise<void>;

declare function completeTask(): Promise<void>;

declare function editTask(): void;

declare function sessionExpired(): void;

declare let currentView: "pending" | "in_progress" | "completed";

declare function refreshCurrentView(): Promise<void>;