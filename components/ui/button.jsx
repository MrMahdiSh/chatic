export default function Button({ res, text }) {
  return (
    <button
      onClick={res}
      className="bg-[#02292B] w-[100px] h-[50px] text-white rounded-lg"
    >
      {text}
    </button>
  );
}
