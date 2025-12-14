import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './ProfilePage.css';
import { getCurrentUser } from '../service/api'; // Import the API function

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                console.log("Attempting to fetch current user data..."); // Added console.log
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                setProfilePicture(currentUser.profilePictureUrl || null); // Use fetched URL or null
                // Store user data in localStorage to simulate session for UI
                localStorage.setItem('user', JSON.stringify(currentUser)); 
            } catch (err) {
                setError("Failed to fetch user data. Please ensure you are logged in.");
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleProfilePictureUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newProfilePictureUrl = reader.result;
                setProfilePicture(newProfilePictureUrl);
                alert('Profile picture uploaded successfully! (In a real app, this would send to a server)');
                
                // Update localStorage to reflect the new profile picture for UI consistency
                const currentUser = JSON.parse(localStorage.getItem('user'));
                if (currentUser) {
                    currentUser.profilePictureUrl = newProfilePictureUrl;
                    localStorage.setItem('user', JSON.stringify(currentUser));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) {
        return <div className="profile-page"><p>Loading profile...</p></div>;
    }

    if (error) {
        return <div className="profile-page" style={{ color: 'red' }}><p>{error}</p></div>;
    }

    if (!user) {
        return <div className="profile-page"><p>No user data available.</p></div>;
    }

    return (
        <div className="profile-page">
            <h1>User Profile</h1>
            <div className="profile-details">
                <div className="profile-picture-section">
                    {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="profile-picture" />
                    ) : (
                        <FontAwesomeIcon icon={faUser} className="profile-fa-icon" />
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        id="profilePictureInput" 
                        style={{ display: 'none' }} 
                        onChange={handleProfilePictureUpload} 
                    />
                    <label htmlFor="profilePictureInput" className="upload-button">
                        Upload Profile Picture
                    </label>
                </div>
                <div className="user-info">
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>City:</strong> {user.city}</p>
                    <p><strong>State:</strong> {user.state}</p>
                    <p><strong>Zip:</strong> {user.zip}</p>
                    {/* Add more user details here based on your backend response */}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
