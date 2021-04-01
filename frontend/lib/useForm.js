import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // Create a state object for our fields
  const [inputs, setInputs] = useState(initial);

  const initalValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initalValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;

    // Checking for numbers and changing html inputs form string to number for Apollo
    if (type === 'number') {
      value = parseInt(value);
    }

    // Required for to set the first index as the file for files
    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      // Copy existing state
      ...inputs,
      // update/overwrite existing state dynamically
      [name]: value,
    });
  }

  // Reseting back to initial State
  function resetForm() {
    setInputs(initial);
  }

  // Clear inputs/form
  function clearForm(e) {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );

    setInputs(blankState);
  }

  // return the things we want to surface from custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
