import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const { api } = window;

const getProfile = async () => {
  const user = await api.getProfile();

  return user;
};

type CurrentUser = {
  name: string;
  email: string;
  picture: string;
  givenName: string;
};

function useCurrentUser() {
  const { data, isLoading } = useQuery("current-user", getProfile);

  const currentUser: CurrentUser =
    { ...data, givenName: data?.given_name } || null;

  return {
    currentUser,
    isLoading,
  };
}

export default useCurrentUser;
