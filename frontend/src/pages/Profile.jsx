import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
import { fetchProfile } from "../apis/userdata";
import "../css/Profile.css"

const ProfilePage = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                if (user) {
                    const res = await fetchProfile(user.id);
                    setData(res);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getProfile();
    }, [user]);

    if (!user) return <p className="center-text error-text">Not logged in</p>;
    if (!data) return <p className="center-text">Loading...</p>;

    return (
        <motion.div
            className="profile-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="profile-header">
                <div className="profile-avatar">
                    {data.name ? data.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div className="profile-info">
                    <h2>{data.name}</h2>
                    <p className="email">{data.email}</p>
                </div>
            </div>
            <div className="settings-buttons">
                <div className="settings-button">
                    <span>Account settings</span>
                    <span className="arrow">&gt;</span>
                </div>
                <div className="settings-button">
                    <span>Notification settings</span>
                    <span className="arrow">&gt;</span>
                </div>
            </div>


            <div className="profile-details">
                <label>User ID:</label>
                <p className="user-id">{data.id}</p>
            </div>
        </motion.div>
    );
};

export default ProfilePage;
