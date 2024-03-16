import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import iconCross from "../../assets/icon-cross.svg";
import { useDispatch } from "react-redux";
import { setNewBoard } from "../../redux/bodySlice.ts";
import { capitalizeWords } from "../../helpers/index.js";

export const AddBoard = ({ show, setShow }) => {
    const dispatch = useDispatch();

    const [collect, setCollect] = useState({columns: [{}, {}]});

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setNewBoard(collect))
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
											Add New Task
										</h1>
										<div className="flex flex-col gap-2">
											<label className="text-modal font-bold text-[12px]">
												Board Name
											</label>
											<input
												onChange={(e) =>
													setCollect({ ...collect, name: capitalizeWords(e.target.value) })
												}
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
                                                                return index === i ? {tasks: [], name: e.target.value} : s;
                                                            })})}
                                                            required
															className="bg-transparent border border-[#828FA3] px-3 text-primary rounded-[4px] w-full h-[40px]"
														/>
                                                        <button
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
                                        onClick={() => setCollect({...collect, columns: [...collect?.columns, {}]})}
                                        className="bg-modal-button w-full h-[40px] rounded-[20px] text-new text-[14px] font-[700]">
											+ Add New Column
										</button>
										<button 
                                        type="submit"
                                        className="bg-tab w-full h-[40px] rounded-[20px] text-white text-[14px] font-[700]">
											+ Create New Board
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
