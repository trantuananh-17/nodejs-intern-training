import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  InlineStack,
  ResourceItem,
  ResourceList,
  Text,
} from "@shopify/polaris";
import { useState } from "react";

function ResourceListData({
  data,
  onUpdate,
  onDelete,
  onDeleteMany,
  onUpdateMany,
}) {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: "todo",
    plural: "todos",
  };

  return (
    <>
      <ResourceList
        resourceName={resourceName}
        items={data ?? []}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
      />
      {selectedItems.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            zIndex: 10,
            marginTop: "10px",
          }}
        >
          <Box
            padding="300"
            borderRadius="300"
            background="bg-surface"
            shadow="300"
            minWidth="fit-content"
            marginTop="200"
          >
            <InlineStack gap="300" align="center">
              <Button
                onClick={() => {
                  onUpdateMany({
                    todoIds: selectedItems,
                    isCompleted: true,
                  });
                  setSelectedItems([]);
                }}
              >
                Complete
              </Button>
              <Button
                onClick={() => {
                  onUpdateMany({
                    todoIds: selectedItems,
                    isCompleted: false,
                  });
                  setSelectedItems([]);
                }}
              >
                Incomplete
              </Button>
              <Button
                tone="critical"
                onClick={() => {
                  onDeleteMany({ todoIds: selectedItems });
                  setSelectedItems([]);
                }}
              >
                Delete
              </Button>
            </InlineStack>
          </Box>
        </div>
      )}
    </>
  );

  function renderItem(item) {
    const { id, text, isCompleted } = item;

    return (
      <ResourceItem id={id} accessibilityLabel={`View details for ${text}`}>
        <InlineStack align="space-between" blockAlign="center">
          {/* Bên trái */}
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {text}
          </Text>

          {/* Bên phải */}
          <ButtonGroup>
            {isCompleted ? (
              <Badge tone="success">Complete</Badge>
            ) : (
              <Badge tone="attention">Incomplete</Badge>
            )}
            <Button disabled={isCompleted} onClick={() => onUpdate({ id })}>
              Complete
            </Button>
            <Button onClick={() => onDelete({ id })}>Delete</Button>
          </ButtonGroup>
        </InlineStack>
      </ResourceItem>
    );
  }
}

export default ResourceListData;
