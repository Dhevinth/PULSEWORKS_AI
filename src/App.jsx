
import { useState } from 'react';
import './App.css';

const initialActivities = [
    {
        icon: '📄',
        title: 'Quarterly Report shared',
        detail: 'Finance Team · 12 minutes ago',
        status: 'Shared'
    },
    {
        icon: '🔐',
        title: 'Security settings updated',
        detail: 'Workspace Admin · 1 hour ago',
        status: 'Secure'
    },
    {
        icon: '👥',
        title: 'New team member added',
        detail: 'Engineering Team · 3 hours ago',
        status: 'Added'
    },
    {
        icon: '🤖',
        title: 'AI document summary created',
        detail: 'Product Team · 5 hours ago',
        status: 'Completed'
    }
];

const navigation = [
    {
        heading: 'WORKSPACE',
        items: [
            { name: 'Dashboard', icon: '▦' },
            { name: 'Documents', icon: '▤' },
            { name: 'Teams', icon: '♧' },
            { name: 'AI Assistant', icon: '✦' },
            { name: 'Activity', icon: '◷' }
        ]
    },
    {
        heading: 'SECURITY',
        items: [
            { name: 'Access Control', icon: '♙' },
            { name: 'Audit Logs', icon: '▣' },
            { name: 'Settings', icon: '⚙' }
        ]
    }
];

