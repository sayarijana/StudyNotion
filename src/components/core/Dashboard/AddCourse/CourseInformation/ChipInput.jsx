// Importing React hook for managing component state
import { useEffect, useState } from "react"
// Importing React icon component
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"
import "./ChipInput.css";

// Defining a functional component ChipInput
export default function ChipInput({
  // Props to be passed to the component
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)

  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tags);
    }
    register(name, { required: true, validate: (value) => value.length > 0 })

  }, [])

  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim();

      // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  // Function to handle deletion of a chip
  const handleDeleteChip = (chipIndex) => {
    // Filter the chips array to remove the chip with the given index
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  // Render the component
  return (
    <div className="ChipInput-container">
      {/* Render the label for the input */}
      <label htmlFor={name} className="ChipInput-label">
        {label} <sup>*</sup>
      </label>
      {/* Render the chips and input */}
      <div className="ChipInput-wrapper">
        {/* Map over the chips array and render each chip */}
        { Array.isArray(chips) && chips.map((chip, index) => (
          <div key={index} className="ChipInput-chip">
            {chip}
            <button
              type="button"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose/>
            </button>
          </div>
        ))}
        {/* Render the input for adding new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="ChipInput-input"
        />
      </div>
      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span className="ChipInput-error">
          {label} is required
        </span>
      )}
    </div>
  )
}