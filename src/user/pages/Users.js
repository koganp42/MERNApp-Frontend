import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  //USERS is dummy array before DB built.
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      image:
        "https://pluralsight.imgix.net/author/lg/max-schwarzmueller-v1.jpg?w=200",
      places: 3
    }
  ];
  return <UsersList items={USERS} />;
};

export default Users;
