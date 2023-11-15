import { useCallback, useEffect } from 'react'

export interface useModalLogicProps {
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onSubmit?: () => void
  modalRef: React.RefObject<HTMLDivElement | null>
}

export interface UseModalLogicReturnType {
  handleClickOverlay: (e: React.MouseEvent<HTMLDivElement>) => void
  handleClickConfirm: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const useModalLogic = ({
  onClose,
  onConfirm,
  onSubmit,
  modalRef,
}: useModalLogicProps): UseModalLogicReturnType => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onConfirm])

  const handleClickOverlay = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === modalRef.current) {
        onClose()
      }
    },
    [modalRef, onClose],
  )

  const handleClickConfirm = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      onConfirm?.()
      onSubmit?.()
      onClose()
    },
    [onConfirm, onSubmit, onClose],
  )

  return { handleClickOverlay, handleClickConfirm }
}

export default useModalLogic
