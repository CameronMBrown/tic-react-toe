import "./Heading.scss"

function Heading({ headingLvl = "h2", className, children }) {
  return (
    <div className="heading-wrapper">
      {headingLvl === "h1" && (
        <h1 className={`heading ${className}`}>{children}</h1>
      )}
      {headingLvl === "h2" && (
        <h2 className={`heading ${className}`}>{children}</h2>
      )}
      {headingLvl === "h3" && (
        <h3 className={`heading ${className}`}>{children}</h3>
      )}
      {headingLvl === "h4" && (
        <h4 className={`heading ${className}`}>{children}</h4>
      )}
    </div>
  )
}

export default Heading
