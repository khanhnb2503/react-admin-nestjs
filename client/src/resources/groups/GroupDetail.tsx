import { useParams } from "react-router-dom";
import { useDataProvider } from "react-admin";
import { useState, useEffect } from "react";

export const GroupDetail = () => {
	const [group, setGroup] = useState();
	const { id } = useParams();
	const dataProvider = useDataProvider();

	useEffect(() => {
		(async () => {
			const { data } = await dataProvider.getOne('groups', { id: id});
			setGroup(data);
		})()
	}, []);

	return (
		<>
			{group && (
				<div>
					<h3>{group.name}</h3>
					<ul>
						{group?.roles.map((role) => (
							<li>{role.}</li>
						))}
					</ul>
				</div>
			)}
		</>
	)
}