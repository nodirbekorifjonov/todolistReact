import React, { useState } from "react";

// icons
import { FaPlus, FaCheck, FaTrash } from "react-icons/fa6";
import { RiCheckDoubleLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const ToDo = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [todoModal, setTodoModal] = useState("");
  const [markedTodo, setMarkedTodo] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    if (inputValue.trim() !== "") {
      setTodoList([...todoList, inputValue]);
      setInputValue("");
    }
    event.preventDefault();
  };

  const handleDone = (todo, index) => {
    setMarkedTodo([...markedTodo, todo]);
    const updateList = todoList.filter((_, event) => event !== index);
    setTodoList(updateList);
  };

  const handleDeleteTodo = (index) => {
    const updateList = todoList.filter((_, e) => e !== index);
    setTodoList(updateList);
  };

  const handleDeleteDone = (index) => {
    const updateMarkedList = markedTodo.filter((_, event) => event !== index);
    setMarkedTodo(updateMarkedList);
  };

  const handleUnmark = (marked, index) => {
    setTodoList([...todoList, marked]);
    const updateMarkedList = markedTodo.filter((_, event) => event !== index);
    setMarkedTodo(updateMarkedList);
  };

  return (
    <section className="flex flex-col gap-[5rem] w-[432px] max-[470px]:w-[90%]">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex items-center gap-[1rem]"
      >
        <input
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={handleChange}
          className="w-full py-[1rem] px-[1.5rem] outline-none border border-[#3E1671] bg-transparent rounded-[1rem] placeholder:text-[#777777]"
        />
        <button
          type="submit"
          className="bg-[#9E78CF] w-[4rem] h-[4rem] rounded-[1rem] flex justify-center items-center shrink-0 transition-all hover:bg-[#8760bb]"
        >
          <FaPlus />
        </button>
      </form>
      <div className="overflow-x-auto h-[50vh] flex flex-col gap-[5rem]">
        {/* ToDo */}
        {todoList.length ? (
          <div className="flex flex-col gap-[1.6rem]">
            <h3>Tasks to do - {todoList.length}</h3>
            <ul className="flex flex-col gap-[1.6rem]">
              {todoList.map((todo, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer bg-[#15101C] p-[2rem] rounded-[1rem] flex justify-between items-center text-[#9E78CF]"
                  >
                    <p onClick={() => setTodoModal(todo)}>
                      {todo.length >= 25 ? `${todo.slice(0, 24)}...` : todo}
                    </p>
                    <div className="flex items-center gap-[0.8rem]">
                      <button
                        onClick={() => handleDone(todo, index)}
                        className="w-[3rem] h-[3rem] transition-all active:text-[#3E1671]"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(index)}
                        className="w-[3rem] h-[3rem] transition-all active:text-[#3E1671]"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <span>No ToDos :(</span>
        )}
        {/* Done */}
        <div className="flex flex-col gap-[1.6rem] h-[50vh]">
          <h3>{`Done - ${markedTodo.length}`}</h3>
          <ul className="flex flex-col gap-[1.6rem]">
            {markedTodo.map((marked, index) => {
              return (
                <li
                  key={index}
                  className="cursor-pointer bg-[#15101C] p-[2rem] rounded-[1rem] flex justify-between items-center text-[#78CFB0] "
                >
                  <p
                    onClick={() => setTodoModal(marked)}
                    className="line-through"
                  >
                    {marked.length >= 25 ? `${marked.slice(0, 24)}...` : marked}
                  </p>
                  <div className="flex items-center gap-[0.8rem]">
                    <button
                      onClick={() => handleUnmark(marked, index)}
                      className="w-[3rem] h-[3rem] text-[2rem] transition-all active:text-[#78cfb198]"
                    >
                      <RiCheckDoubleLine />
                    </button>
                    <button
                      onClick={() => handleDeleteDone(index)}
                      className="w-[3rem] h-[3rem] transition-all active:text-[#78cfb198]"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* Modal */}
      {todoModal.length ? (
        <div className="absolute w-full h-full bg-[#0000009c] top-0 left-0 flex justify-center items-center">
          <div className="relative w-[432px] h-[70vh] overflow-y-auto bg-[#1D1825] px-[2rem] rounded-[1rem] py-[4rem] max-[470px]:w-[90%]">
            <button
              onClick={() => setTodoModal("")}
              className="absolute top-0 right-0 flex justify-center items-center w-[4rem] h-[4rem] text-[2rem] rounded-tr-[10px] transition-all hover:bg-[#3E1671]"
            >
              <IoClose />
            </button>
            <div>{todoModal}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default ToDo;
