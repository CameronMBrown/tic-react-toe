export default function Button( props ) {
    const { classes, action } = props

    return (
        <button className={"btn " + classes.join(" ")}
            onClick={action}>
            { props.children }
        </button>
    )
}