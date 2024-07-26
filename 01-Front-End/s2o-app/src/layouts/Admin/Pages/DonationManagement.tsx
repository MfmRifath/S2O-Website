import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './DonationManagement.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DonationManagement: React.FC = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Donations ($)',
                data: [3000, 2000, 5000, 4000, 7000, 8000, 6000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Monthly Donation Analytics',
            },
        },
    };

    interface Donor {
        id: number;
        name: string;
        email: string;
        amount: number;
        date: string;
    }
    
    const donors: Donor[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', amount: 500, date: '2024-07-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 100, date: '2024-07-02' },
        { id: 3, name: 'Sam Johnson', email: 'sam@example.com', amount: 50, date: '2024-07-03' },
        // Add more donor details here
    ];

    return (
        <div>
            <header className="header11">
                <h1>Online Donation Management</h1>
            </header>
            <div className="container11">
                <img 
                    src="/path/to/your/image.png" 
                    alt="Administrator managing online donation details" 
                    className="image" 
                />
                <div className="details">
                    <h2>Donation Summary</h2>
                    <p>Total Donations: $10,000</p>
                    <p>Number of Donors: 150</p>
                    <p>Recent Donations: $500, $100, $50</p>
                </div>
                <div className="chart">
                    <h2>Donation Analytics</h2>
                    <Bar data={data} options={options} />
                </div>
                <div className="tableContainer">
                    <h2>Donor Details</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Amount ($)</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donors.map(donor => (
                                <tr key={donor.id}>
                                    <td>{donor.id}</td>
                                    <td>{donor.name}</td>
                                    <td>{donor.email}</td>
                                    <td>{donor.amount}</td>
                                    <td>{donor.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DonationManagement;
