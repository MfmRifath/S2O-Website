import React, { useState, useEffect } from 'react';
import YearModal from '../../../Model/YearModal';

export const AddEditAdministration: React.FC = () => {
    const [designation, setDesignation] = useState('');
    const [adminName, setAdminName] = useState('');
    const [adminQualification, setAdminQualification] = useState('');
    const [insta, setInsta] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState<YearModal | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
    const [years, setYears] = useState<YearModal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [adminId, setAdminId] = useState<number | null>(null);

    const base64ConversionForImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            getBase64(file);
        }
    };

    const getBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedImage(reader.result);
        };
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
        };
    };

    const submitAdminMember = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = adminId
            ? `http://localhost:8080/api/administrations/edit/admin-member/${adminId}`
            : `http://localhost:8080/api/administrations/add/admin-member`;

        if (designation && adminName && adminQualification && insta && linkedIn && email && year && selectedImage) {
            const admin = {
                designation,
                adminName,
                adminQualification,
                insta,
                linkedIn,
                email,
                year,
                adminImg: selectedImage
            };

            const requestOptions: RequestInit = {
                method: adminId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(admin)
            };

            try {
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to add/update admin member');
                }
                setDesignation('');
                setAdminName('');
                setAdminQualification('');
                setInsta('');
                setLinkedIn('');
                setEmail('');
                setYear(null);
                setSelectedImage(null);
                setAdminId(null);
                setDisplayWarning(false);
                setDisplaySuccess(true);
            } catch (error) {
                console.error('Error submitting admin member:', error);
                setDisplaySuccess(false);
                setDisplayWarning(true);
            }
        } else {
            setDisplayWarning(true);
        }
    };

    const deleteAdminMember = async (id: number) => {
        const url = `http://localhost:8080/api/administrations/delete/admin-member/${id}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete admin member');
            }
            setDisplaySuccess(true);
        } catch (error) {
            console.error('Error deleting admin member:', error);
            setDisplaySuccess(false);
        }
    };

    useEffect(() => {
        const fetchYears = async () => {
            setIsLoading(true);
            setHttpError(null);

            const baseUrl: string = `http://localhost:8080/api/years`;

            try {
                const response = await fetch(baseUrl);

                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }

                const responseJson = await response.json();

                const loadedYears: YearModal[] = responseJson.map((year: any) => ({
                    yearId: year.yearId,
                    yearValue: year.yearValue
                }));

                setYears(loadedYears);
            } catch (error: any) {
                console.error('Fetch error:', error);
                setHttpError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchYears();
    }, []);

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = e.target.value;
        const selectedYearObj = years.find(year => year.yearValue.toString() === selectedYear) || null;
        setYear(selectedYearObj);
    };

    return (
        <div className="container mt-5 mb-5">
            {displaySuccess &&
                <div className="alert alert-success" role="alert">
                    Admin added/updated successfully.
                </div>
            }
            {displayWarning &&
                <div className="alert alert-danger" role="alert">
                    All fields must be filled out.
                </div>
            }
            <div className="card">
                <div className="card-header">
                    {adminId ? 'Edit Administration Member' : 'Add Administration Member'}
                </div>
                <div className="card-body">
                    <form onSubmit={submitAdminMember}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Designation</label>
                                <input type="text" className="form-control" name="Designation" required
                                    onChange={e => setDesignation(e.target.value)} value={designation} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" name="Name" required
                                    onChange={e => setAdminName(e.target.value)} value={adminName} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Qualification</label>
                                <input type="text" className="form-control" name="Qualification" required
                                    onChange={e => setAdminQualification(e.target.value)} value={adminQualification} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Instagram Link</label>
                                <input type="text" className="form-control" name="Insta" required
                                    onChange={e => setInsta(e.target.value)} value={insta} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">LinkedIn Link</label>
                                <input type="text" className="form-control" name="LinkedIn" required
                                    onChange={e => setLinkedIn(e.target.value)} value={linkedIn} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="Email" required
                                    onChange={e => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Year</label>
                                <select className="form-control" value={year?.yearValue || ''} onChange={handleYearChange} required>
                                    <option value="">Select Year</option>
                                    {years.map(year => (
                                        <option key={year.yearId} value={year.yearValue}>{year.yearValue}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Upload Image</label>
                                <input type="file" className="form-control" onChange={(e) => base64ConversionForImages(e)} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            {adminId ? 'Update Administration Member' : 'Add Administration Member'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Add this line to make it a module
export {};
