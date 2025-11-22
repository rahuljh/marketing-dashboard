import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { FiltersBar } from "./components/FiltersBar";
import { TotalsPanel } from "./components/TotalsPanel";
import { DataTable } from "./components/DataTable";
import { PerformanceChart } from "./components/PerformanceChart";
import "./styles.css";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app-root">
        <header className="app-header">
          <h1>Marketing Dashboard</h1>
          <p>Performance & State Management Challenge</p>
        </header>

        <main className="app-main">
          <section className="app-top">
            <FiltersBar />
            <TotalsPanel />
          </section>

          <section className="app-middle">
            <div className="panel">
              <h2>Performance Insights</h2>
              <PerformanceChart />
            </div>
          </section>

          <section className="app-bottom">
            <div className="panel">
              <h2>Channel Performance Table</h2>
              <DataTable />
            </div>
          </section>
        </main>
      </div>
    </Provider>
  );
};

export default App;