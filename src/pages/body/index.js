import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { convertToTitleCase } from "../../helpers";

export const Body = () => {
	const { data } = useSelector((store) => store.body);
	const location = useLocation();

	const showData = data?.boards?.filter((board) => {
		if (convertToTitleCase(location?.pathname) === board?.name) {
			return true;
		} else {
			return false;
		}
	})?.[0]?.columns;
	const color = ["bg-[#49C4E5]", "bg-[#8471F2]", "bg-[#67E2AE]"];

	return (
		<div
			className={`bg-body w-full h-[calc(100vh-97px)] ${
				!!showData ? "overflow-auto" : "overflow-hidden"
			} z-0`}
		>
			{!!showData ? (
				<div className="flex justify-start items-start p-[40px] gap-[40px] w-[calc(100vw-190px)] ">
					{showData?.map((list, index) => {
						return (
							<div
								key={index}
								className="flex flex-col items-start gap-5 w-[280px]"
							>
								<div className="flex justify-center items-center tracking-[0.12em] h-[15px] gap-3">
									<div
										className={`w-[15px] h-[15px] rounded-full ${
											color[index % 3]
										}`}
									/>
									<p className="uppercase text-second">
										{list?.name} ({list?.tasks?.length})
									</p>
								</div>
								{list?.tasks?.map((task, ind) => {
									let complete = task?.subtasks?.filter((sub) => {
										return sub?.isCompleted;
									})?.length;
									return (
										<div
											key={ind}
											className="w-[280px] bg-aside px-[16px] py-[18px] rounded-[8px] flex flex-col gap-1 shadow-xl"
										>
											<p className="text-[16px] font-[500] text-primary">
												{task?.title}
											</p>
											<p className="text-[12px] font-[500] text-second">
												{complete} of {list?.tasks[ind]?.subtasks?.length} subtasks
											</p>
										</div>
									);
								})}
							</div>
						);
					})}
					<button className="flex flex-col justify-center items-center w-[280px] bg-dark h-[calc(100vh-200px)] shadow-md mt-9">
						<p className="text-second text-[24px] font-[600]">+ New Column</p>
					</button>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center gap-7 h-full">
					<p className="text-center text-second">
						This board is empty. Create a new column to get started.
					</p>
					<button className="rounded-full text-first w-[164px] h-[48px] bg-tab hover:opacity-30">
						+ Add New Column
					</button>
				</div>
			)}
		</div>
	);
};
