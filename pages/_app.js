import "../public/css/main.css";
import SiteLayout from "../layouts/siteLayout";

function MyApp({ Component, pageProps }) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

export default MyApp;
