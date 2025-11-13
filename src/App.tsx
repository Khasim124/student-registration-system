import React, { useMemo, useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CourseTypesPage from "./pages/CourseTypesPage";
import CoursesPage from "./pages/CoursesPage";
import OfferingsPage from "./pages/OfferingsPage";
import RegistrationsPage from "./pages/RegistrationsPage";

function NavButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`nav-btn ${active ? "active" : ""}`}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [route, setRoute] = useState<
    "dashboard" | "types" | "courses" | "offerings" | "registrations"
  >("dashboard");

  const page = useMemo(() => {
    if (route === "dashboard") return <Dashboard />;
    if (route === "types") return <CourseTypesPage />;
    if (route === "courses") return <CoursesPage />;
    if (route === "offerings") return <OfferingsPage />;
    return <RegistrationsPage />;
  }, [route]);

  return (
    <Layout>
      <nav className="nav">
        <NavButton
          active={route === "dashboard"}
          onClick={() => setRoute("dashboard")}
        >
          Dashboard
        </NavButton>
        <NavButton active={route === "types"} onClick={() => setRoute("types")}>
          Course Types
        </NavButton>
        <NavButton
          active={route === "courses"}
          onClick={() => setRoute("courses")}
        >
          Courses
        </NavButton>
        <NavButton
          active={route === "offerings"}
          onClick={() => setRoute("offerings")}
        >
          Offerings
        </NavButton>
        <NavButton
          active={route === "registrations"}
          onClick={() => setRoute("registrations")}
        >
          Registrations
        </NavButton>
      </nav>

      <section key={route} className="page fade-in">
        {page}
      </section>
    </Layout>
  );
}
