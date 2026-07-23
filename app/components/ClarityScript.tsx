"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function ClarityScript() {
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    if (window.location.hostname === "www.drvrushali.com") {
      setIsProduction(true);
    }
  }, []);

  if (!isProduction) return null;

  return (
    

    <Script id="microsoft-clarity" strategy="afterInteractive">
      window.addEventListener('error', function(e) {
  if (e.message && e.message.includes('webkit.messageHandlers')) {
    e.stopImmediatePropagation();
    e.preventDefault();
    return true;
  }
}, true);
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "xo7vc6f94h");
      `}
    </Script>
  );
}
