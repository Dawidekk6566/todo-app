function App() {
  return (
    <div className="h-screen min-w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold text-white">Lista zadań</h1>
        <input
          type="text"
          placeholder="Wpisz tutaj swoje zadanie..."
          className="px-4 py-6 text-[#94A3B8] w-[25vw] placeholder:text-[#94A3B8] placeholder:text-xl placeholder:text-left focus:outline-none bg-[#1E293B]"
        />
      </div>
    </div>
  );
}

export default App;
