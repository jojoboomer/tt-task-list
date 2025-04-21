import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import RootLayout from "./components/layout/root";
import { NewTask } from "./components/Task/NewTask";
import TaskList from "./components/TaskList";
import { queryClient, syncPersister } from "./lib/queryClient";

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: syncPersister,
      }}
    >
      <RootLayout>
        <NewTask />
        <TaskList />
      </RootLayout>
    </PersistQueryClientProvider>
  );
}

export default App;
