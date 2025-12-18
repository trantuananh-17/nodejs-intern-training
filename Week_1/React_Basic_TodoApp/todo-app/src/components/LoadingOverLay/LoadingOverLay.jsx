import { Spinner } from "@shopify/polaris";

function LoadingOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "var(--p-border-radius-300)",
      }}
    >
      <Spinner accessibilityLabel="Loading..." size="large" />
    </div>
  );
}

export default LoadingOverlay;
