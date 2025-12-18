import "./App.css";
import AppLayout from "./layouts/AppLayout/AppLayout";
import TodoPolaris from "./pages/TodoPolaris/TodoPolaris";

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
