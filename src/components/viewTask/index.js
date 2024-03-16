import { Dialog, Transition } from "@headlessui/react";
import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsCompleted, setStatusChange } from "../../redux/bodySlice.ts";
import { convertToTitleCase } from "../../helpers/index.js";
import { useLocation } from "react-router-dom/dist/index";
import { useSelector } from "react-redux";

export const ViewTask = forwardRef((props, ref) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { data } = useSelector((store) => store?.body);
	const [display, setDisplay] = useState();
	const [show, setShow] = useState(false);

	const status = data?.boards
		?.filter((board) => {
			return convertToTitleCase(location?.pathname) === board?.name;
		})?.[0]
		?.columns?.map((stat) => {
			return stat?.name;
		});

	useImperativeHandle(ref, () => ({
		open(dat) {
			setShow(true);
			setDisplay(dat);
		},
	}));

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
									<div className="flex flex-col justify-start gap-[20px] w-[480px] p-[24px]">
										<h1 className="text-primary text-[18px] font-[700]">
											{display?.title}
										</h1>
										<div className="text-modal font-[400] text-[14px]">
											{display?.description}
										</div>
										<div className="flex flex-col gap-2">
											<label className="text-modal font-bold text-[12px]">
												Subtasks (0 of {display?.subtasks?.length})
											</label>
											{display?.subtasks?.map((sub, index) => {
												return (
													<div className="flex justify-start items-center gap-4 w-full h-[40px] bg-body p-[12px]">
														<div class="flex items-center">
															<input
																checked={sub?.isCompleted}
																id="checked-checkbox"
																type="checkbox"
																onClick={(e) => {
																	setDisplay({
																		...display,
																		subtasks: display?.subtasks?.map((s, i) => {
																			return index === i
																				? { ...s, isCompleted: !s?.isCompleted }
																				: s;
																		}),
																	});
																	dispatch(
																		setIsCompleted({
																			title: convertToTitleCase(
																				location?.pathname
																			),
																			data: {
																				...display,
																				subtasks: display?.subtasks?.map(
																					(s, i) => {
																						return index === i
																							? {
																									...s,
																									isCompleted: !s?.isCompleted,
																							  }
																							: s;
																					}
																				),
																			},
																		})
																	);
																}}
																className="w-4 h-4 bg-tab rounded focus:ring-2"
															/>
														</div>
														<div
															className={`text-[12px] font-[700] ${
																sub?.isCompleted
																	? "line-through text-second"
																	: "text-primary"
															}`}
														>
															{sub?.title}
														</div>
													</div>
												);
											})}
										</div>
										<div className="flex flex-col gap-2">
											<label className="text-modal font-bold text-[12px]">
												Status
											</label>
											<select
												value={display?.status || ""}
												onChange={(e) => {
													setDisplay({ ...display, status: e.target.value });
													dispatch(setStatusChange({
														data: { ...display, status: e.target.value },
														title: convertToTitleCase(location?.pathname),
														old: display?.status === '' ? status[0]:display?.status,
													}));
												}}
												className="bg-transparent px-3 text-primary border border-[#828FA3] rounded-[4px] h-[40px] w-full"
											>
												{status?.map((st) => {
													return (
														<option
															className="bg-aside px-3 text-primary border border-[#828FA3] h-[40px] w-full"
															value={st}
														>
															{st}
														</option>
													);
												})}
											</select>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
});
