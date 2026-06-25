import Image from "next/image";

type Props = {
  whatsappNumber?: string;
  className?: string;
};

export default function FloatingWhatsApp({
  whatsappNumber = "923005467345",
  className = "",
}: Props) {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] hover:scale-110 transition-transform duration-300 ${className}`}
    >
      <Image
        src="/whatsapp-icon.png"
        alt="WhatsApp"
        width={60}
        height={60}
        className="w-14 h-14 md:w-16 md:h-16"
      />
    </a>
  );
}