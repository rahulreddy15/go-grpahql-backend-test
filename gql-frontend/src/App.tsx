import MiddleStuff from "./components/MiddleStuff";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <>
      <TooltipProvider>
        <MiddleStuff />
      </TooltipProvider>
    </>
  );
}

export default App;
