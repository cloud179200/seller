import React, { InputHTMLAttributes } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  onRightIconClick?: React.MouseEventHandler<HTMLButtonElement>
  rightIcon?: React.ReactNode,
  bottomComponent?: React.ReactNode,
}

function CustomInput(props: IProps) {
  const { label, rightIcon, onRightIconClick, bottomComponent, ...restProps } = props
  return (
    <>
      {label && <label className="mb-2 block text-sm font-bold text-gray-700" >{label}</label>}
      <input className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-200" {...restProps} />
      {rightIcon && <span className="absolute inset-y-0 right-0 flex items-center pr-3">
        <button className="focus:outline-none" onClick={onRightIconClick}>
          {rightIcon}
        </button>
      </span>}
      {bottomComponent}
    </>
  )
}

export default CustomInput