function AddInput({ value, onChange, onAdd, showButton = true, buttonLabel = 'Add', placeholder }) {
  const handleSubmit = () => {
    onAdd(value);
  };

  return (
    <div>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      {showButton && <button onClick={handleSubmit}>{buttonLabel}</button>}
    </div>
  );
};

export default AddInput


