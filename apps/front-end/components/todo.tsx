import { useCallback, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons";
import {
  TodoItem_TodoFragment,
  UpdateTodoInput,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../__generated__/graphql";
import { IconButton } from "./icon-button";
import { Card } from "./card";

export type TodoItemProps = {
  todo: TodoItem_TodoFragment;
};

export function TodoItem({ todo }: TodoItemProps) {
  const [updateTodo] = useUpdateTodoMutation({
    optimisticResponse: (vars) => {
      return {
        updateTodo: {
          __typename: "Todo",
          completed:
            typeof vars.input.completed === "bigint"
              ? vars.input.completed
              : todo.completed,
          title: vars.input.title || todo.title,
          id: todo.id,
        },
      };
    },
  });

  const [deleteTodo] = useDeleteTodoMutation({
    variables: { todoId: todo.id },
    optimisticResponse: { deleteTodo: { deletedId: todo.id } },
    update(cache) {
      const normalizedId = cache.identify({ id: todo.id, __typename: "Todo" });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const edit = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, []);

  const saveChanges = useCallback(
    (input: UpdateTodoInput) => {
      updateTodo({
        variables: { todoId: todo.id, input },
      });

      setIsEditing(false);
    },
    [updateTodo, todo]
  );

  return (
    <Card>
      <input
        id="default-checkbox"
        type="checkbox"
        className="w-4 h-4 bg-gray-100 rounded border-gray-300"
        defaultChecked={todo.completed}
        onChange={useDebouncedCallback(
          (e) =>
            updateTodo({
              variables: {
                todoId: todo.id,
                input: { completed: e.target.checked },
              },
            }),
          700
        )}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          className="text-base md:text-sm flex-1 font-normal"
          defaultValue={todo.title}
          onKeyDown={(e) =>
            e.key === "Enter"
              ? saveChanges({ title: inputRef.current?.value })
              : null
          }
        />
      ) : (
        <p className="text-base md:text-sm overflow-hidden break-words flex-1 font-normal">
          {todo.title}
        </p>
      )}
      {isEditing ? (
        <>
          <IconButton onClick={() => setIsEditing(false)}>
            <IconX />
          </IconButton>
          <IconButton
            onClick={() => saveChanges({ title: inputRef.current?.value })}
          >
            <IconCheck />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={edit}>
            <IconPencil />
          </IconButton>
          <IconButton onClick={() => deleteTodo()}>
            <IconTrash />
          </IconButton>
        </>
      )}
    </Card>
  );
}
