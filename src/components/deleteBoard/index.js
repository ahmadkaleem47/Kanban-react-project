import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setDeleteBoard } from "../../redux/bodySlice.ts";
import { convertToTitleCase } from "../../helpers";

export const DeleteBoard = ({ show, setShow }) => {
	const dispatch = useDispatch();
	const location = useLocation();

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
										<h1 className="text-delete text-[18px] font-[700]">
											Delete This Board?
										</h1>
										<div className="text-modal font-[200] text-[14px]">
											Are you sure you want to delete the {convertToTitleCase(location?.pathname)} board?
											This action will remove all columns and tasks and cannot
											be reversed.
										</div>
										<div className="flex justify-center items-center gap-10">
											<button
												onClick={() => {
													dispatch(
														setDeleteBoard(
															convertToTitleCase(location?.pathname)
														)
													);
													setShow(false);
												}}
												className="bg-delete w-full h-[40px] rounded-[20px] text-white text-[14px] font-[700]"
											>
												Delete
											</button>
											<button
												onClick={() => setShow(false)}
												className="bg-cancel bg-opacity-10 w-full h-[40px] rounded-[20px] text-new text-[14px] font-[700]"
											>
												Cancel
											</button>
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
};
