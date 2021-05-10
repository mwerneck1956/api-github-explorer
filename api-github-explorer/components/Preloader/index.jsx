import React from "react"
import ContentLoader from "react-content-loader"

export const Preloader = (props) => (
  <div
    style={{
      margin: '0 auto',
      maxWidth: '1100px',
    }}
  >
    <ContentLoader 
    speed={2}
    width={1350}
    height={1000}
    viewBox="0 0 1350 1000"
    backgroundColor="#e3e3e3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="6" y="14" rx="3" ry="3" width="967" height="112" /> 
    <rect x="7" y="147" rx="3" ry="3" width="967" height="112" /> 
    <rect x="6" y="285" rx="3" ry="3" width="967" height="112" /> 
    <rect x="5" y="428" rx="3" ry="3" width="967" height="112" /> 
    <rect x="5" y="573" rx="3" ry="3" width="967" height="112" />
  </ContentLoader>
  </div>
)
