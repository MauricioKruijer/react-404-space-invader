import './App.css'

function App() {

  return (
    <>
      <p className="center">
        Space Invadors destroyed this page! Take revenge on them!<br/>
        Use <span className="label label-danger">Space</span> to shoot and <span className="label label-danger">←</span>&#160;<span className="label label-danger">→</span> to move!&#160;&#160;&#160;
        <button className="btn btn-default btn-xs" id="restart">Restart</button>
      </p>
      <canvas id="space-invaders"/>
    </>
  )
}

export default App
