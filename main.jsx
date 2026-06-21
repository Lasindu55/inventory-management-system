export default function Sidebar() {
    return (
        <div className="p-3">

            <h4 className="sidebar-title mb-4">Inventory</h4>

            <ul className="nav flex-column">

                <li className="nav-item mb-2">
                    <a className="nav-link sidebar-link" href="/admin-dashboard">
                        Dashboard
                    </a>
                </li>

                <li className="nav-item mb-2">
                    <a className="nav-link sidebar-link" href="/products">
                        Products
                    </a>
                </li>

                <li className="nav-item mb-2">
                    <a className="nav-link sidebar-link" href="/stock">
                        Stock
                    </a>
                </li>

                <li className="nav-item mb-2">
                    <a className="nav-link sidebar-link" href="/sales">
                        Sales
                    </a>
                </li>

            </ul>

        </div>
    );
}