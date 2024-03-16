import logoLight from "../../assets/logo-light.svg";
import logoDark from "../../assets/logo-dark.svg";
import { useLocation } from "react-router-dom"
import { convertToTitleCase } from "../../helpers";
import { useState } from "react";
import { AddTask } from "../addTask";
import ellipse from "../../assets/icon-vertical-ellipsis.svg";
import { DeleteBoard } from "../deleteBoard";

export const Navbar = ({color}) => {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [del, setDel] = useState(false);

    return (
        <div className="flex justify-between items-center bg-aside h-[97px] z-50 w-full">
        <AddTask show={show} setShow={setShow} />
        <DeleteBoard show={del} setShow={setDel} />
        <div className="flex justify-center items-center">
        {!color ?
				<img
					src={logoLight}
					alt="logo"
					className="object-contain w-[152px] h-[25px] m-[32px]"
				/>:<img
					src={logoDark}
					alt="logo"
					className="object-contain w-[152px] h-[25px] m-[32px]"
				/>}
                <p className="text-primary text-[20px] font-[600] ml-[100px]">{convertToTitleCase(location?.pathname)}</p>
        </div>
            
            <div className="flex justify-end items-center bg-tile pr-10 gap-5 relative">
                <button 
                onClick={() => setShow(true)}
                className="rounded-full text-first w-[164px] h-[48px] bg-tab">
                    + Add New Task
                </button>
                <button onClick={() => setOpen(!open)}>
                    <img
                        src={ellipse}
                        alt="logo"
                        className="object-contain w-[5px] h-[20px]"
                    />
                </button>
                {open && <div className="absolute top-16 bg-aside w-[192px] h-[94px] shadow-lg rounded-[8px] flex flex-col justify-between p-[16px]">
                    <button 
                    onClick={() => {}}
                    className="text-second text-start">Edit Board</button>
                    <button 
                    onClick={() => {setDel(true); setOpen(false)}}
                    className="text-delete text-start">Delete Board</button>
                </div>}
            </div>
        </div>
    )
}