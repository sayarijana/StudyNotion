import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./RequirementField.css";

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [name,register,setRequirementsList, editCourse, course?.instructions])

  useEffect(() => {
    setValue(name, requirementsList)
  }, [requirementsList, name, setValue])

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="requirementField__container">
      <label htmlFor={name} className="requirementField__label">
        {label} <sup>*</sup>
      </label>
      <div className="requirementField__input-container">
        <input className="requirementField__input"
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="requirementField__add-btn"
        >
          Add
        </button>
      </div>
      {requirementsList.length > 0 && (
        <ul className="requirementField__list">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="requirementField__list-item">
              <span>{requirement}</span>
              <button className="requirementField__clear-btn"
                type="button"
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="requirementField__error-text">
          {label} is required
        </span>
      )}
    </div>
  )
}