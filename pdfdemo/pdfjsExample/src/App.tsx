import './App.css'
import PdfViewer1 from './components/pdfviewer1'
import PdfViewer2 from './components/pdfviewer2'

function App() {

  return (
    <>
     <PdfViewer1 pdfUrl={'../public/multi-test.pdf'}/>
     <br/>  
     <PdfViewer2 pdfUrl={'../public/multi-test.pdf'}/>
    </>
  )
}

export default App
