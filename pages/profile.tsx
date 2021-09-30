import { useState, useEffect } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="wrapper">{children}</div>;
};

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ name: string } | undefined>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/user");
      const json = await res.json();
      setIsLoading(false);
      setUser(json);
    })();
  }, []);

  if (isLoading) {
    return <Wrapper>Loading...</Wrapper>;
  }

  if (!isLoading && !user) {
    return <Wrapper>No user :/</Wrapper>;
  }

  if (!isLoading && user) {
    return (
      <Wrapper>
        <h1>{user.name}</h1>
      </Wrapper>
    );
  }
};

export default ProfilePage;
