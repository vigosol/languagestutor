"use client";

import Script from "next/script";
import FloatingWhatsApp from "./FloatingWhatsapp";

type Props = {
  desktopChatTool?: "none" | "whatsapp" | "tawk";
  mobileChatTool?: "none" | "whatsapp" | "tawk";
  whatsappNumber?: string;
  tawkToWidgetUrl?: string;
};

export default function ChatWidgets({
  desktopChatTool = "tawk",
  mobileChatTool = "whatsapp",
  whatsappNumber,
  tawkToWidgetUrl,
}: Props) {
  const showWhatsappDesktop = desktopChatTool === "whatsapp";
  const showWhatsappMobile = mobileChatTool === "whatsapp";

  const showTawkDesktop = desktopChatTool === "tawk";
  const showTawkMobile = mobileChatTool === "tawk";

  const showTawk = tawkToWidgetUrl && (showTawkDesktop || showTawkMobile);

  return (
    <>
      {(showWhatsappDesktop || showWhatsappMobile) && (
        <FloatingWhatsApp
          whatsappNumber={whatsappNumber}
          className={[
            showWhatsappDesktop ? "md:flex" : "md:hidden",
            showWhatsappMobile ? "flex" : "hidden",
          ].join(" ")}
        />
      )}

      {showTawk && (
        <div
          className={[
            showTawkDesktop ? "md:block" : "md:hidden",
            showTawkMobile ? "block" : "hidden",
          ].join(" ")}
        >
          <Script
            id="tawk-to-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='${tawkToWidgetUrl}';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                })();
              `,
            }}
          />
        </div>
      )}
    </>
  );
}