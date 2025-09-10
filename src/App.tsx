import { ErrorBoundary } from "@components";
import { FallbackUI } from "components/FallBackUI/FallBackUI";
import { Footer } from "@components";

function App() {
  return (
    <ErrorBoundary fallback={<FallbackUI />}>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 p-6"></main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
