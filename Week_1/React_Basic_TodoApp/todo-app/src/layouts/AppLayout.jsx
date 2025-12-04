import { Frame } from "@shopify/polaris";
import Header from "../components/Polaris/Header";
const logo = {
  topBarSource:
    "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
  width: 86,
  url: "#",
  accessibilityLabel: "Shopify",
};

function AppLayout({ children }) {
  return (
    <Frame topBar={<Header />} navigation={null} logo={logo}>
      <div style={{ background: "#fff", minHeight: "100vh" }}>{children}</div>
    </Frame>
  );
}

export default AppLayout;
