import {
  BlockStack,
  Box,
  Button,
  Form,
  FormLayout,
  Modal,
  Page,
  Spinner,
  Text,
  TextField,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import ResourceListData from "./ResourceListData";
import useFetchApi from "../../hooks/useFetchApi";
import useCreateApi from "../../hooks/useCreateApi";
import useDeleteApi from "../../hooks/useDeleteApi";
import useUpdateApi from "../../hooks/useUpdateApi";

function PageContent() {
  const [activeModal, setActiveModal] = useState(false);
  const [text, setText] = useState("");

  const {
    data,
    setData,
    loading: fetchLoading,
    fetched,
  } = useFetchApi({
    url: "http://localhost:5000/api/v1/todos",
  });

  const { createData } = useCreateApi();

  const { updateData } = useUpdateApi();

  const { deleteData } = useDeleteApi();

  const hanleCreateTodo = async ({ text }) => {
    const todo = await createData({
      url: "http://localhost:5000/api/v1/todos",
      body: { text },
    });

    if (!todo?.success) {
      return;
    }

    const newTodos = [todo.data, ...data.data];

    setData({ ...data, data: newTodos });
  };

  const handleUpdateTodo = async ({ id }) => {
    const todo = await updateData({
      url: `http://localhost:5000/api/v1/todos/${id}`,
      body: { isCompleted: true },
    });

    if (!todo?.success) {
      return;
    }

    const newTodos = data?.data?.map((item) =>
      item.id === todo?.data?.id ? todo.data : item
    );

    setData({ ...data, data: newTodos });
  };

  const handleDeleteTodo = async ({ id }) => {
    const deletedTodo = await deleteData({
      url: `http://localhost:5000/api/v1/todos/${id}`,
    });

    if (!deletedTodo?.success) {
      return;
    }

    const newTodos = data.data.filter((item) => item.id !== id);

    setData({ ...data, data: newTodos });
  };

  const handleDeleteManyTodo = async ({ todoIds }) => {
    const deletedTodos = await deleteData({
      url: `http://localhost:5000/api/v1/todos/delete-many`,
      body: { todoIds },
    });

    if (!deletedTodos?.success) {
      return;
    }

    const newTodos = data.data.filter((todo) => !todoIds.includes(todo.id));

    setData({ ...data, data: newTodos });
  };

  const hanleUpdateManyTodo = async ({ todoIds, isCompleted }) => {
    const updatedData = await updateData({
      url: `http://localhost:5000/api/v1/todos/update-many`,
      body: { todoIds, isCompleted },
    });

    if (!updatedData?.success) {
      return;
    }

    const updatedTodos = data?.data.map((todo) => {
      if (todoIds.includes(todo.id)) {
        return { ...todo, isCompleted };
      }
      return todo;
    });

    setData({ ...data, data: updatedTodos });
  };

  // Mở. đóng modal
  const handleChange = useCallback(
    () => setActiveModal(!activeModal),
    [activeModal]
  );

  // Form
  const handleSubmit = useCallback(() => {
    const payload = { text };
    console.log(payload);
    hanleCreateTodo(payload);
    setActiveModal(false);
    setText("");
  }, [text]);

  const handleTextChange = useCallback((value) => setText(value), []);

  return (
    <Page
      title="Todoes"
      primaryAction={{
        content: "Create",
        icon: PlusIcon,
        accessibilityLabel: "Create todo",
        onAction: handleChange,
      }}
    >
      {/* List todo */}
      {fetchLoading ? (
        <BlockStack inlineAlign="center">
          <Spinner accessibilityLabel="Spinner example" size="large" />
          <Text variant="headingLg" as="p">
            Loading....
          </Text>
        </BlockStack>
      ) : (
        <BlockStack gap="200">
          <ResourceListData
            data={data?.data}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
            onDeleteMany={handleDeleteManyTodo}
            onUpdateMany={hanleUpdateManyTodo}
          />
        </BlockStack>
      )}

      {/* Modal */}
      <Modal
        open={activeModal}
        onClose={handleChange}
        title="Create todo"
        primaryAction={{
          content: "Add",
          onAction: handleSubmit,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                value={text}
                onChange={handleTextChange}
                label="Title"
                type="text"
                placeholder="Nhập todo vào đây...."
              />
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>
    </Page>
  );
}

export default PageContent;
