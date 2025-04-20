import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
        networkMode: 'offlineFirst',
      staleTime: 1000 * 60 * 5, 
      gcTime: 1000 * 60 * 60 * 24 
    },
    mutations: {
      retry: 3,
      networkMode: 'offlineFirst',
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});

export const syncPersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: "react-query-notes-cache"
});
