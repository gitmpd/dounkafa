import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Veuillez patientez ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-container">
        <img src={user.picture} alt={user.name} style={{backgroundRepeat: 'no-repeat',width:'50%',height:'100',color:'black'
      }}/>
      </div>
    )
  );
};

export default Profile;