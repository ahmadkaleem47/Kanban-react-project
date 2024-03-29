import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import iconCross from "../../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { setEditBoard, setNewBoard } from "../../redux/bodySlice.ts";
import { capitalizeWords, convertToTitleCase } from "../../helpers/index.js";
import { useLocation } from "react-router-dom";

export const AddEditBoard = ({ show, setShow, edit }) => {
    const dispatch = useDispatch();
    const {data} = useSelector((store) => store.body);
    const location = useLocation();
    const [collect, setCollect] = useState({});

    useEffect(() => {
        let showData = {columns: [{}, {}]};
        if (edit) {
            showData = data?.boards?.filter((board) => {
                return board?.name === convertToTitleCase(location?.pathname);
            })?.[0];
        }
        setCollect(showData)
    }, [data?.boards, edit, location?.pathname])

    const handleSubmit = (e) => {
        e.preventDefault();
		if (edit) {
			dispatch(setEditBoard(collect))
		} else {
			dispatch(setNewBoard(collect))
		}
        setShow(false);
    }

	return (
		<>
			<Transition className="z-50" appear show={show} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setShow(false)}
				>
					<div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50">
						<div className="flex min-h-full items-center justify-center text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="object-contain transform overflow-hidden rounded-2xl bg-aside text-left shadow-xl transition-all">
									<form 
                                    onSubmit={handleSubmit}
                                    className="flex flex-col justify-start gap-[20px] w-[416px] p-[24px]">
										<h1 className="text-primary text-[18px] font-[700]">
											{edit ? "Edit Board": "Add New Board"}
										</h1>
										<div className="flex flex-col gap-2">
											<label className="text-modal font-bold text-[12px]">
												Board Name
											</label>
											<input
												onChange={(e) =>
													setCollect({ ...collect, name: capitalizeWords(e.target.value) })
												}
                                                value={collect?.name || ''}
												readOnly={edit}
                                                required
												className="bg-transparent border border-[#828FA3] rounded-[4px] h-[40px] w-full flex px-3 text-primary items-center"
											/>
										</div>
										<div className="flex flex-col gap-2">
											<label className="text-modal font-bold text-[12px]">
												Board Columns
											</label>
											{collect?.columns?.map((sub, index) => {
												return (
													<div className="flex justify-start items-center gap-4">
														{" "}
														<input
															onChange={(e) => setCollect({...collect, columns: collect?.columns?.map((s, i) => {
                                                                return index === i ? {tasks: [...s.tasks || ''], name: e.target.value} : s;
                                                            })})}
                                                            required
                                                            value={collect?.columns[index]?.name}
															className="bg-transparent border border-[#828FA3] px-3 text-primary rounded-[4px] w-full h-[40px]"
														/>
                                                        <button
                                                            type="button"
                                                            onClick={() => setCollect({...collect, columns: collect?.columns?.filter((val, ind) => {
                                                                return ind !== index
                                                            })})}>
														<img
															src={iconCross}
															alt="logo"
															className="object-contain w-[15px] h-[15px]"
														/>
                                                        </button>
													</div>
												);
											})}
										</div>
										<button 
										type="button"
                                        onClick={() => {setCollect({...collect, columns: [...collect?.columns, {}]})}}
                                        className="bg-modal-button w-full h-[40px] rounded-[20px] text-new text-[14px] font-[700]">
											+ Add New Column
										</button>
										<button 
                                        type="submit"
                                        className="bg-tab w-full h-[40px] rounded-[20px] text-white text-[14px] font-[700]">
											{edit ? "+ Save Changes": "+ Create New Board"}
										</button>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
