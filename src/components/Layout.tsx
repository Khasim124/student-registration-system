import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <header className="topbar">
        <div className="container">
          <nav>
            <h1>Student Registration</h1>
          </nav>
        </div>
      </header>

      <main className="content container">{children}</main>

      <footer className="footer">
        <div className="container">© Student Reg</div>
      </footer>
    </div>
  );
}
