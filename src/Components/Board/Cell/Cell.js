import React, { useState } from 'react'

// styles
import "./Cell.scss"

// components
import XSymbol from '../../Symbols/XSymbol'
import OSymbol from '../../Symbols/OSymbol'

export default function Cell( props ) {
   const { cellID, contents, parentX, parentY, onMakeMove } = props
   const [isFilled, setIsFilled] = useState(false)

   const moveHandler = () => {
      // do not overrite a previously made move
      if (isFilled) return 
      setIsFilled(true);

      const Xpos = parseInt(cellID.substr(-2, 1))
      const Ypos = parseInt(cellID.substr(-1))

      onMakeMove(parentX, parentY, Xpos, Ypos)
   }

   return (
         <div className="cell" id={cellID} onClick={moveHandler}>
            { contents === "X" && <XSymbol /> }
            { contents === "O" && <OSymbol /> }
         </div>
   )
}
