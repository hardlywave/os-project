"use client";

import { useEffect, useState } from "react";

type Task = {
    id: number | string;
    description?: string;
    done?: string;
};

export default function Home() {
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_BASE =
        "http://osserver-env.eba-9drmkdum.us-east-1.elasticbeanstalk.com";

    async function fetchTask(): Promise<void> {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/api/tasks`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = (await res.json()) as Array<{ id: number; task: string; done: boolean }>;
            const first = data[0];
            if (!first) {
                setTask(null);
            } else {
                setTask({
                    id: first.id,
                    description: first.task,
                    done: first.done ? "yes" : "no",
                });
            }
        } catch (err) {
            setError(String(err));
            setTask(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void fetchTask();
    }, []);

    function handleClick() {
        alert("Dont do it again!");
    }

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gray-900 text-white">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-3xl">
                <ol className="font-mono list-inside list-decimal text-lg/6 text-center sm:text-left">
                    <h1 className="mb-2 tracking-[-.01em] text-white">Lets start!</h1>
                </ol>

                <button
                    onClick={handleClick}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow"
                >
                    Press me!
                </button>

                <div className="w-full">
                    <div className="mb-2 text-sm text-gray-300">Task window</div>

                    <div className="bg-gray-800 border border-gray-700 rounded p-4 shadow-sm min-h-[120px]">
                        {loading && <div className="text-gray-300">Loading…</div>}

                        {error && <div className="text-red-400">Error: {error}</div>}

                        {!loading && !error && !task && (
                            <div className="text-gray-400">No task loaded.</div>
                        )}

                        {!loading && task && (
                            <table className="table-auto w-full border-collapse text-white">
                                <thead>
                                <tr className="bg-gray-700">
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-left">Done</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="even:bg-gray-800 odd:bg-gray-700">
                                    <td className="border-t border-gray-600 px-4 py-2 align-top">{task.id}</td>
                                    <td className="border-t border-gray-600 px-4 py-2 align-top">{task.description}</td>
                                    <td className="border-t border-gray-600 px-4 py-2 align-top">{task.done ?? "no"}</td>
                                </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
