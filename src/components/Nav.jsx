import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
	return (
		<nav>
			<h1>Waves</h1>
			<button onClick={() => setLibraryStatus(!libraryStatus)}>
				Library
				<FontAwesomeIcon icon={faMusic} className="nav_button-icon" />
			</button>
		</nav>
	);
};

export default Nav;
