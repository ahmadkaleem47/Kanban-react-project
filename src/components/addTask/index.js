import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import iconCross from "../../assets/icon-cross.svg";
import { useSelector, useDispatch } from "react-redux";
import { convertToTitleCase } from "../../helpers";
import { useLocation } from "react-router-dom";
import { setSubtasks } from "../../redux/bodySlice.ts";

export const AddTask = ({ show, setShow }) => {
	const { data } = useSelector((store) => store.body);
	const location = useLocation();
    const dispatch = useDispatch();
	const status = data?.boards
		?.filter((board) => {
			return convertToTitleCase(location?.pathname) === board?.name;
		})?.[0]
		?.columns?.map((stat) => {
			return stat?.name;
		});

    const [collect, setCollect] = useState({subtasks: [{}, {}], status: !!status ? status[0]: null});

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setSubtasks({title: convertToTitleCase(location?.pathname), data: collect}))
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
												Title
											</label>
											<input
												onChange={(e) =>
													setCollect({ ...collect, title: e.target.value })
												}
                                                required
												className="bg-transparent border border-[#828FA3] rounded-[4px] h-[40px] w-full flex px-3 text-primary items-center"
											/>
										</div>
										<div className="flex flex-col gap-2">
											<label className="text-modal font-bold text-[12px]">
												Description
											</label>
											<textarea
												onChange={(e) =>
													setCollect({
														...collect,
														description: e.target.value,
													})
												}
                                                required
												className=" bg-transparent border border-[#828FA3] rounded-[4px] resize-none p-3 text-primary w-full h-[112px]"
											/>
										</div>
										<div className="flex flex-col gap-2">
											<label className="text-modal font-bold text-[12px]">
												Subtasks
											</label>
											{collect?.subtasks?.map((sub, index) => {
												return (
													<div className="flex justify-start items-center gap-4">
														{" "}
														<input
															onChange={(e) => setCollect({...collect, subtasks: collect?.subtasks?.map((s, i) => {
                                                                return index === i ? {isCompleted: false, title: e.target.value} : s;
                                                            })})}
                                                            required
															className="bg-transparent border border-[#828FA3] px-3 text-primary rounded-[4px] w-full h-[40px]"
														/>
                                                        <button
                                                            type="button"
                                                            onClick={() => setCollect({...collect, subtasks: collect?.subtasks?.filter((val, ind) => {
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
                                        onClick={() => setCollect({...collect, subtasks: [...collect?.subtasks, {}]})}
                                        className="bg-modal-button w-full h-[40px] rounded-[20px] text-new text-[14px] font-[700]">
											+ Add New SubTask
										</button>
										<div className="flex flex-col gap-2">
											<label className="text-modal font-bold text-[12px]">
												Status
											</label>
											<select
												onChange={(e) =>
													setCollect({ ...collect, status: e.target.value })
												}
                                                required
												className="bg-transparent px-3 text-primary border border-[#828FA3] rounded-[4px] h-[40px] w-full"
											>
												{status?.map((st) => {
													return <option className="bg-aside px-3 text-primary border border-[#828FA3] h-[40px] w-full" value={st}>{st}</option>;
												})}
											</select>
										</div>
										<button 
                                        type="submit"
                                        className="bg-tab w-full h-[40px] rounded-[20px] text-white text-[14px] font-[700]">
											+ Create Task
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
