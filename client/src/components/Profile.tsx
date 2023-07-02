import { useGetOne, useRecordContext } from 'react-admin';

interface IUser {
	username: string;
	email: string;
	id: string;
}

const Profile = () => {
	return (
		<div>
			<h3>Info:</h3>
		</div>
	)
};

export default Profile;