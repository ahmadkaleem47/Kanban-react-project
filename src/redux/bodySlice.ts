import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jsonData from "../json/data.json"

interface BodyState {
    data: any;
}

const initialState: BodyState = {
    data: jsonData,
}

const bodySlice = createSlice({
    name: 'body',
    initialState,
    reducers: {
        setData: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = payload;
        },
        setSubtasks: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = {boards:state.data?.boards?.map((board) => {
                return payload?.title === board?.name ? {...board, columns: board?.columns?.map((col) => {
                    return col?.name === payload?.data?.status ? {...col, tasks: [...col?.tasks, payload?.data]} : col;
                })} :board;
            })}
        },
        setEditSubtasks: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = {boards:state.data?.boards?.map((board) => {
                return payload?.title === board?.name ? {...board, columns: board?.columns?.map((col) => {
                    return col?.name === payload?.data?.status ? {...col, tasks: col?.tasks?.map((task) => {
                        return task?.title === payload?.data?.title ? payload?.data : task;
                    })} : col;
                })} :board;
            })}
        },
        setNewBoard: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = {boards: [...state.data?.boards, payload]}
        },
        setEditBoard: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = {boards: state.data?.boards?.map((board) => {
                return board?.name === payload?.name ? payload : board;
            })}
        },
        setDeleteBoard: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = {boards: state.data?.boards?.filter((board) => {
                return board?.name !== payload;
            })}
        },
        setIsCompleted: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = {boards:state.data?.boards?.map((board) => {
                return payload?.title === board?.name ? {...board, columns: board?.columns?.map((col) => {
                    return col?.name === payload?.data?.status ? {...col, tasks: col?.tasks?.map((task) => {
                        return task?.title === payload?.data?.title ? payload?.data :task
                    })} : col;
                })} :board;
            })}
        },
        setStatusChange: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = {boards:state.data?.boards?.map((board) => {
                return payload?.title === board?.name ? {...board, columns: board?.columns?.map((col) => {
                    return col?.name?.toLowerCase() === payload?.old?.toLowerCase() ? {...col, tasks: col?.tasks?.filter((task) => {
                        return task?.title !== payload?.data?.title;
                    })} : col?.name === payload?.data?.status ? {...col, tasks: [...col?.tasks , payload?.data]} : col
                })} :board;
            })}
        },
        setDeleteTask: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = {boards:state.data?.boards?.map((board) => {
                return payload?.title === board?.name ? {...board, columns: board?.columns?.map((col) => {
                    return col?.name === payload?.data?.status ? {...col, tasks: col?.tasks?.filter((task) => {
                        return task?.title !== payload?.data?.title
                    })} : col;
                })} :board;
            })}
        },
    }
})

export const {setData, setSubtasks, setEditSubtasks, setNewBoard, setDeleteBoard, setEditBoard, setIsCompleted, setStatusChange, setDeleteTask} = bodySlice.actions;
export default bodySlice.reducer;