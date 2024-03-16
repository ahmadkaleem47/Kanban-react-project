import iconBoard from "../../assets/icon-board.svg";
import darkTheme from "../../assets/icon-dark-theme.svg";
import lightTheme from "../../assets/icon-light-theme.svg";
import hide from "../../assets/icon-hide-sidebar.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { setTheme, convertToSlug } from "../../helpers";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AddBoard } from "../addBoard";

export const Aside = ({ setVisible, visible, setColor }) => {
	const location = useLocation();
	const { data } = useSelector((store) => store.body);
	const [show, setShow] = useState(false);
	const number = data?.boards?.length;

	return (
		<div>
			<AddBoard show={show} setShow={setShow} />
			<aside
				id="sidebar-multi-level-sidebar"
				className={`${
					visible ? "" : "-ml-[300px]"
				} fixed top-[97px] z-10 w-[300px] h-full transition-all duration-500 ease-in-out bg-aside`}
				aria-label="Sidebar"
			>
				<div className="flex flex-col justify-between h-full pb-[130px]">
					<div className="flex flex-col justify-center">
						<div className="text-second mx-[32px] mb-[32px] uppercase tracking-[0.12em] h-[15px]">
							All boards ({number})
						</div>
						{data?.boards?.map((board) => {
							return (
								<Link
									to={convertToSlug(board?.name)}
									className={`${
										convertToSlug(board?.name) === location.pathname
											? "text-first bg-tab"
											: "text-second bg-hover text-hover transition duration-500 ease-in-out"
									} w-[276px] h-[48px] px-[32px] flex justify-start items-center gap-[12px] rounded-full rounded-tl-none rounded-bl-none`}
								>
									<img
										src={iconBoard}
										alt="cross"
										className="object-contain w-[16px] h-[16px]"
									/>
									{board?.name}
								</Link>
							);
						})}
						<button
							onClick={() => setShow(true)}
							className={`text-second w-[276px] h-[48px] px-[32px] flex justify-start items-center gap-[12px]`}
						>
							<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
									fill={"var(--bg-tab)"}
								/>
							</svg>
							<p className="text-new">+Create New Board</p>
						</button>
					</div>
					<div className="flex flex-col mx-[24px] items-start gap-7">
						<div className="flex justify-center items-center bg-body w-[251px] h-[48px] gap-5 rounded-[6px]">
							<img
								src={lightTheme}
								alt="light"
								className="object-contain w-[18px] h-[18px]"
							/>
							<label className="inline-flex items-center cursor-pointer">
								<input
									onClick={(e) => {
										setColor(!e.target.checked);
										setTheme(!e.target.checked);
									}}
									type="checkbox"
									className="sr-only peer"
								/>
								<div class="relative w-11 h-6 bg-tab peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-tab"></div>
							</label>

							<img
								src={darkTheme}
								alt="dark"
								className="object-contain w-[18px] h-[18px]"
							/>
						</div>
						<button
							onClick={() => setVisible(false)}
							className="flex justify-center items-center gap-5 text-second"
						>
							<img
								src={hide}
								alt="hide"
								className="object-contain w-[18px] h-[16px]"
							/>
							Hide Sidebar
						</button>
					</div>
				</div>
			</aside>
			<div className="absolute bottom-10">
				<button
					onClick={() => setVisible(true)}
					className={`text-first bg-tab w-[56px] h-[48px] pl-[16px] rounded-full rounded-tl-none rounded-bl-none hover:opacity-50`}
				>
					<img
						src={show}
						alt="cross"
						className="object-contain w-[16px] h-[10px]"
					/>
					{}
				</button>
			</div>
		</div>
	);
};
