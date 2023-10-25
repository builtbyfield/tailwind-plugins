import { Container } from "./container";
import { LayoutOverlay } from "./layout-overlay";

export function App() {
  return (
    <>
      <main className="py-20">
        <div className="container">
          <div className="w-10-cols bg-blue-500/20">
            <p>Test</p>
            <div className="w-5-cols bg-blue-500/20">
              <p>Test</p>
            </div>
          </div>
          <div className="w-6-cols bg-blue-500/20">
            <p>Test</p>
            <div className="w-1/2-cols bg-blue-500/20">
              <p>Test</p>
            </div>
          </div>
          <div className="breakout bg-blue-500/20">Breakout</div>
        </div>
        <Container />
      </main>
      <LayoutOverlay />
    </>
  );
}
