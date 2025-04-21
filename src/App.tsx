import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
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
      <main className="relative bg-background w-full h-screen overflow-auto">
        <section role="list" className="mx-auto my-0 max-w-[1328px]">
          <NewTask />
          <TaskList />
        </section>
      </main>
    </PersistQueryClientProvider>
  );
}

export default App;
