'use client'

import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { useEffect } from 'react'
import clsx from 'clsx'

export const LightBox = ({
  media,
  className = "",
  isOpenModel,
  setIsOpenModel,
  isAutoplay = false,
}: Props) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpenModel(false)
    }

    if (isOpenModel) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpenModel])

  function close() {
    setIsOpenModel(false)
  }

  const getYouTubeEmbed = (url: string) => {
    let videoId = ""

    try {
      const u = new URL(url)

      if (u.hostname.includes("youtu.be")) {
        videoId = u.pathname.replace("/", "")
      }

      if (u.hostname.includes("youtube.com")) {
        videoId = u.searchParams.get("v") || ""
      }
    } catch {
      return url
    }

    if (!videoId) return url

    return `https://www.youtube.com/embed/${videoId}?autoplay=${
      isAutoplay ? 1 : 0
    }&rel=0`
  }

  const isImage = /\.(jpg|jpeg|png|gif|webp)$/.test(media)
  const isYouTube = media.includes("youtube") || media.includes("youtu.be")

  return (
    <Dialog open={isOpenModel} onClose={close} className="relative z-50">

      {/* ✅ THIS is the key fix */}
      <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-md" />

      <div className="fixed inset-0 flex items-center justify-center p-4">

        <DialogPanel
          className="w-[95vw] h-[80vh] md:w-[80vw] md:h-[85vh]"
        >

          {isImage ? (
            <img
              src={media}
              className={clsx("w-full h-full object-contain rounded-lg", className)}
            />
          ) : isYouTube ? (
            <iframe
              key={media}
              className="w-full h-full rounded-lg"
              src={getYouTubeEmbed(media)}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          ) : (
            <iframe
              className="w-full h-full rounded-lg"
              src={media}
              allowFullScreen
            />
          )}

        </DialogPanel>
      </div>
    </Dialog>
  )
}