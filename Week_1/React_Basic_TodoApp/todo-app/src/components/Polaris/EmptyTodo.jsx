import { EmptyState } from "@shopify/polaris";

function EmptyTodo() {
  return (
    <EmptyState
      heading="Empty Todo"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      fullWidth
    >
      Create a todo now!
    </EmptyState>
  );
}

export default EmptyTodo;
