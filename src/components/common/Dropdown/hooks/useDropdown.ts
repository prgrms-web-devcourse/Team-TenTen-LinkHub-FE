'use client'

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

export interface useDropdownProps {
  defaultIndex?: number
  el: React.RefObject<HTMLDivElement>
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const useDropdown = ({
  defaultIndex,
  el,
  onChange,
}: useDropdownProps): {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  index: number
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, i: number) => void
} => {
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(defaultIndex ?? 0)

  useEffect(() => {
    setIndex(defaultIndex ?? 0)
  }, [defaultIndex])

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isOpen && el.current && !el.current?.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClose)

    return () => {
      document.removeEventListener('click', handleOutsideClose)
    }
  }, [isOpen, el])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
      setIndex(i)
      onChange?.(e)
      setIsOpen(false)
    },
    [onChange, setIsOpen],
  )

  return { isOpen, setIsOpen, index, handleClick }
}

export default useDropdown
