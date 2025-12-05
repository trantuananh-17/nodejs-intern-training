import {
  BlockStack,
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
import useCreateApi from "../../hooks/useCreateApi";
import useDeleteApi from "../../hooks/useDeleteApi";
import useFetchApi from "../../hooks/useFetchApi";
import useUpdateApi from "../../hooks/useUpdateApi";
import EmptyTodo from "./EmptyTodo";
import ResourceListData from "./ResourceListData";
import { envConfig } from "../../configs/env.config";
import LoadingOverlay from "./LoadingOverLay";

function PageContent() {
  const [activeModal, setActiveModal] = useState(false);
  const [text, setText] = useState("");
  console.log(envConfig.server.url);

  const {
    data,
    setData,
    loading: fetchLoading,
    fetched,
  } = useFetchApi({
    url: envConfig.server.url,
    // url: "http://localhost:5000/api/v1/todos",
  });

  console.log(data);

  const { createData, loading: createLoading } = useCreateApi();

  const { updateData, loading: updateLoading } = useUpdateApi();

  const { deleteData, loading: deleteLoading } = useDeleteApi();

  const hanleCreateTodo = async ({ text }) => {
    const todo = await createData({
      url: envConfig.server.url,
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
      url: `${envConfig.server.url}/${id}`,
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
      url: `${envConfig.server.url}/${id}`,
    });

    if (!deletedTodo?.success) {
      return;
    }

    const newTodos = data.data.filter((item) => item.id !== id);

    setData({ ...data, data: newTodos });
  };

  const handleDeleteManyTodo = async ({ todoIds }) => {
    const deletedTodos = await deleteData({
      url: `${envConfig.server.url}/delete-many`,
      body: { todoIds },
    });

    if (!deletedTodos?.success) {
      return;
    } else {
      const newTodos = data.data.filter((todo) => !todoIds.includes(todo.id));

      setData({ ...data, data: newTodos });
    }
  };

  const hanleUpdateManyTodo = async ({ todoIds, isCompleted }) => {
    const updatedData = await updateData({
      url: `${envConfig.server.url}/update-many`,
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
    hanleCreateTodo(payload);
    setActiveModal(false);
    setText("");
  }, [text]);

  const handleTextChange = useCallback((value) => setText(value), []);

  console.log({ createLoading, updateLoading, deleteLoading });

  return (
    <Page
      title="Todoes"
      primaryAction={{
        content: "Create",
        icon: PlusIcon,
        accessibilityLabel: "Create todo",
        onAction: handleChange,
      }}
      style={{ position: "relative" }}
    >
      {(createLoading || updateLoading || deleteLoading) && <LoadingOverlay />}

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

      {fetched && data?.data.length === 0 && <EmptyTodo />}

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
