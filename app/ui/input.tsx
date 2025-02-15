type InputProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "email";
};

export const Input = ({ id, label, placeholder, type = "text"}: InputProps) => {
    return (
    <label htmlFor={id} className="form-control">
      <div className="label">
        <span className="label-text text-accent-content">{label}</span>
      </div>
      <input
        id={id}
        name={id}
        className="input input-bordered"
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
};
