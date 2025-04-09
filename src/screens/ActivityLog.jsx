import React, { useState } from 'react';
import DataTable from '../components/table/DataTable';
import { ACTIVITY_LOG_COL } from '../utils/columns';





const activityLogData = [
    {
        date: '18/03/2025 10:30 AM',
        status: 'Login Successful',
        ip: '192.168.1.1',
        isp: 'XYZ Internet',
        location: 'New York, NY, USA'
    },
    {
        date: '18/03/2025 08:15 PM',
        status: 'Login Failed',
        ip: '192.168.1.2',
        isp: 'ABC Broadband',
        location: 'Los Angeles, CA, USA'
    },
    {
        date: '19/03/2025 07:45 AM',
        status: 'Login Successful',
        ip: '192.168.1.3',
        isp: 'PQR Networks',
        location: 'Chicago, IL, USA'
    },
    {
        date: '19/03/2025 11:30 PM',
        status: 'Login Failed',
        ip: '192.168.1.4',
        isp: 'LMN Telecom',
        location: 'Houston, TX, USA'
    },
    {
        date: '20/03/2025 06:00 AM',
        status: 'Login Successful',
        ip: '192.168.1.5',
        isp: 'XYZ Internet',
        location: 'San Francisco, CA, USA'
    }
];

const ActivityLog = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(activityLogData.length / entriesPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-white w-full p-4">
            <DataTable 
                title="Activity Log"
                data={activityLogData}
                columns={ACTIVITY_LOG_COL}
                entriesPerPage={entriesPerPage}
                setEntriesPerPage={setEntriesPerPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortField=""  
                sortDirection="asc"  
                onSort={() => {}}  
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
            />
        </div>
    );
};

export default ActivityLog;
