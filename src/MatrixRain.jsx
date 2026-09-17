import './MatrixRain.css'

const MatrixRain = ({ columns = 40 }) => {
  return (
    <div className="matrix-container">
      <div className="matrix-pattern">
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{
              left: `${(i * 100) / columns}%`,
              animationDelay: `-${(Math.random() * 3 + 1).toFixed(1)}s`,
              animationDuration: `${(Math.random() * 2 + 2.5).toFixed(1)}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default MatrixRain