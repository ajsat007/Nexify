// ============================================================================
// Nexify — Lightweight Client Store (zustand-free, simple context)
// ============================================================================

export interface StoreState {
  chatOpen: boolean
  chatSessionId: string | null
  sidebarOpen: boolean
  setChatOpen: (open: boolean) => void
  setChatSessionId: (id: string) => void
  setSidebarOpen: (open: boolean) => void
}

type Listener = () => void

let state: StoreState = {
  chatOpen: false,
  chatSessionId: null,
  sidebarOpen: false,
  setChatOpen: (open: boolean) => { state.chatOpen = open; emit() },
  setChatSessionId: (id: string) => { state.chatSessionId = id; emit() },
  setSidebarOpen: (open: boolean) => { state.sidebarOpen = open; emit() },
}

const listeners = new Set<Listener>()
function emit() { listeners.forEach(l => l()) }

export function getState(): StoreState { return state }
export function subscribe(listener: Listener) { listeners.add(listener); return () => listeners.delete(listener) }

export function updateState(partial: Partial<StoreState>) {
  state = { ...state, ...partial }
  emit()
}
