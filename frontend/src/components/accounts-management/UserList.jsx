import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import { jsPDF } from 'jspdf'; 
import 'jspdf-autotable'; 
import Navbar from '../global-components/adminNavBar';
import UserAccountAnalytics from './UserAccountAnalytics';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8070/api/user');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on the search term (starting with the search term)
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    const generateReport = () => {
        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(18);
        doc.text('User List Report', 20, 20);

        // User Details Table
        doc.autoTable({
            startY: 30,
            head: [['Username', 'Email', 'Update History']],
            body: filteredUsers.map(user => [
                user.username,
                user.email,
                user.updateHistory && user.updateHistory.length > 0 
                    ? user.updateHistory.map(update => {
                        let updateText = `Field: ${update.field}\n`;
                        if (update.field === 'avatar') {
                            updateText += `Previous Avatar: Added\nNew Avatar: Updated\n`;
                        } else {
                            updateText += `Previous Value: ${update.previousValue}\nNew Value: ${update.newValue}\n`;
                        }
                        updateText += `Updated At: ${new Date(update.updatedAt).toLocaleString()}`;
                        return updateText; 
                    }).join('\n\n') 
                    : 'No updates'
            ]),
            styles: {
                cellPadding: 3,
                fontSize: 10,
                overflow: 'linebreak',  
            },
        });

        doc.save('user_list_report.pdf');
    };

    if (loading) {
        return <p className="text-center text-blue-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div>
            <Navbar/>
            
        
        <div className="container mx-auto py-8 px-4 bg-gradient-to-r from-blue-50  min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6 ">User List</h1>

            {/* Search Input */}
            <div className="mb-6 relative max-w-xs mx-auto">
                <input
                    type="text"
                    placeholder="Search by username..."
                    className="border border-indigo-300 rounded-lg p-2 pl-10 pr-4 w-full text-indigo-800 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-2.5 h-5 w-5 text-indigo-400" />
            </div>

            {filteredUsers.length === 0 ? (
                <p className="text-center text-gray-600">No users found.</p>
            ) : (
                <div className="w-full max-w-4xl mx-auto overflow-x-auto shadow-lg bg-white rounded-lg">
                    <table className="table-auto w-full border border-gray-300 rounded-lg">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="py-3 px-4 border-b text-left">Username</th>
                                <th className="py-3 px-4 border-b text-left">Email</th>
                                <th className="py-3 px-4 border-b text-left">Update History</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-indigo-50">
                                    <td className="py-2 px-4 border-b text-indigo-800">{user.username}</td>
                                    <td className="py-2 px-4 border-b text-indigo-800">{user.email}</td>
                                    <td className="py-2 px-4 border-b text-indigo-800">
                                        {user.updateHistory && user.updateHistory.length > 0 ? (
                                            <ul className="list-disc list-inside text-sm text-gray-600">
                                                {user.updateHistory.map((update, index) => (
                                                    <li key={index} className="mt-2">
                                                        <strong>Field:</strong> {update.field} <br />
                                                        {update.field === 'avatar' ? (
                                                            <>
                                                                <strong>Previous Avatar:</strong> Added <br />
                                                                <strong>New Avatar:</strong> Updated <br />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <strong>Previous Value:</strong> {update.previousValue} <br />
                                                                <strong>New Value:</strong> {update.newValue} <br />
                                                            </>
                                                        )}
                                                        <strong>Updated At:</strong> {new Date(update.updatedAt).toLocaleString()}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500">No updates</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Button to Generate PDF Report */}
            <div className="text-center mt-8">
                <button 
                    onClick={generateReport} 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 mt-5"

                >
                    Download User List as PDF
                </button>
            </div>
        </div>
        <UserAccountAnalytics/>
        </div>
    );
};

export default UserList;
