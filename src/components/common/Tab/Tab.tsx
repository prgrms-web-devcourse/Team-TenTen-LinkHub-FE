interface TabProps {
  children?: React.ReactNode
}

const Tab = ({ children }: TabProps) => {
  return (
    <div className="sticky top-[53px] flex bg-bgColor transition ease-in-out">
      {children}
    </div>
  )
}

export default Tab
