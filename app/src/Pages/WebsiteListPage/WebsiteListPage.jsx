import CompanyItem from '../../Components/CompanyItem/CompanyItem';
import SearchBar from '../../Components/SearchBar/SearchBar'
import './WebsiteListPage.css';

function WebsiteListPage() {
    return (
        <section id="website-list-page">
            <SearchBar/>
            <div className="companies-grid">
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
            </div>
        </section>
    )
}

export default WebsiteListPage;