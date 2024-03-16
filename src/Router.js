import { Routes, Route } from "react-router-dom";
import { Aside } from "./components/aside";
import { Navbar } from "./components/navbar";
import { Body } from "./pages/body";
import { useEffect, useState } from "react";
import { setTheme } from "./helpers";

export const Router = () => {
	const [visible, setVisible] = useState(true);
	const [color, setColor] = useState(true);

	const routes = [
		{ path: "/:type?", element: <Body /> },
		{ path: "/courses/view-all", element: <></> },
	];

	useEffect(() => setTheme(true), [])

	return (
		<>
            <Aside setVisible={setVisible} visible={visible} setColor={setColor} />
			<Navbar color={color} />
			<div className={`${visible ? "ml-[300px]": ""} z-40 h-full transition-all duration-500 ease-in-out`}>
			<Routes>
				{routes.map((route, index) => {
					return (
						<Route key={index} path={route?.path} element={route?.element} />
					);
				})}
			</Routes>
			</div>
		</>
	);
};
