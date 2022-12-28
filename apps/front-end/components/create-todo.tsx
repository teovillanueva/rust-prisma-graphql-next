import { IconPlus } from "@tabler/icons";
import { KeyboardEventHandler, useCallback, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  TodosDocument,
  TodosQuery,
  useCreateTodoMutation,
} from "../__generated__/graphql";
import { Card } from "./card";
import { IconButton } from "./icon-button";

export function CreateTodo() {
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Note: For simplicity we are just using a useState. In A real world app we might
   * consider using a library like `react-hook-form`
   */
  const [title, setTitle] = useState("");

  const [createTodo] = useCreateTodoMutation({
    variables: { input: { title } },
    optimisticResponse: (vars) => ({
      createTodo: {
        __typename: "Todo",
        id: uuid(),
        completed: false,
        title: vars.input.title,
      },
    }),
    update(cache, result) {
      const data: TodosQuery | null = cache.readQuery({ query: TodosDocument });

      if (result.data?.createTodo && data) {
        cache.writeQuery({
          query: TodosDocument,
          data: { todos: [result.data.createTodo, ...data.todos] },
        });
      }
    },
  });

  const onSubmit = useCallback(() => {
    if (title === "") {
      inputRef.current?.focus();

      return;
    }

    createTodo();
    setTitle("");
  }, [title, createTodo]);

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === "Enter") {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return (
    <Card>
      <input
        placeholder="Ex. Walk the dog tonight"
        value={title}
        onKeyDown={onKeyDown}
        ref={inputRef}
        onChange={(e) => setTitle(e.target.value)}
        className="px-2 h-6 flex-1 bg-gray-50 border border-gray-200 rounded outline-none focus:border-gray-400 transition-all text-base md:text-sm font-normal placeholder:text-gray-500/90"
      />
      <IconButton>
        <IconPlus onClick={onSubmit} />
      </IconButton>
    </Card>
  );
}
