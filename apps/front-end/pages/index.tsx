import { GetServerSideProps } from "next";
import { CreateTodo } from "../components/create-todo";
import { TodoItem } from "../components/todo";
import { useTodosQuery } from "../__generated__/graphql";
import { ssrTodos } from "../__generated__/page";

export default function Home() {
  const { data } = useTodosQuery();

  return (
    <>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col space-y-3 md:space-y-2 md:items-center">
          <h1 className="text-2xl md:w-96 mb-1 md:mb-2 font-medium">
            My To-Do List
          </h1>
          <CreateTodo />
          {data?.todos.map((todo, idx) => (
            <TodoItem key={`TodoItem_${todo.id}_${idx}`} todo={todo} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return ssrTodos.getServerPage({}, ctx);
};
