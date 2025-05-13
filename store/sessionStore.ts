import {
  deleteItemAsync,
  getItemAsync,
  setItemAsync,
} from "@/store/localStorage";
import { create } from "zustand";
import { StorageValue, persist } from "zustand/middleware";

import { LoginResponseBody, SessionStore } from "@/types/auth";

const SESSION_KEY = "sessionStore";

const initialValues = {
  token: null,
  uuid: null,
  authenticated: null,
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set): SessionStore => ({
      ...initialValues,
      setAuthenticated: (authenticated: boolean): void =>
        set({ authenticated }),
      setLoginData: (data: Partial<LoginResponseBody>): void => {
        set({
          token: data.token,
          uuid: data.uuid,
          authenticated: true,
        });
      },
      initialize: async (): Promise<void> => {
        const session: string | null = await getItemAsync(SESSION_KEY);

        if (!session) {
          set({ authenticated: false });
          return;
        }

        try {
          const { state }: { state: SessionStore } = JSON.parse(session);
          set({ ...state });

          if (!state.token) {
            set({ authenticated: false });
            return;
          }

          set({ authenticated: true });
        } catch {
          await deleteItemAsync(SESSION_KEY);
        }
      },
      onLogout: (): void => {
        // Reset auth state
        set(initialValues);
      },
    }),
    {
      name: SESSION_KEY,
      storage: {
        setItem: async (
          name: string,
          value: StorageValue<Partial<SessionStore>>
        ): Promise<void> => {
          await setItemAsync(name, JSON.stringify(value));
        },
        getItem: async (
          name: string
        ): Promise<StorageValue<Partial<SessionStore>> | null> => {
          const item: string | null = await getItemAsync(name);
          return item
            ? (JSON.parse(item) as StorageValue<Partial<SessionStore>>)
            : null;
        },
        removeItem: deleteItemAsync,
      },
      partialize: (state: SessionStore) => ({
        token: state.token,
        uuid: state.uuid,
      }),
    }
  )
);

useSessionStore.getState().initialize();