function Sidebar({ activePage, setActivePage, profileName }) {
    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-icon">P</div>
                <div>
                    <h2>PulseWorks</h2>
                    <span>AI Workspace</span>
                </div>
            </div>

            {navigation.map((group) => (
                <div key={group.heading}>
                    <div className="workspace-label">
                        {group.heading}
                    </div>

                    <nav className="sidebar-nav">
                        {group.items.map((item) => (
                            <button
                                key={item.name}
                                className={`nav-item ${
                                    activePage === item.name ? 'active' : ''
                                }`}
                                onClick={() => setActivePage(item.name)}
                            >
                                <span>{item.icon}</span>
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>
            ))}

            <div className="sidebar-bottom">
                <div className="upgrade-card">
                    <div className="upgrade-icon">✦</div>
                    <h3>Power your workspace</h3>
                    <p>Unlock more AI capabilities for your team.</p>

                    <button
                        onClick={() => setActivePage('AI Assistant')}
                    >
                        Explore AI features
                    </button>
                </div>

                <div className="profile">
                    <div className="avatar">
                        {profileName.slice(0, 1).toUpperCase()}
                    </div>

                    <div className="profile-info">
                        <strong>{profileName}</strong>
                        <span>Workspace Admin</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function MetricCard({ title, value, change, icon }) {
    return (
        <div className="metric-card">
            <div className="metric-top">
                <span className="metric-title">{title}</span>
                <span className="metric-icon">{icon}</span>
            </div>

            <h2>{value}</h2>

            <div className="metric-change">
                <span>↗ {change}</span>
                <span className="change-text">vs last month</span>
            </div>
        </div>
    );
}

function ActivityList({ activities }) {
    return (
        <div className="activity-list">
            {activities.map((activity, index) => (
                <div className="activity-row" key={index}>
                    <div className="activity-icon">
                        {activity.icon}
                    </div>

                    <div className="activity-details">
                        <strong>{activity.title}</strong>
                        <span>{activity.detail}</span>
                    </div>

                    <span className="activity-status">
                        {activity.status}
                    </span>
                </div>
            ))}

            {activities.length === 0 && (
                <p className="empty-message">No activities found.</p>
            )}
        </div>
    );
}

function App() {
    const [activePage, setActivePage] = useState('Dashboard');
    const [profileName, setProfileName] = useState('Dhevinth');

    const [activities, setActivities] = useState(initialActivities);
    const [documents, setDocuments] = useState([
        'Quarterly Report',
        'Project Requirements',
        'Workspace Guidelines'
    ]);

    const [teams, setTeams] = useState([
        'Engineering Team',
        'Finance Team',
        'Product Team'
    ]);

    const [search, setSearch] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('Document');
    const [newItemName, setNewItemName] = useState('');
    const [securityExpanded, setSecurityExpanded] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');

    const filteredActivities = activities.filter((activity) =>
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.detail.toLowerCase().includes(search.toLowerCase())
    );

    function openCreateModal(type = 'Document') {
        setModalType(type);
        setNewItemName('');
        setShowModal(true);
    }

    function createItem(event) {
        event.preventDefault();

        if (!newItemName.trim()) return;

        if (modalType === 'Document') {
            setDocuments((previous) => [
                newItemName,
                ...previous
            ]);
        }

        if (modalType === 'Team') {
            setTeams((previous) => [
                newItemName,
                ...previous
            ]);
        }

        setActivities((previous) => [
            {
                icon: modalType === 'Document' ? '📄' : '👥',
                title: `${modalType} created: ${newItemName}`,
                detail: `${profileName} · Just now`,
                status: 'Created'
            },
            ...previous
        ]);

        setShowModal(false);
        setActivePage(modalType === 'Document' ? 'Documents' : 'Teams');
    }

    function runDemoAI(event) {
        event.preventDefault();

        if (!aiPrompt.trim()) return;

        setAiResponse(
            `Demo AI response: Your request was "${aiPrompt}". ` +
            'In the next development phase, this will connect to a real AI model.'
        );

        setActivities((previous) => [
            {
                icon: '🤖',
                title: 'AI assistant request submitted',
                detail: `${profileName} · Just now`,
                status: 'Completed'
            },
            ...previous
        ]);
    }

    function renderDashboard() {
        return (
            <>
                <div className="welcome-section">
                    <div>
                        <p className="welcome-subtitle">
                            WORKSPACE OVERVIEW
                        </p>

                        <h1>Good morning, {profileName} 👋</h1>

                        <p className="welcome-description">
                            Here's what's happening in your workspace today.
                        </p>
                    </div>

                    <button
                        className="primary-button"
                        onClick={() => openCreateModal('Document')}
                    >
                        + Create new
                    </button>
                </div>

                <div className="security-banner">
                    <div className="security-banner-icon">✓</div>

                    <div>
                        <strong>Your workspace is protected</strong>
                        <p>
                            Demo security status. Real security checks
                            will be connected to the backend.
                        </p>
                    </div>

                    <span className="secure-badge">● Demo status</span>
                </div>

                <section className="metrics-grid">
                    <MetricCard
                        title="Total Documents"
                        value={documents.length.toLocaleString()}
                        change="12.8%"
                        icon="▤"
                    />

                    <MetricCard
                        title="Active Members"
                        value={teams.length.toLocaleString()}
                        change="8.2%"
                        icon="♧"
                    />

                    <MetricCard
                        title="AI Requests"
                        value="4,562"
                        change="24.5%"
                        icon="✦"
                    />

                    <MetricCard
                        title="Security Score"
                        value="98.5%"
                        change="2.4%"
                        icon="♙"
                    />
                </section>

                <section className="dashboard-panels">
                    <div className="panel">
                        <div className="panel-header">
                            <div>
                                <h2>Recent Activity</h2>
                                <p>Latest workspace updates</p>
                            </div>

                            <button
                                className="text-button"
                                onClick={() => setActivePage('Activity')}
                            >
                                View all →
                            </button>
                        </div>

                        <ActivityList activities={activities.slice(0, 4)} />
                    </div>

                    <div className="panel">
                        <div className="panel-header">
                            <div>
                                <h2>Security Overview</h2>
                                <p>Workspace protection status</p>
                            </div>
                        </div>

                        <div className="security-score">
                            <div className="score-circle">
                                <strong>98</strong>
                                <span>/100</span>
                            </div>

                            <div>
                                <strong>Demo status</strong>
                                <p>Sample security information</p>
                            </div>
                        </div>

                        <div className="security-check">
                            <span>✓</span>
                            <div>
                                <strong>MFA status</strong>
                                <p>Demo information only</p>
                            </div>
                        </div>

                        <div className="security-check">
                            <span>✓</span>
                            <div>
                                <strong>Encryption status</strong>
                                <p>Backend integration required</p>
                            </div>
                        </div>

                        <button
                            className="security-button"
                            onClick={() => setSecurityExpanded(!securityExpanded)}
                        >
                            {securityExpanded ? 'Hide details ↑' : 'View security details →'}
                        </button>

                        {securityExpanded && (
                            <div className="security-extra">
                                <p>Security dashboard preview</p>
                                <ul>
                                    <li>Access Control: Demo</li>
                                    <li>Audit Logging: Demo</li>
                                    <li>Authentication: Not connected</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            </>
        );
    }

    function renderPage() {
        if (activePage === 'Dashboard') {
            return renderDashboard();
        }

        if (activePage === 'Documents') {
            return (
                <div className="panel page-panel">
                    <div className="panel-header">
                        <div>
                            <h2>Documents</h2>
                            <p>Manage your workspace documents</p>
                        </div>

                        <button
                            className="primary-button"
                            onClick={() => openCreateModal('Document')}
                        >
                            + New document
                        </button>
                    </div>

                    {documents.map((document, index) => (
                        <div className="simple-list-row" key={index}>
                            <span>📄</span>
                            <strong>{document}</strong>
                            <button
                                className="text-button"
                                onClick={() => {
                                    setActivities((previous) => [
                                        {
                                            icon: '📄',
                                            title: `${document} opened`,
                                            detail: `${profileName} · Just now`,
                                            status: 'Opened'
                                        },
                                        ...previous
                                    ]);
                                    alert(`Opening demo document: ${document}`);
                                }}
                            >
                                Open
                            </button>
                        </div>
                    ))}
                </div>
            );
        }

        if (activePage === 'Teams') {
            return (
                <div className="panel page-panel">
                    <div className="panel-header">
                        <div>
                            <h2>Teams</h2>
                            <p>Manage workspace teams</p>
                        </div>

                        <button
                            className="primary-button"
                            onClick={() => openCreateModal('Team')}
                        >
                            + Create team
                        </button>
                    </div>

                    {teams.map((team, index) => (
                        <div className="simple-list-row" key={index}>
                            <span>👥</span>
                            <strong>{team}</strong>
                            <span className="activity-status">Active</span>
                        </div>
                    ))}
                </div>
            );
        }

        if (activePage === 'AI Assistant') {
            return (
                <div className="panel page-panel">
                    <h2>PulseWorks AI Assistant</h2>
                    <p className="welcome-description">
                        Try the AI workspace demo.
                    </p>

                    <form className="ai-form" onSubmit={runDemoAI}>
                        <textarea
                            value={aiPrompt}
                            onChange={(event) => setAiPrompt(event.target.value)}
                            placeholder="Ask AI to summarize a document or help your team..."
                            required
                        />

                        <button className="primary-button" type="submit">
                            Generate response
                        </button>
                    </form>

                    {aiResponse && (
                        <div className="ai-response">
                            <strong>AI Assistant</strong>
                            <p>{aiResponse}</p>
                        </div>
                    )}
                </div>
            );
        }

        if (activePage === 'Activity' || activePage === 'Audit Logs') {
            return (
                <div className="panel page-panel">
                    <div className="panel-header">
                        <div>
                            <h2>{activePage}</h2>
                            <p>Workspace events and activity records</p>
                        </div>
                    </div>

                    <ActivityList activities={filteredActivities} />
                </div>
            );
        }

        if (activePage === 'Access Control') {
            return (
                <div className="panel page-panel">
                    <h2>Access Control</h2>
                    <p className="welcome-description">
                        Demo workspace permissions.
                    </p>

                    {['Workspace Admin', 'Team Member', 'Guest'].map((role) => (
                        <div className="simple-list-row" key={role}>
                            <span>🔐</span>
                            <strong>{role}</strong>
                            <span className="activity-status">Demo role</span>
                        </div>
                    ))}
                </div>
            );
        }

        if (activePage === 'Settings') {
            return (
                <div className="panel page-panel">
                    <h2>Workspace Settings</h2>

                    <form
                        className="settings-form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            setActivities((previous) => [
                                {
                                    icon: '⚙',
                                    title: 'Profile name updated',
                                    detail: `${profileName} · Just now`,
                                    status: 'Updated'
                                },
                                ...previous
                            ]);
                            alert('Profile name updated!');
                        }}
                    >
                        <label>
                            Display name
                            <input
                                value={profileName}
                                onChange={(event) => setProfileName(event.target.value)}
                                required
                            />
                        </label>

                        <button className="primary-button" type="submit">
                            Save changes
                        </button>
                    </form>
                </div>
            );
        }

        return (
            <div className="panel page-panel">
                <h2>{activePage}</h2>
                <p className="welcome-description">
                    This workspace section is ready for further development.
                </p>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
                profileName={profileName}
            />

            <main className="main-content">
                <header className="topbar">
                    <div className="breadcrumb">
                        Workspace <span>/</span> {activePage}
                    </div>

                    <div className="topbar-actions">
                        <input
                            className="search-input"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search activity..."
                        />

                        <div className="menu-container">
                            <button
                                className="icon-button"
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowProfile(false);
                                }}
                                aria-label="Notifications"
                            >
                                ♧
                            </button>

                            {showNotifications && (
                                <div className="popup-menu">
                                    <strong>Notifications</strong>
                                    <p>Welcome to PulseWorks AI!</p>
                                    <p>Your demo workspace is ready.</p>
                                </div>
                            )}
                        </div>

                        <div className="menu-container">
                            <button
                                className="top-avatar"
                                onClick={() => {
                                    setShowProfile(!showProfile);
                                    setShowNotifications(false);
                                }}
                            >
                                {profileName.slice(0, 1).toUpperCase()}
                            </button>

                            {showProfile && (
                                <div className="popup-menu profile-popup">
                                    <strong>{profileName}</strong>
                                    <button onClick={() => setActivePage('Settings')}>
                                        Profile settings
                                    </button>
                                    <button onClick={() => alert('Demo sign-out')}>
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <section className="dashboard-content">
                    {renderPage()}

                    <footer className="dashboard-footer">
                        <span>PulseWorks AI © 2026</span>
                        <span>Secure enterprise workspace</span>
                    </footer>
                </section>
            </main>

            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="create-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="panel-header">
                            <h2>Create {modalType}</h2>
                            <button
                                className="text-button"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={createItem}>
                            <label>
                                {modalType} name
                                <input
                                    value={newItemName}
                                    onChange={(event) => setNewItemName(event.target.value)}
                                    placeholder={`Enter ${modalType.toLowerCase()} name`}
                                    required
                                    autoFocus
                                />
                            </label>

                            <button className="primary-button" type="submit">
                                Create {modalType}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
