"use client";
import { signOut } from "next-auth/react";
import { useAuth } from "../lib/useAuth";
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser, FaSignOutAlt, FaEllipsisV } from 'react-icons/fa'; // Importing Font Awesome icons
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';

interface Todo {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ProtectedPage() {
  const { session, loading } = useAuth();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<{ title: string; description: string }>({ title: '', description: '' });

  useEffect(() => {
    if (session?.user?.email) {
      try {
        const svg = createAvatar(lorelei, {
          seed: session.user.email,
        });
        setAvatar(svg.toDataUri());
      } catch (error) {
        console.error("Error generating avatar:", error);
        setAvatar(null); // Fallback to null or a default avatar
      }
    }
  }, [session]);

  const handleAddTodo = () => {
    if (newTodo.title && newTodo.description) {
      const newTodoItem: Todo = {
        id: Date.now(), // Simple ID generation
        title: newTodo.title,
        description: newTodo.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo({ title: '', description: '' }); // Reset input fields
      setOpen(false); // Close the modal
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const [open, setOpen] = useState(false); // Modal open state

  if (loading || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <nav className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <p className="text-white text-lg font-semibold">Todo</p>
          <div className="flex items-center">
            <FaUser className="h-5 w-5 text-white mr-2" aria-hidden="true" />
            <p className="text-white mr-2">Hi <strong>{session?.user?.name}!</strong> 👋</p>
            <Image
              src={avatar || "https://www.gravatar.com/avatar/?d=mp&f=y&s=40"}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
            />
            <button
              className="ml-4 flex items-center bg-white hover:bg-gray-200 text-blue-700 font-bold py-2 px-4 rounded transition duration-300"
              onClick={() => signOut()}
            >
              Logout
              <FaSignOutAlt className="h-4 w-3 text-blue-700 ml-1" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Your todos</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => setOpen(true)} // Open modal on button click
          >
            Add todo
          </button>
        </div>
        <p className="mt-2 text-gray-600">Manage your tasks efficiently and stay organized.</p>
      </div>

      {/* Todo List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {todos.length === 0 ? (
          <p className="text-gray-600">No todos available. Add some! 😢</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="flex justify-between items-center border-b py-2">
              <div>
                <h2 className="font-semibold">{todo.title}</h2>
                <p className="text-gray-500">{todo.description}</p>
                <p className="text-gray-400 text-sm">
                  Created at: {todo.createdAt.toLocaleString()} | Updated at: {todo.updatedAt.toLocaleString()}
                </p>
              </div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="ml-2">
                  <FaEllipsisV className="h-5 w-5 text-gray-500" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="bg-white shadow-md rounded-md p-2">
                  <DropdownMenu.Item
                    className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          ))
        )}
      </div>

      {/* Modal for Adding Todos */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="hidden">Open Modal</button>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-96 p-6 bg-white rounded-lg transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
          <Dialog.Title className="text-lg font-bold">Add Todo</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            Fill in the details below to add a new todo.
          </Dialog.Description>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Todo title"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Todo description"
              rows={3}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              onClick={handleAddTodo}
            >
              Add Todo
            </button>
            <Dialog.Close asChild>
              <button className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300">
                Cancel
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
