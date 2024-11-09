// UserProvider.js

import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();
const ProjectContext = createContext();
const AboutContext = createContext();

const AboutProvider = ({ children }) => {
  const [members, setMembers] = useState({ withSubPosition: [], withoutSubPosition: [] });
  const [aboutLoading, setAboutLoading] = useState(true);
  const fetchMembers = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/core`, {
        method: "GET",
      });
      const data = await response.json();
      const withSubPosition = data.members.filter(member => member.subPosition);
      const withoutSubPosition = data.members.filter(member => !member.subPosition);
      sessionStorage.setItem('members', JSON.stringify({ withSubPosition, withoutSubPosition }));
      setMembers({ withSubPosition, withoutSubPosition });
      setAboutLoading(false);
    } catch (error) {
      console.error('Error fetching members:', error);
      setAboutLoading(false);
    }
  };

  useEffect(() => {
    const storedMembers = sessionStorage.getItem('members');
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
      setAboutLoading(false);
    }
    else {
      fetchMembers();
    }
  }, []);

  return (
    <AboutContext.Provider value={{ members, setMembers, aboutLoading, fetchMembers}}>
      {children}
    </AboutContext.Provider>
  );
};

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({ onGoing: [], completed: [] });
  const [projectLoading, setProjectLoading] = useState(true);
  const fetchProjects = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/projects`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();
      const onGoing = data.filter(project => !project.status);
      const completed = data.filter(project => project.status);

      setProjects({ onGoing, completed });
      setProjectLoading(false);
      sessionStorage.setItem('projectsData', JSON.stringify({ onGoing, completed }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjectLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, setProjects, projectLoading, setProjectLoading, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/me`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status === 401) {
          alert('Your session has expired. Please log in again.');
          setUser(null);
        } else if (response.ok) {
          const data = await response.json();
          setUser(data.member);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, ProjectContext, ProjectProvider, AboutContext, AboutProvider };
