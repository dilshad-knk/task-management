import { atom } from "recoil";
import { Task } from "./components/PersonalBoard";


export const tasksState= atom<{[key : string]:Task[]}>({
    key : 'tasksState',
    default: {
        todo: [],
        under_review: [],
        in_progress: [],
        finished: []
      }
});