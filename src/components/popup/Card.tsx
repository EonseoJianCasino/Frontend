import React from 'react'

type CardProps = {
  title?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="popup_cardSection">
      <div className="popup_card">
        {title != null ? <div className="popup_cardHeader">{title}</div> : null}
        {children}
      </div>
    </div>
  )
}
