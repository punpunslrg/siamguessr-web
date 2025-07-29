function FormInput({ name, register, errors, type = "text" }) {
  return (
    <>
      <input
        className="border w-full rounded-md border-gray-400 p-1 px-4"
        type={type}
        {...register(name)}
      />
        {errors[name] && (
          <p className="text-red-500 text-sm">{errors[name].message}</p>
        )}
    </>
  );
}
export default FormInput;
