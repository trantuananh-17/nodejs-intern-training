import "./App.css";
import AppLayout from "./layouts/AppLayout";
import TodoPolaris from "./pages/TodoPolaris";

function App() {
  return (
    <div className="wrap">
      {/* <TodoBasic /> */}
      <AppLayout>
        <TodoPolaris />
      </AppLayout>
    </div>
  );
}

export default App;
