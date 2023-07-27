import InputProps from "../components/ui/input/input.interface"

type handleInputChange = Pick<InputProps, "setState"> & {
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
}

const handleInputChange = ({ event, setState }: handleInputChange) => {
    const value = event.target.value
    setState(value)
}
export default handleInputChange