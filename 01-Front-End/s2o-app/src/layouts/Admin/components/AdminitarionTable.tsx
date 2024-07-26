import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminitrationModal from '../../../Model/AdminitrationModal';
import './AdministrationTable.css'; // Import custom CSS

export const AdministrationTable: React.FC = () => {
    const [administrations, setAdministrations] = useState<AdminitrationModal[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const history = useHistory();

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchAdministration = async () => {
            setIsLoading(true);
            setHttpError(null);
            const baseUrl: string = `http://localhost:8080/api/administrations/all`;

            try {
                const response = await fetch(baseUrl);

                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }

                const responseJson = await response.json();

                const loadedAdministration: AdminitrationModal[] = responseJson.map((administration: any) => ({
                    adminId: administration.adminId,
                    designation: administration.designation,
                    adminName: administration.adminName,
                    adminQualification: administration.adminQualification,
                    insta: administration.insta,
                    LinkedIn: administration.linkedIn,
                    email: administration.email,
                    year: administration.year,
                    adminImg: administration.adminImg
                }));

                setAdministrations(loadedAdministration);
            } catch (error: any) {
                console.error('Fetch error:', error);
                setHttpError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdministration();
    }, []);

    const deleteAdminMember = async (id: number) => {
        const url = `http://localhost:8080/api/administrations/delete/admin-member/${id}`;

        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete admin member');
            }
            setAdministrations(administrations.filter(admin => admin.adminId !== id));
        } catch (error) {
            console.error('Error deleting admin member:', error);
            alert('Failed to delete admin member');
        }
    };

    const handleEdit = (id: number) => {
        history.push(`/edit-admin/${id}`);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return administrations.slice(startIndex, startIndex + itemsPerPage);
    };

    const renderPagination = () => {
        const pageCount = Math.ceil(administrations.length / itemsPerPage);
        const pages = [];

        for (let i = 1; i <= pageCount; i++) {
            pages.push(
                <button
                    key={i}
                    className={`btn ${i === currentPage ? 'btn-primary' : 'btn-light'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="container mt-5 mb-5">
            <h2>Administration Members</h2>
            {isLoading && <p>Loading...</p>}
            {httpError && <p>{httpError}</p>}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Designation</th>
                            <th>Name</th>
                            <th>Qualification</th>
                            <th>Instagram</th>
                            <th>LinkedIn</th>
                            <th>Email</th>
                            <th>Year</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && getPageData().map(admin => (
                            <tr key={admin.adminId}>
                                <td>{admin.adminId}</td>
                                <td>{admin.designation}</td>
                                <td>{admin.adminName}</td>
                                <td>{admin.adminQualification}</td>
                                <td>{admin.insta}</td>
                                <td>{admin.LinkedIn}</td>
                                <td>{admin.email}</td>
                                <td>{admin.year.yearValue}</td>
                                <td><img src={admin.adminImg} alt={admin.adminName} className="img-thumbnail" /></td>
                                <td>
                                    <button className="btn btn-primary mr-2" onClick={() => handleEdit(admin.adminId)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteAdminMember(admin.adminId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-buttons">
                {renderPagination()}
            </div>
        </div>
    );
};

// Add this line to make it a module
export {};
