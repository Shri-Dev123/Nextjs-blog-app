import Layout from '../components/Layout';
import { useUser } from '../lib/auth';
import { getUserById } from '../lib/database';

export default function Profile() {
  const user = useUser();

  // Fetch the user's data from the database using their ID
  const userData = getUserById(user.id);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {userData ? (
          <div className="bg-white p-4 rounded shadow">
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {userData.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Role:</span> {userData.role}
            </p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </Layout>
  );
}
