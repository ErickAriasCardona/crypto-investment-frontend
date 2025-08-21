const [activeSection, setActiveSection] = useState("home");

// Render condicional
{activeSection === "home" && <Home />}
{activeSection === "details" && <CryptoDetails />}
{activeSection === "search" && <Search />}
