interface checkBoxProps {
  label: string
  checked: boolean
  onChange: () => void
}

export default function Checkbox({ label, checked, onChange }: checkBoxProps) {
  return (
    <div className="flex flex-row items-center pl-1 text-white-f5 space-x-2.5 select-none">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <label>{label}</label>
    </div>
  )
}
