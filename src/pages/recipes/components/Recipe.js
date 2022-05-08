import React from 'react'

export default function Recipe({recipe}) {
    console.log(recipe)
  return (
    <div>Recipe: {recipe[1].name}
    </div>
  )
}
