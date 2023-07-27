export default interface InputProps {
    type: string,
    setState:(value: string) => void,
    state:string,
    htmlFor:string,
    labelChildren:string
}