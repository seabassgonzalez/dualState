import { useState } from 'react'
import './App.css'
import AddInput from './components/AddInput'

const QUESTIONS = [
  'What are you purchasing?',
  'Why is this purchase needed?',
  'Please select a vendor from the following list:',
  'What are the terms of the contract?',
]

function App() {
  const [formValues, setFormValues] = useState({ first: '', second: '', vendor: 'Asana', terms: '' })
  const [currentStep, setCurrentStep] = useState(0)

  const VENDORS = ['Asana', 'Asana2', 'Asana3']
  const STEPS = ['details', 'terms']

  const isLastStep = currentStep === STEPS.length - 1

  const handleNext = () => setCurrentStep(step => Math.min(step + 1, STEPS.length - 1))
  const handleBack = () => setCurrentStep(step => Math.max(step - 1, 0))
  const handleSubmit = () => {
    console.log('Submit form:', formValues)
  }

  return (
    <div>
      <h1>My Zip Intake Form</h1>
      {currentStep === 0 ? (
        <div>
          <h2>Step 1: Request details</h2>
          <label>{QUESTIONS[0]}</label>
          <AddInput
            value={formValues.first}
            onChange={nextValue => setFormValues(prev => ({ ...prev, first: nextValue }))}
            showButton={false}
            placeholder="Enter the name of your request"
          />

          <label>{QUESTIONS[1]}</label>
          <AddInput
            value={formValues.second}
            onChange={nextValue => setFormValues(prev => ({ ...prev, second: nextValue }))}
            showButton={false}
            placeholder="Please make sure to include which teams will be involved"
          />

          <div><label>{QUESTIONS[2]}</label></div>
          <select
            value={formValues.vendor}
            onChange={e => setFormValues(prev => ({ ...prev, vendor: e.target.value }))}
          >
            {VENDORS.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <h2>Step 2: Contract details</h2>
          <label>{QUESTIONS[3]}</label>
          <AddInput
            value={formValues.terms}
            onChange={nextValue => setFormValues(prev => ({ ...prev, terms: nextValue }))}
            showButton={false}
            placeholder="E.g. 3 year contract"
          />
        </div>
      )}

      <div className="nav-controls">
        <button onClick={handleBack} disabled={currentStep === 0}>Back</button>
        {!isLastStep ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  )
}

export default App
