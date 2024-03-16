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
        setNewBoard: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = {boards: [...state.data?.boards, payload]}
        },
        setDeleteBoard: (state: BodyState, {payload}: PayloadAction<any>) => {
            state.data = {boards: state.data?.boards?.filter((board) => {
                return board?.name !== payload;
            })}
        },
    }
})

export const {setData, setSubtasks, setNewBoard, setDeleteBoard} = bodySlice.actions;
export default bodySlice.reducer;