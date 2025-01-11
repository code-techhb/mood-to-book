import { useEffect } from "react";

export function GoogleAnalytics() {
  useEffect(() => {
    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${
      import.meta.env.VITE_GOOGLE_ANALYTICS_ID
    }`;

    const configScript = document.createElement("script");
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', '${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}');
    `;

    // Add to document
    document.head.appendChild(gtagScript);
    document.head.appendChild(configScript);

    return () => {
      document.head.removeChild(gtagScript);
      document.head.removeChild(configScript);
    };
  }, []);

  return null;
}
